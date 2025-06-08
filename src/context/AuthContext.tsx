
'use client';

import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile, // Importar updateProfile
  type User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  register: (name: string, email: string, pass: string) => Promise<any>;
  logout: () => Promise<void>;
  passwordReset: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      toast({ title: 'Login Successful', description: 'Redirecting to dashboard...' });
      router.push('/dashboard');
      return userCredential;
    } catch (error: any) {
      console.error('Login error:', error);
      toast({ title: 'Login Failed', description: error.message || 'Please check your credentials.', variant: 'destructive' });
      setLoading(false);
      throw error;
    }
  };

  const register = async (name: string, email: string, pass: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
      }
      // O onAuthStateChanged será acionado com o usuário atualizado.
      // Para o nome aparecer imediatamente no header após o registro,
      // seria necessário um setCurrentUser aqui ou um refresh do usuário.
      // O fluxo atual redireciona para login, o que deve resolver isso no próximo login.
      
      toast({ title: 'Registration Successful', description: 'Please log in with your new account.' });
      router.push('/login'); 
      return userCredential;
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({ title: 'Registration Failed', description: error.message || 'Could not create account.', variant: 'destructive' });
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
      router.push('/login');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({ title: 'Logout Failed', description: error.message || 'Could not log out.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const passwordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast({ title: 'Password Reset Email Sent', description: 'If an account exists, you will receive reset instructions.' });
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast({ title: 'Password Reset Failed', description: error.message || 'Could not send reset email.', variant: 'destructive' });
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    passwordReset,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
