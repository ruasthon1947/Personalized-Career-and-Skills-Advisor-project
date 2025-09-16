'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  LoginSchema,
  SignupSchema,
  ForgotPasswordSchema,
} from '@/lib/schemas';

// In-memory store for demo purposes. In a real app, use a database.
const users: Record<string, any> = {
  "user@example.com": {
    name: "Test User",
    email: "user@example.com",
    password: "password123"
  }
};

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;
  const user = users[email];

  if (!user || user.password !== password) {
    return { error: 'Invalid email or password' };
  }

  cookies().set('session', user.email, { httpOnly: true, path: '/', secure: process.env.NODE_ENV === 'production' });
  
  return redirect('/dashboard');
}

export async function signup(values: z.infer<typeof SignupSchema>) {
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { name, email, password } = validatedFields.data;

  if (users[email]) {
    return { error: 'User with this email already exists' };
  }
  
  users[email] = { name, email, password };

  cookies().set('session', email, { httpOnly: true, path: '/', secure: process.env.NODE_ENV === 'production' });

  return redirect('/dashboard');
}

export async function forgotPassword(
  values: z.infer<typeof ForgotPasswordSchema>
) {
  const validatedFields = ForgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid email!' };
  }
  
  // In a real app, you would check if the user exists and send a reset email.
  // For this demo, we'll always return a success message to prevent email enumeration.
  return { success: 'If an account with that email exists, a password reset link has been sent.' };
}

export async function logout() {
  cookies().delete('session');
  redirect('/login');
}
