import { Textarea } from '@/components/ui/textarea';
import { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAnalyzerSore } from '@/store/analyzer-store';
import { ClipLoader } from 'react-spinners';

export default function TextAnalyzerInput() {
  const [inputText, setInputText] = useState<string>('');
  const { isLoadingAnalyzer, analyzeText } = useAnalyzerSore();

  const getWordsCount = (text: string): number => {
    const textArray: string[] = text.split(' ');
    return textArray.filter((word: string) => word !== '').length;
  };

  const handleAnalyzeText = async () => {
    try {
      await analyzeText(inputText);
    } catch (e) {
      console.log(e);
    }
  };

  const isDisabledButton: boolean =
    getWordsCount(inputText) < 25 ||
    getWordsCount(inputText) > 1000 ||
    isLoadingAnalyzer;

  return (
    <div className="flex flex-col gap-4 items-end h-full">
      <h1 className="text-center text-xl font-bold w-full">Text analyzer</h1>
      <div className="flex flex-col w-full bg-gray-100 rounded-md h-full">
        <Textarea
          disabled={isLoadingAnalyzer}
          className="h-full bg-white"
          value={inputText}
          placeholder="Type or paste your text here"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setInputText(e.target.value)
          }
        />
        <div className="flex flex-row justify-end items-center w-full p-2">
          <span className="font-semibold text-sm">
            {getWordsCount(inputText) < 25
              ? `Add ${25 - getWordsCount(inputText)} more words`
              : `${getWordsCount(inputText)}/1000 words`}
          </span>
        </div>
      </div>

      <Button
        className="w-full md:w-fit cursor-pointer min-w-[200px]"
        disabled={isDisabledButton}
        onClick={handleAnalyzeText}
      >
        {isLoadingAnalyzer && <ClipLoader size={24} color="#4fa94d" />}
        Scan for readability
      </Button>
    </div>
  );
}
