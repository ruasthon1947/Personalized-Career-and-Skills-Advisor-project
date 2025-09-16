'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, LoaderCircle } from 'lucide-react';

import { forgotPassword } from '@/lib/actions/auth';
import { ForgotPasswordSchema } from '@/lib/schemas';
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

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      forgotPassword(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <AuthCard
      cardTitle="Forgot your password?"
      cardDescription="Enter your email to receive a reset link"
      footerHref="/login"
      footerLabel="Back to login"
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
          </div>
          <FormMessage message={error} type="error" />
          <FormMessage message={success} type="success" />
          <Button disabled={isPending} type="submit" className="w-full bg-accent hover:bg-accent/90">
             {isPending ? <LoaderCircle className="animate-spin" /> : 'Send Reset Link'}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
