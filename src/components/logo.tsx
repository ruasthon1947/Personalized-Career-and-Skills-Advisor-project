import { Briefcase } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Back to homepage">
      <Briefcase className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold tracking-tight">Career Path</span>
    </Link>
  );
}
