'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, LockKeyhole, LoaderCircle } from 'lucide-react';

import { signup } from '@/lib/actions/auth';
import { SignupSchema } from '@/lib/schemas';
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

export function SignupForm() {
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof SignupSchema>) => {
    setError('');
    startTransition(() => {
      signup(values).then(data => {
        if(data?.error) {
            setError(data.error)
        }
      }).catch((e) => {
        if (e.message !== 'NEXT_REDIRECT') {
            setError(e.message || 'An unknown error occurred.');
        }
      });
    });
  };

  return (
    <AuthCard
      cardTitle="Create an account"
      cardDescription="Enter your details below to get started"
      footerHref="/login"
      footerLabel="Already have an account? Log in"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="John Doe"
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
                  <FormFieldMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
                  <FormFieldMessage />
                </FormItem>
              )}
            />
          </div>
          <FormMessage message={error} type="error" />
          <Button disabled={isPending} type="submit" className="w-full bg-accent hover:bg-accent/90">
            {isPending ? <LoaderCircle className="animate-spin" /> : 'Create Account'}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
