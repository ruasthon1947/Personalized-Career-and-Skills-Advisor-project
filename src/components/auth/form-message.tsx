import { CircleCheck, TriangleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormMessageProps {
  message?: string;
  type: 'success' | 'error';
}

export function FormMessage({ message, type }: FormMessageProps) {
  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div
      className={cn(
        'flex items-center gap-x-2 rounded-md p-3 text-sm',
        isSuccess
          ? 'bg-emerald-500/15 text-emerald-500'
          : 'bg-destructive/15 text-destructive'
      )}
    >
      {isSuccess ? (
        <CircleCheck className="h-4 w-4" />
      ) : (
        <TriangleAlert className="h-4 w-4" />
      )}
      <p>{message}</p>
    </div>
  );
}
