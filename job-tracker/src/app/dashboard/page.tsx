// app/dashboard/page.tsx
import JobCard, { Job } from "@/components/JobCard";

async function getJobs(): Promise<Job[]> {
  const res = await fetch("http://localhost:3000/api/jobs", {
    cache: "no-store",
  });
  return res.json();
}

export default async function DashboardPage() {
  const jobs = await getJobs();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Job Dashboard</h1>
      {jobs.length === 0 && (
        <p className="text-gray-600">
          No jobs added yet.{" "}
          <a href="/new" className="underline text-blue-600">
            Add one
          </a>
          .
        </p>
      )}
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
