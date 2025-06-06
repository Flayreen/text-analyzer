export type ReadabilityMetric =
  | 'fleschReadingEase'
  | 'fleschKincaidGrade'
  | 'gunningFog'
  | 'smogIndex'
  | 'automatedReadabilityIndex'
  | 'colemanLiauIndex'
  | 'linsearWriteFormula'
  | 'daleChallReadabilityScore';

export type ReadabilityMetricMark = 'red' | 'orange' | 'yellow' | 'green';

export interface IMetricRules {
  metric: ReadabilityMetric;
  ranges: {
    min: number;
    max: number;
    label: string;
    mark: ReadabilityMetricMark;
  }[];
  fallback?: string;
}
