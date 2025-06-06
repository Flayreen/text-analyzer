import { IMetricRules, ReadabilityMetric } from '@/types/metric-rules';

export const INTERPRETATION_RULES: IMetricRules[] = [
  {
    metric: 'fleschReadingEase',
    ranges: [
      {
        min: 90,
        max: Infinity,
        label:
          'Very easy to read – Suitable for young readers or casual content (e.g., comics, children’s books)',
      },
      {
        min: 80,
        max: 90,
        label:
          'Easy to read – Ideal for general audiences, like simple blog posts or product descriptions',
      },
      {
        min: 70,
        max: 80,
        label:
          'Fairly easy to read – Comfortable for most readers, such as news articles or instructions',
      },
      {
        min: 60,
        max: 70,
        label: 'Plain English – Easily understood by 13–15 year olds',
      },
      {
        min: 50,
        max: 60,
        label:
          'Fairly difficult – May require higher concentration or background knowledge',
      },
      {
        min: 30,
        max: 50,
        label:
          'Difficult – Suitable for academic, professional, or complex technical content',
      },
      {
        min: -Infinity,
        max: 30,
        label:
          'Very difficult – Likely requires college-level reading ability; legal or scientific writing',
      },
    ],
  },
  {
    metric: 'fleschKincaidGrade',
    ranges: [
      {
        min: -Infinity,
        max: 5,
        label: 'Elementary level – Easily understood by children in grades 1–5',
      },
      {
        min: 5,
        max: 8,
        label: 'Middle school level – Suitable for ages 10–13 (grades 6–8)',
      },
      {
        min: 8,
        max: 12,
        label:
          'High school level – Appropriate for teenagers and general adult readers',
      },
      {
        min: 12,
        max: Infinity,
        label: 'College level – Requires advanced vocabulary and comprehension',
      },
    ],
  },
  {
    metric: 'gunningFog',
    ranges: [
      {
        min: -Infinity,
        max: 5,
        label:
          'Elementary level – Very easy to understand, suitable for young readers',
      },
      {
        min: 5,
        max: 8,
        label: 'Middle school level – Understandable by early teens',
      },
      {
        min: 8,
        max: 12,
        label:
          'High school level – Common in newspapers, manuals, general websites',
      },
      {
        min: 12,
        max: Infinity,
        label:
          'College level – Complex or technical writing, academic material',
      },
    ],
  },
  {
    metric: 'automatedReadabilityIndex',
    ranges: [
      {
        min: -Infinity,
        max: 5,
        label: 'Elementary level – Text is extremely simple and accessible',
      },
      {
        min: 5,
        max: 8,
        label:
          'Middle school level – Clear and easy to follow for most students',
      },
      {
        min: 8,
        max: 12,
        label:
          'High school level – Requires some reading effort or background knowledge',
      },
      {
        min: 12,
        max: Infinity,
        label: 'College level – Demands advanced comprehension skills',
      },
    ],
  },
  {
    metric: 'colemanLiauIndex',
    ranges: [
      {
        min: -Infinity,
        max: 5,
        label:
          'Elementary level – Ideal for early-grade reading or children’s content',
      },
      {
        min: 5,
        max: 8,
        label:
          'Middle school level – Balanced for educational and informal material',
      },
      {
        min: 8,
        max: 12,
        label: 'High school level – Text is moderately complex',
      },
      {
        min: 12,
        max: Infinity,
        label:
          'College level – Dense or specialized content, may require re-reading',
      },
    ],
  },
  {
    metric: 'linsearWriteFormula',
    ranges: [
      {
        min: -Infinity,
        max: 5,
        label: 'Elementary level – Very basic text, easy for all audiences',
      },
      {
        min: 5,
        max: 8,
        label: 'Middle school level – Slightly more structured and descriptive',
      },
      {
        min: 8,
        max: 12,
        label:
          'High school level – Engages with richer vocabulary or sentence length',
      },
      {
        min: 12,
        max: Infinity,
        label: 'College level – Designed for academic or technical readers',
      },
    ],
  },
  {
    metric: 'daleChallReadabilityScore',
    ranges: [
      {
        min: -Infinity,
        max: 5,
        label: 'Elementary level – Words are simple and commonly known',
      },
      {
        min: 5,
        max: 8,
        label: 'Middle school level – Mostly known words with some complexity',
      },
      {
        min: 8,
        max: 12,
        label:
          'High school level – Vocabulary and sentence structure are more advanced',
      },
      {
        min: 12,
        max: Infinity,
        label: 'College level – Contains difficult or uncommon words',
      },
    ],
  },
  {
    metric: 'smogIndex',
    ranges: [
      {
        min: -Infinity,
        max: 7,
        label: 'Very easy – Suitable for younger audiences or informal writing',
      },
      {
        min: 7,
        max: 10,
        label: 'Moderate – Understandable by the general population',
      },
      {
        min: 10,
        max: Infinity,
        label: 'Hard – Best for technical, legal, or academic writing',
      },
    ],
    fallback: 'N/A',
  },
];

export default function getMetricDescription(
  metric: ReadabilityMetric,
  score: number
): string {
  const rule: IMetricRules | undefined = INTERPRETATION_RULES.find(
    (r) => r.metric === metric
  );
  if (!rule) return '-';

  for (const range of rule.ranges) {
    if (score >= range.min && score < range.max) {
      return range.label;
    }
  }

  return rule.fallback ?? '-';
}
