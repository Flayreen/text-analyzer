export interface IInterpretedMetrics {
    statistic: IInterpretedMetricsStatistics;
    scores: IInterpretedMetricsScore[];
}

export interface IInterpretedMetricsStatistics {
    wordCount: number;
    sentenceCount: number;
    syllablesCount: number;
}

export interface IInterpretedMetricsScore {
    title: string;
    value: number;
    description: string;
}