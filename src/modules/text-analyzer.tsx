'use client';

import { Textarea } from '@/components/ui/textarea';
import { useAnalyzerSore } from '@/store/analyzer-store';
import { ChangeEvent, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IInterpretedMetricsScore } from '@/types/interpreted-metrics';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatisticCard from '@/components/cards/statistic-card';
import { cn } from '@/lib/utils';
import SkeletonTable from '@/components/skeletons/skeleton-table';

export default function TextAnalyzer() {
  const [inputText, setInputText] = useState<string>('');
  const { interpretedMetrics, isLoadingAnalyzer, analyzeText } =
    useAnalyzerSore();

  const getWordsCount = (text: string): number => {
    const textArray: string[] = text.split(' ');
    return textArray.filter((word: string) => word !== '').length;
  };

  const handleAnalyzeText = async () => {
    try {
      await analyzeText(inputText);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-10 w-full h-full justify-center',
        interpretedMetrics && 'justify-start'
      )}
    >
      <div className="flex flex-col gap-4 items-end">
        <h1 className="text-center text-xl font-bold w-full">Text analyzer</h1>
        <div className="flex flex-col w-full bg-gray-100 rounded-md">
          <Textarea
            className="h-[200px] bg-white"
            value={inputText}
            placeholder="Type or paste your text here"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setInputText(e.target.value)
            }
          />
          <div className="flex flex-row justify-end items-center w-full p-2">
            <span className="font-semibold text-sm">
              {getWordsCount(inputText) < 25
                ? `Add ${25 - getWordsCount(inputText)} more words`
                : `${getWordsCount(inputText)}/1000 words`}
            </span>
          </div>
        </div>

        <Button
          className="w-full md:w-fit cursor-pointer"
          disabled={
            getWordsCount(inputText) < 25 ||
            getWordsCount(inputText) > 1000 ||
            isLoadingAnalyzer
          }
          onClick={handleAnalyzeText}
        >
          Scan for readability
        </Button>
      </div>

      {interpretedMetrics && (
        <div className="flex flex-col gap-10">
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
                      <TableHead className="w-[300px] px-4">
                        Interpretation
                      </TableHead>
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
                          <TableCell className="px-4">
                            {score.description}
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
      )}
    </div>
  );
}
