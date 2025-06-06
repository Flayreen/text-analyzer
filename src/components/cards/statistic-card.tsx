import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatisticCardProps {
  className?: string;
  title: string;
  emoji: string;
  value: string | number;
}

export default function StatisticCard({
  className,
  title,
  emoji,
  value,
}: StatisticCardProps) {
  return (
    <Card className={cn('w-full flex flex-col gap-2 px-4 py-3', className)}>
      <span className="text-sm text-gray-600 text-center md:text-left">
        {title}
      </span>

      <div className="flex flex-row gap-2 items-center justify-center md:justify-start">
        <span className="text-4xl">{emoji}</span>
        <span className="text-4xl font-semibold">{value}</span>
      </div>
    </Card>
  );
}
