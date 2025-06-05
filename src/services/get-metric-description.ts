import {IMetricRules, ReadabilityMetric} from "@/types/metric-rules";

export const INTERPRETATION_RULES: IMetricRules[] = [
    {
        metric: 'fleschReadingEase',
        ranges: [
            { min: 90, max: Infinity, label: 'Very easy' },
            { min: 80, max: 90, label: 'Easy' },
            { min: 70, max: 80, label: 'Fairly easy' },
            { min: 60, max: 70, label: 'Plain English' },
            { min: 50, max: 60, label: 'Fairly difficult' },
            { min: 30, max: 50, label: 'Difficult' },
            { min: -Infinity, max: 30, label: 'Very difficult' }
        ]
    },
    {
        metric: 'fleschKincaidGrade',
        ranges: [
            { min: -Infinity, max: 5, label: 'Elementary' },
            { min: 5, max: 8, label: 'Middle school' },
            { min: 8, max: 12, label: 'High school' },
            { min: 12, max: Infinity, label: 'College level' }
        ]
    },
    {
        metric: 'gunningFog',
        ranges: [
            { min: -Infinity, max: 5, label: 'Elementary' },
            { min: 5, max: 8, label: 'Middle school' },
            { min: 8, max: 12, label: 'High school' },
            { min: 12, max: Infinity, label: 'College level' }
        ]
    },
    {
        metric: 'automatedReadabilityIndex',
        ranges: [
            { min: -Infinity, max: 5, label: 'Elementary' },
            { min: 5, max: 8, label: 'Middle school' },
            { min: 8, max: 12, label: 'High school' },
            { min: 12, max: Infinity, label: 'College level' }
        ]
    },
    {
        metric: 'colemanLiauIndex',
        ranges: [
            { min: -Infinity, max: 5, label: 'Elementary' },
            { min: 5, max: 8, label: 'Middle school' },
            { min: 8, max: 12, label: 'High school' },
            { min: 12, max: Infinity, label: 'College level' }
        ]
    },
    {
        metric: 'linsearWriteFormula',
        ranges: [
            { min: -Infinity, max: 5, label: 'Elementary' },
            { min: 5, max: 8, label: 'Middle school' },
            { min: 8, max: 12, label: 'High school' },
            { min: 12, max: Infinity, label: 'College level' }
        ]
    },
    {
        metric: 'daleChallReadabilityScore',
        ranges: [
            { min: -Infinity, max: 5, label: 'Elementary' },
            { min: 5, max: 8, label: 'Middle school' },
            { min: 8, max: 12, label: 'High school' },
            { min: 12, max: Infinity, label: 'College level' }
        ]
    },
    {
        metric: 'smogIndex',
        ranges: [
            { min: -Infinity, max: 7, label: 'Very easy' },
            { min: 7, max: 10, label: 'Moderate' },
            { min: 10, max: Infinity, label: 'Hard' }
        ],
        fallback: 'N/A'
    }
];

export default function getMetricDescription(metric: ReadabilityMetric, score: number): string {
    const rule: IMetricRules | undefined = INTERPRETATION_RULES.find(r => r.metric === metric);
    if (!rule) return '-';

    for (const range of rule.ranges) {
        if (score >= range.min && score < range.max) {
            return range.label;
        }
    }

    return rule.fallback ?? '-';
}