export type ReadabilityMetric =
    | 'fleschReadingEase'
    | 'fleschKincaidGrade'
    | 'gunningFog'
    | 'smogIndex'
    | 'automatedReadabilityIndex'
    | 'colemanLiauIndex'
    | 'linsearWriteFormula'
    | 'daleChallReadabilityScore';

export interface IMetricRules {
    metric: ReadabilityMetric;
    ranges: {
        min: number;
        max: number;
        label: string;
    }[];
    fallback?: string;
}