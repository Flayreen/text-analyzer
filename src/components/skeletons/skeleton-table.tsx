import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  headerLabels?: string[];
}

export default function SkeletonTable({
  rows = 5,
  columns = 3,
  headerLabels,
}: SkeletonTableProps) {
  return (
    <Card className="py-3">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableHead key={colIndex} className="px-4">
                {headerLabels?.[colIndex] ?? <Skeleton className="h-4 w-24" />}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex} className="px-4">
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
