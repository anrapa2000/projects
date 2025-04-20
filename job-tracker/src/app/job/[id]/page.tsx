// src/app/job/[id]/page.tsx
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
  })

  if (!job) return notFound()

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{job.position}</h1>
      <p className="text-xl text-gray-700 mb-4">{job.company}</p>

      <div className="mb-4">
        <span className="text-sm px-2 py-1 rounded bg-gray-100 text-gray-800">
          Status: {job.status}
        </span>
        <p className="text-sm text-gray-400 mt-1">
          Applied on: {new Date(job.dateApplied).toLocaleDateString()}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Full Description</h2>
        <p className="text-gray-700 whitespace-pre-line">{job.longDescription}</p>
      </div>

      {job.notes && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Notes</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.notes}</p>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Resume Used</h2>
        <p className="text-blue-600">{job.resumeFile || 'None uploaded'}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Cover Letter</h2>
        <p className="text-blue-600">{job.coverLetterFile || 'None uploaded'}</p>
      </div>

      {job.images && job.images.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Images</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {job.images.map((imgUrl, index) => (
              <Image
                key={index}
                src={imgUrl}
                alt={`Image ${index + 1}`}
                className="w-32 h-32 object-cover rounded border"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
