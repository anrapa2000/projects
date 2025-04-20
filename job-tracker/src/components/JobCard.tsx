// components/JobCard.tsx
import React from "react";
import Link from "next/link";

export type Job = {
  id: string;
  company: string;
  position: string;
  shortDescription: string;
  dateApplied: string;
  status: "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";
};

export default function JobCard({ job }: { job: Job }) {
  const statusColors = {
    APPLIED: "bg-blue-100 text-blue-700",
    INTERVIEW: "bg-yellow-100 text-yellow-700",
    OFFER: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  return (
    <Link href={`/job/${job.id}`}>
      <div className="border rounded p-4 mb-4 shadow hover:bg-gray-50 transition cursor-pointer">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{job.position}</h2>
          <span
            className={`text-xs px-2 py-1 rounded ${statusColors[job.status]}`}
          >
            {job.status}
          </span>
        </div>
        <p className="text-gray-700">{job.company}</p>
        <p className="text-sm text-gray-500 mt-1">{job.shortDescription}</p>
        <p className="text-sm text-gray-400 mt-2">
          Applied on {new Date(job.dateApplied).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}
