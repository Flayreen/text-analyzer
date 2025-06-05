import { NextResponse } from 'next/server'
import readability from 'text-readability'

export async function POST(req: Request) {
    const { text } = await req.json()

    const score = {
        syllablesCount: readability.syllableCount(text),
        lexiconCount: readability.lexiconCount(text),
        sentencesCount: readability.sentenceCount(text),
        fleschReadingEase: readability.fleschReadingEase(text),
        fleschKincaidGrade: readability.fleschKincaidGrade(text),
        gunningFog: readability.gunningFog(text),
        smogIndex: readability.smogIndex(text),
        automatedReadabilityIndex: readability.automatedReadabilityIndex(text),
        colemanLiauIndex: readability.colemanLiauIndex(text),
        linsearWriteFormula: readability.linsearWriteFormula(text),
        daleChallReadabilityScore: readability.daleChallReadabilityScore(text),
        textStandard: readability.textStandard(text),
    }
    console.log(score)

    return NextResponse.json(score)
}