// app/new/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

export default function NewJobPage() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    console.log("Submitting with data:", data);

    const resumeFile = data.resumeFile?.[0]?.name || "";
    const coverLetterFile = data.coverLetterFile?.[0]?.name || "";

    const payload = {
      company: data.company,
      position: data.position,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      status: data.status,
      dateApplied: data.dateApplied,
      notes: data.notes,
      resumeFile,
      coverLetterFile,
      images: [],
    };

    const res = await fetch("/api/jobs", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("response:", await res.json());
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Job</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("company")}
          placeholder="Company"
          className="input"
          required
        />
        <input
          {...register("position")}
          placeholder="Position"
          className="input"
          required
        />
        <input
          type="date"
          {...register("dateApplied")}
          className="input"
          required
        />
        <textarea
          {...register("shortDescription")}
          placeholder="Short Description"
          className="input"
        />
        <textarea
          {...register("longDescription")}
          placeholder="Full Job Description"
          className="input"
        />
        <select {...register("status")} className="input">
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <textarea
          {...register("notes")}
          placeholder="Additional Notes"
          className="input"
        />

        <label className="block">Resume Used</label>
        <input type="file" {...register("resumeFile")} className="input" />

        <label className="block">Cover Letter</label>
        <input type="file" {...register("coverLetterFile")} className="input" />

        <label className="block">Images (optional)</label>
        <input type="file" {...register("images")} multiple className="input" />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Add Job"}
        </button>
      </form>
    </div>
  );
}
