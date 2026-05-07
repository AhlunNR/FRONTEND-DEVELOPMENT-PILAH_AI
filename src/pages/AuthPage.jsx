import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { Leaf, Loader2 } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import { supabase } from '../lib/supabase';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  const navigate = useNavigate();
  const session = useAppStore(state => state.session);
  const setUser = useAppStore(state => state.setUser);

  // Jika sudah login, langsung ke profil
  if (session) {
    return <Navigate to="/profil" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Harap isi email dan password');
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // Mode Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        setUser(data.user, data.session);
        toast.success('Berhasil masuk!');
        navigate('/profil');
      } else {
        // Mode Register
        if (!fullName) {
          toast.error('Harap isi nama lengkap');
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });

        if (error) throw error;
        
        // Supabase biasanya mengirimkan email konfirmasi. Jika tidak (auto-confirm on), user akan langsung login.
        if (data.session) {
          setUser(data.user, data.session);
          toast.success('Pendaftaran berhasil!');
          navigate('/profil');
        } else {
          toast.success('Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi.');
          setIsLogin(true); // Kembali ke mode login
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error(error.message || 'Terjadi kesalahan saat autentikasi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-md border-none shadow-xl">
        <CardHeader className="space-y-1 text-center pb-8 pt-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Leaf className="text-primary w-6 h-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            {isLogin ? 'Selamat Datang Kembali' : 'Bergabung dengan EcoScan'}
          </CardTitle>
          <CardDescription className="text-slate-500">
            {isLogin 
              ? 'Masukkan email dan kata sandi Anda untuk mengakses akun' 
              : 'Buat akun untuk melacak poin dan riwayat scan Anda'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <Input 
                  id="fullName" 
                  placeholder="Budi Santoso" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="nama@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Kata Sandi</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full mt-6" disabled={isLoading}>
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...</>
              ) : (
                isLogin ? 'Masuk' : 'Daftar'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium focus:outline-none"
              disabled={isLoading}
            >
              {isLogin ? 'Daftar Sekarang' : 'Masuk di Sini'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
