'use client';

import AppLayout from '@/components/app/AppLayout';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { updateProfile, updatePassword } from 'firebase/auth';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  currentPassword: z.string().optional().or(z.literal('')), // Optional for name update only, allow empty string
  newPassword: z.string().min(6, { message: 'Password must be at least 6 characters.' }).optional().or(z.literal('')), // Optional for name update, allow empty string
});
export default function EditProfilePage() {
  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated after loading
    if (!authLoading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, authLoading, router]);

  // Optionally show a loading state or redirecting message while checking auth
  if (authLoading || !currentUser) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-screen">
          {/* You could add a spinner or message here */}
          <p>Loading or redirecting...</p>
        </div>
      </AppLayout>
    );
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentUser.displayName || '',
      currentPassword: '',
      newPassword: '',
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (values.name !== currentUser.displayName) {
        await updateProfile(currentUser, { displayName: values.name });
      }
      if (values.newPassword) {
        // Note: Updating password might require re-authentication depending on security rules
        await updatePassword(currentUser, values.newPassword);
      }
      toast({ title: 'Perfil atualizado com sucesso!', variant: 'default' });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({ title: 'Erro ao atualizar perfil', description: error.message || 'Ocorreu um erro inesperado.', variant: 'destructive' });
    }
  }


  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Editar Perfil</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-md">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} className="border border-gray-300" />
 </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha Atual (necessário para alterar a senha)</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} className="border border-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova Senha (mínimo 6 caracteres)</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} className="border border-gray-300" />
 </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Salvar Alterações
            </Button>
          </form>
        </Form>
      </div>
    </AppLayout>
  );
}