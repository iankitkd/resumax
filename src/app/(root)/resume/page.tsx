import { notFound } from "next/navigation";

import { getResult } from "@/lib/store";
import { Feedback } from "@/types";

import Summary from "@/components/resume/Summary";
import ATS from "@/components/resume/ATS";
import Details from "@/components/resume/Details";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { id } = await searchParams;
  if (!id) {
    return notFound();
  }
  const result = await getResult(id);
  if (!result) {
    return notFound();
  }

  const data = JSON.parse(result);
  const feedback: Feedback = JSON.parse(data.feedback);

  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-4xl text-black font-bold text-center p-4">Resume Review</h2>
      <div className="flex flex-col gap-8">
        <Summary feedback={feedback} />
        <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
        <Details feedback={feedback} />
      </div>
    </section>
  );
}
