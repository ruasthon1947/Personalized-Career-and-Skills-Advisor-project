import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Logo } from '@/components/logo';
import Link from 'next/link';

interface AuthCardProps {
  children: React.ReactNode;
  cardTitle: string;
  cardDescription: string;
  footerHref: string;
  footerLabel: string;
}

export function AuthCard({
  children,
  cardTitle,
  cardDescription,
  footerHref,
  footerLabel,
}: AuthCardProps) {
  return (
    <Card className="w-full max-w-md shadow-xl border-border/60">
      <CardHeader className="flex flex-col items-center justify-center text-center space-y-4">
        <Logo />
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{cardTitle}</h1>
          <p className="text-sm text-muted-foreground">{cardDescription}</p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Link
          href={footerHref}
          className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          {footerLabel}
        </Link>
      </CardFooter>
    </Card>
  );
}
