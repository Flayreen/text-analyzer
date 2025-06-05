export interface IReadabilityMetrics {
    syllablesCount: number;
    lexiconCount: number;
    sentencesCount: number;
    fleschReadingEase: number;
    fleschKincaidGrade: number;
    gunningFog: number;
    smogIndex: number;
    automatedReadabilityIndex: number;
    colemanLiauIndex: number;
    linsearWriteFormula: number;
    daleChallReadabilityScore: number;
    textStandard: string;
}