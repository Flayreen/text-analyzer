"use client";

import {Textarea} from "@/components/ui/textarea";
import {useAnalyzerSore} from "@/store/analyzer-store";
import {ChangeEvent, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {IInterpretedMetricsScore} from "@/types/interpreted-metrics";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export default function TextAnalyzer() {
    const [inputText, setInputText] = useState<string>("");
    const {interpretedMetrics, isLoadingAnalyzer, analyzeText} = useAnalyzerSore();

    const getWordsCount = (text: string): number => {
        const textArray: string[] = text.split(" ");
        return textArray.filter((word: string) => word !== "" ).length;
    }

    const handleAnalyzeText = async () => {
        try {
            await analyzeText(inputText);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 items-end">
                <Textarea
                    value={inputText}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
                />

                <span>
                    {getWordsCount(inputText) < 25 ? (
                        `Add ${25 - getWordsCount(inputText)} more words`
                    ) : (
                        `${getWordsCount(inputText)}/1000 words`
                    )}
                </span>

                <Button
                    className="w-full md:w-fit cursor-pointer"
                    disabled={getWordsCount(inputText) < 25 || getWordsCount(inputText) > 1000 || isLoadingAnalyzer}
                    onClick={handleAnalyzeText}
                >
                    Scan for readability
                </Button>
            </div>

            {interpretedMetrics && (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4 items-center">
                        <Card className="w-full flex flex-row justify-between items-center gap-3 px-4">
                            <span>Word count</span>
                            <span>{interpretedMetrics.statistic.wordCount}</span>
                        </Card>
                        <Card className="w-full flex flex-row justify-between items-center gap-3 px-4">
                            <span>Sentence count</span>
                            <span>{interpretedMetrics.statistic.sentenceCount}</span>
                        </Card>
                        <Card className="w-full flex flex-row justify-between items-center gap-3 px-4">
                            <span>Syllable count</span>
                            <span>{interpretedMetrics.statistic.syllablesCount}</span>
                        </Card>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Metric</TableHead>
                                <TableHead>Score</TableHead>
                                <TableHead className="text-right">Interpretation</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {interpretedMetrics.scores.map((score: IInterpretedMetricsScore, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{score.title}</TableCell>
                                    <TableCell>{score.value}</TableCell>
                                    <TableCell className="text-right">{score.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}