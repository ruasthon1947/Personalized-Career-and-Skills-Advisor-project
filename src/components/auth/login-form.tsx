'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Mail, LockKeyhole, LoaderCircle } from 'lucide-react';

import { login } from '@/lib/actions/auth';
import { LoginSchema } from '@/lib/schemas';
import { AuthCard } from '@/components/auth/auth-card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage as FormFieldMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormMessage } from '@/components/auth/form-message';

export function LoginForm() {
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    startTransition(() => {
      login(values).catch((e) => {
        // Next's redirect throws an error that can be safely ignored.
        // All other errors should be displayed.
        if (e.message !== 'NEXT_REDIRECT') {
            setError(e.message || 'An unknown error occurred.');
        }
      });
    });
  };

  return (
    <AuthCard
      cardTitle="Welcome back"
      cardDescription="Fill in your credentials to access your account"
      footerHref="/signup"
      footerLabel="Don't have an account? Sign up"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="your.email@example.com"
                        type="email"
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormFieldMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                       <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="••••••••"
                        type="password"
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link href="/forgot-password">Forgot password?</Link>
                  </Button>
                  <FormFieldMessage />
                </FormItem>
              )}
            />
          </div>
          <FormMessage message={error} type="error" />
          <Button disabled={isPending} type="submit" className="w-full bg-accent hover:bg-accent/90">
            {isPending ? <LoaderCircle className="animate-spin" /> : 'Log In'}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
