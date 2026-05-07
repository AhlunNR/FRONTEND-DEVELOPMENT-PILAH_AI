import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

const useAppStore = create(
  persist(
    (set, get) => ({
      scans: [],
      points: 0,
      redemptions: [],
      user: null,
      session: null,

      setUser: (user, session) => set({ user, session }),
      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null, scans: [], points: 0, redemptions: [] }); // Bersihkan data lokal saat logout
      },

      addScan: async (scanData) => {
        const state = get();
        const newScan = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          label: scanData.label,
          category: scanData.category,
          confidence: scanData.confidence,
          points: scanData.points,
          fact: scanData.fact,
          imageUrl: scanData.imageUrl || null,
        };
        
        set((state) => ({
          scans: [newScan, ...state.scans],
          points: state.points + (scanData.points || 0),
        }));

        // Sinkronisasi background ke Supabase jika login
        if (state.user) {
          supabase.from('scans').insert({
            user_id: state.user.id,
            label: newScan.label,
            category: newScan.category,
            confidence: newScan.confidence,
            points_earned: newScan.points,
            fact: newScan.fact,
          }).then(() => {
            // Update poin profil
            supabase.from('profiles').select('total_points').eq('id', state.user.id).single().then(({ data }) => {
              if (data) {
                supabase.from('profiles').update({ total_points: data.total_points + newScan.points }).eq('id', state.user.id).then();
              }
            });
          }).catch(console.error);
        }
      },

      addRedemption: async (rewardName, pointsCost) => {
        const state = get();
        if (state.points >= pointsCost) {
          const newRedemption = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            reward: rewardName,
            points: pointsCost,
          };
          set((state) => ({
            redemptions: [newRedemption, ...state.redemptions],
            points: state.points - pointsCost,
          }));

          // Sinkronisasi background ke Supabase
          if (state.user) {
            supabase.from('redemptions').insert({
              user_id: state.user.id,
              reward_name: rewardName,
              points_spent: pointsCost,
              status: 'success'
            }).then(() => {
              supabase.from('profiles').select('total_points').eq('id', state.user.id).single().then(({ data }) => {
                if (data) {
                  supabase.from('profiles').update({ total_points: data.total_points - pointsCost }).eq('id', state.user.id).then();
                }
              });
            }).catch(console.error);
          }
          return true;
        }
        return false;
      },

      getStats: () => {
        const state = get();
        const now = new Date();
        
        const totalScans = state.scans.length;
        const totalPoints = state.points;
        const totalRedeemed = state.redemptions.reduce((sum, r) => sum + r.points, 0);
        
        // Asumsi kasar: 0.5kg CO2 per scan daur ulang
        const co2Saved = (totalScans * 0.5).toFixed(1);
        
        // Item yang didaur ulang (selain trash/residu)
        const recycledItems = state.scans.filter(s => s.label !== 'trash').length;
        
        // Filter mingguan
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const weekScans = state.scans.filter(s => new Date(s.timestamp) >= weekAgo);
        const weeklyPoints = weekScans.reduce((sum, s) => sum + s.points, 0);
        
        // Filter bulanan
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const monthScans = state.scans.filter(s => new Date(s.timestamp) >= monthAgo);
        const monthlyPoints = monthScans.reduce((sum, s) => sum + s.points, 0);

        return {
          totalScans,
          totalPoints,
          totalRedeemed,
          co2Saved,
          recycledItems,
          weeklyScans: weekScans.length,
          weeklyPoints,
          monthlyPoints
        };
      },

      clearHistory: () => set({ scans: [], points: 0, redemptions: [] }),
    }),
    {
      name: 'ecoscan-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useAppStore;
