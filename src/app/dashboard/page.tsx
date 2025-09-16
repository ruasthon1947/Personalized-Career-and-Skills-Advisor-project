import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { logout } from '@/lib/actions/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Logo } from '@/components/logo';

// In a real app, this would fetch from your database.
// This function simulates retrieving user data based on the session.
async function getUserData(email: string) {
  // This is a placeholder. A real implementation would query a database.
  const name = email.split('@')[0];
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    email: email,
    name: capitalizedName,
  };
}

export default async function DashboardPage() {
  const session = cookies().get('session')?.value;

  if (!session) {
    // This should be caught by middleware, but as a fallback.
    redirect('/login');
  }

  const user = await getUserData(session);

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-border/60">
        <CardHeader className="flex flex-col items-center justify-center text-center space-y-4">
          <Logo />
          <div className="space-y-1">
            <CardTitle>Welcome, {user.name}!</CardTitle>
            <CardDescription>
              You have successfully logged in to your account.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            Your registered email is: <span className="font-medium text-foreground">{user.email}</span>
          </p>
        </CardContent>
        <CardFooter>
          <form action={logout} className="w-full">
            <Button type="submit" variant="outline" className="w-full">
              Log Out
            </Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  );
}
