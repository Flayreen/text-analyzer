import TextAnalyzer from '@/modules/text-analyzer';

export default function Home() {
  return (
    <div className="flex flex-col gap-6 h-full py-10">
      <TextAnalyzer />
    </div>
  );
}
