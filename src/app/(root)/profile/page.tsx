import { getUserResults } from "@/actions/results";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ResumeCard from "@/components/resume/ResumeCard";
import SignoutButton from "@/components/auth/SignoutButton";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const results = await getUserResults(session.user.id);

  const totalResumes = results.length;
  const latest = results[0]?.createdAt;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold">Profile Dashboard</h1>
            <p className="text-gray-500 mt-1">{session.user.name ?? "User"}</p>
            <p className="text-gray-400 text-sm">{session.user.email}</p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/upload"
              className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Analyze Resume
            </Link>

            <SignoutButton />
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-gray-500 text-sm">Total Resumes</p>
            <h2 className="text-3xl font-bold mt-2">{totalResumes}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-gray-500 text-sm">Latest Analysis</p>
            <h2 className="text-lg font-semibold mt-2">
              {latest
                ? new Date(latest).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "No data"}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-gray-500 text-sm">Account</p>
            <h2 className="text-lg font-semibold mt-2">Active</h2>
          </div>
        </div>

        {/* Resume History */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">Resume Analysis History</h2>
        </div>

        {results.length === 0 && (
          <div className="bg-white border rounded-xl p-10 text-center shadow-sm">
            <p className="text-gray-500">
              You haven't analyzed any resumes yet.
            </p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((r) => (
            <ResumeCard
              key={r.id}
              id={r.id}
              previewImage={r.previewImage}
              previewText={r.previewText}
              createdAt={r.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
