import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface StatisticCardProps {
  className?: string;
  title: string;
  emoji: string;
  value: string | number;
  isLoading: boolean;
}

export default function StatisticCard({
  className,
  title,
  emoji,
  value,
  isLoading,
}: StatisticCardProps) {
  return !isLoading ? (
    <Card className={cn('w-full flex flex-col gap-2 px-4 py-3', className)}>
      <span className="text-sm text-gray-600 text-center md:text-left">
        {title}
      </span>

      <div className="flex flex-row gap-2 items-center justify-center md:justify-start">
        <span className="text-4xl">{emoji}</span>
        <span className="text-4xl font-semibold">{value}</span>
      </div>
    </Card>
  ) : (
    <Card className={cn('w-full flex flex-col gap-2 px-4 py-3', className)}>
      <Skeleton className="h-4 w-24 mx-auto md:mx-0" />

      <div className="flex flex-row gap-2 items-center justify-center md:justify-start">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-16 rounded" />
      </div>
    </Card>
  );
}
