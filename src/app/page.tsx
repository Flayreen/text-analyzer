import TextAnalyzer from "@/modules/text-analyzer";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
        <h1 className="text-center text-xl font-bold">Text analyzer</h1>
        <TextAnalyzer/>
    </div>
  );
}
