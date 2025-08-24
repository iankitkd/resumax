import { getResult } from "@/lib/store";
import { notFound } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const {id} = await searchParams;
  if(!id) {
    return notFound();
  }
  const result = await getResult(id);
  if(!result) {
    return notFound();
  }

  return (
    <div>

    </div>
  );
}
