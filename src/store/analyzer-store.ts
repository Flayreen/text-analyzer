import { create } from 'zustand/react';
import { IReadabilityMetrics } from '@/types/readability-metrics';
import { IInterpretedMetrics } from '@/types/interpreted-metrics';
import getMetricDescription, {
  getMetricMark,
} from '@/services/get-metric-description';

export interface AnalyzerStoreState {
  interpretedMetrics: IInterpretedMetrics | null;
  isLoadingAnalyzer: boolean;
  analyzeText: (text: string) => Promise<IInterpretedMetrics | null>;
  clearAnalyzeText: () => void;
}

export const useAnalyzerSore = create<AnalyzerStoreState>()((set) => ({
  interpretedMetrics: null,
  isLoadingAnalyzer: false,
  analyzeText: async (text: string) => {
    set({ isLoadingAnalyzer: true });
    try {
      const res: Response = await fetch('/api/readability', {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status === 200) {
        const metrics: IReadabilityMetrics = await res.json();
        const interpretedMetrics: IInterpretedMetrics = {
          statistic: {
            wordCount: metrics.lexiconCount,
            sentenceCount: metrics.sentencesCount,
            syllablesCount: metrics.syllablesCount,
          },
          scores: [
            {
              title: 'Flesch Reading Ease',
              value: metrics.fleschReadingEase,
              description: getMetricDescription(
                'fleschReadingEase',
                metrics.fleschReadingEase
              ),
              mark: getMetricMark(
                'fleschReadingEase',
                metrics.fleschReadingEase
              ),
            },
            {
              title: 'Flesch-Kincaid Grade Level',
              value: metrics.fleschKincaidGrade,
              description: getMetricDescription(
                'fleschKincaidGrade',
                metrics.fleschKincaidGrade
              ),
              mark: getMetricMark(
                'fleschKincaidGrade',
                metrics.fleschKincaidGrade
              ),
            },
            {
              title: 'Gunning Fog Index',
              value: metrics.gunningFog,
              description: getMetricDescription(
                'gunningFog',
                metrics.gunningFog
              ),
              mark: getMetricMark('gunningFog', metrics.gunningFog),
            },
            {
              title: 'SMOG Index',
              value: metrics.smogIndex,
              description: getMetricDescription('smogIndex', metrics.smogIndex),
              mark: getMetricMark('smogIndex', metrics.smogIndex),
            },
            {
              title: 'Automated Readability Index (ARI)',
              value: metrics.automatedReadabilityIndex,
              description: getMetricDescription(
                'automatedReadabilityIndex',
                metrics.automatedReadabilityIndex
              ),
              mark: getMetricMark(
                'automatedReadabilityIndex',
                metrics.automatedReadabilityIndex
              ),
            },
            {
              title: 'Coleman–Liau Index',
              value: metrics.colemanLiauIndex,
              description: getMetricDescription(
                'colemanLiauIndex',
                metrics.colemanLiauIndex
              ),
              mark: getMetricMark('colemanLiauIndex', metrics.colemanLiauIndex),
            },
            {
              title: 'Linsear Write Formula',
              value: metrics.linsearWriteFormula,
              description: getMetricDescription(
                'linsearWriteFormula',
                metrics.linsearWriteFormula
              ),
              mark: getMetricMark(
                'linsearWriteFormula',
                metrics.linsearWriteFormula
              ),
            },
            {
              title: 'Dale–Chall Readability Score',
              value: metrics.daleChallReadabilityScore,
              description: getMetricDescription(
                'daleChallReadabilityScore',
                metrics.daleChallReadabilityScore
              ),
              mark: getMetricMark(
                'daleChallReadabilityScore',
                metrics.daleChallReadabilityScore
              ),
            },
          ],
        };
        await new Promise((resolve) => setTimeout(resolve, 3000));
        set({ interpretedMetrics: interpretedMetrics });
        return interpretedMetrics;
      }

      return null;
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      set({ isLoadingAnalyzer: false });
      return null;
    }
  },
  clearAnalyzeText: () => set({ interpretedMetrics: null }),
}));
