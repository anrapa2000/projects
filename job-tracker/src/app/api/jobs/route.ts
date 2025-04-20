// app/api/jobs/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received job data:", body);

    const newJob = await prisma.job.create({
      data: {
        userId: "test-user", // ← Replace this later with real user ID from auth
        company: body.company,
        position: body.position,
        shortDescription: body.shortDescription || "",
        longDescription: body.longDescription || "",
        status: body.status || "APPLIED",
        dateApplied: new Date(body.dateApplied),
        resumeFile: body.resumeFile || "",
        coverLetterFile: body.coverLetterFile || "",
        notes: body.notes || "",
        images: [], // We’ll handle real image upload later
      },
    });
    console.log("Job added successfully:", newJob);
    return NextResponse.json(newJob, { status: 201 });
  } catch (err) {
    console.error("Error adding job:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const jobs = await prisma.job.findMany({
    orderBy: {
      dateApplied: "desc",
    },
  });

  return NextResponse.json(jobs);
}
