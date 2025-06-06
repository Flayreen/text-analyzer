import StatisticCard from '@/components/cards/statistic-card';
import { Card } from '@/components/ui/card';
import { MoveLeft } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  IInterpretedMetrics,
  IInterpretedMetricsScore,
} from '@/types/interpreted-metrics';
import SkeletonTable from '@/components/skeletons/skeleton-table';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface TextAnalyzerStatisticsProps {
  className?: string;
  interpretedMetrics: IInterpretedMetrics;
  isLoadingAnalyzer: boolean;
  clearAnalyzeText: () => void;
}

export default function TextAnalyzerStatistics({
  className,
  interpretedMetrics,
  isLoadingAnalyzer,
  clearAnalyzeText,
}: TextAnalyzerStatisticsProps) {
  return (
    <div className={cn('flex flex-col gap-10', className)}>
      <div className="flex flex-row w-full">
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={clearAnalyzeText}
        >
          <MoveLeft /> Back
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Text Statistics</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <StatisticCard
            title="Word count"
            emoji="📝"
            value={interpretedMetrics.statistic.wordCount}
            isLoading={isLoadingAnalyzer}
          />
          <StatisticCard
            title="Sentence count"
            emoji="📚"
            value={interpretedMetrics.statistic.sentenceCount}
            isLoading={isLoadingAnalyzer}
          />
          <StatisticCard
            title="Syllable count"
            emoji="🎵"
            value={interpretedMetrics.statistic.syllablesCount}
            isLoading={isLoadingAnalyzer}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Readability Scores</h2>
        {!isLoadingAnalyzer ? (
          <Card className="py-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] px-4">Metric</TableHead>
                  <TableHead className="text-center">Score</TableHead>
                  <TableHead className="w-[300px]">Interpretation</TableHead>
                  <TableHead className="w-[30px] px-4">Mark</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interpretedMetrics.scores.map(
                  (score: IInterpretedMetricsScore, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium px-4">
                        {score.title}
                      </TableCell>
                      <TableCell className="text-center">
                        {score.value}
                      </TableCell>
                      <TableCell>{score.description}</TableCell>
                      <TableCell className="px-4 text-center">
                        {score.mark}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </Card>
        ) : (
          <SkeletonTable />
        )}
      </div>
    </div>
  );
}
