import { notFound, redirect } from "next/navigation";
import Image from "next/image";

import { auth } from "@/auth";
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
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect("/login");
  }
  
  const { id } = await searchParams;
  if (!id) {
    return notFound();
  }
  const result = await getResult(id, userId);
  if (!result) {
    return notFound();
  }

  const data = JSON.parse(result);
  const feedback: Feedback = JSON.parse(data.feedback);
  const imageUrl = data.imageUrl;

  return (
    <div className="">
      <h2 className="text-4xl text-black font-bold text-center py-6">Resume Review</h2>

      <div className="w-full flex flex-col-reverse lg:flex-row justify-between gap-6">
        <section className="w-full lg:w-[35%]">
          {imageUrl && (
            <div className="w-full sticky top-14 px-2">
              <Image src={imageUrl} alt="Resume" height={300} width={200} className="w-full object-cover rounded-lg" />
            </div>
          )}
        </section>

        <section className="w-full flex-1 max-w-4xl pb-8">
          <div className="flex flex-col gap-8">
            <Summary feedback={feedback} />
            <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
            <Details feedback={feedback} />
          </div>
        </section>
      </div>
    </div>
  );
}
