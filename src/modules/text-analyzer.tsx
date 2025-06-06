'use client';

import { useAnalyzerSore } from '@/store/analyzer-store';
import TextAnalyzerInput from '@/modules/text-analyzer-input';
import TextAnalyzerStatistics from '@/modules/text-analyzer-statistics';

export default function TextAnalyzer() {
  const { interpretedMetrics, isLoadingAnalyzer, clearAnalyzeText } =
    useAnalyzerSore();

  return (
    <div className="flex flex-col gap-10 w-full h-full">
      {interpretedMetrics ? (
        <TextAnalyzerStatistics
          interpretedMetrics={interpretedMetrics}
          isLoadingAnalyzer={isLoadingAnalyzer}
          clearAnalyzeText={clearAnalyzeText}
        />
      ) : (
        <TextAnalyzerInput />
      )}
    </div>
  );
}
