import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type ProjectDetailsProps = { params: Promise<{ id: string }> };

async function getProject(id: string) {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "";

  const res = await fetch(`${baseUrl}/api/projects/${encodeURIComponent(id)}`, {
    cache: "no-store",
    next: { revalidate: 0 },
  }).catch(() => null);

  if (!res || !res.ok) return null;
  return res.json();
}

export default async function ProjectDetails({ params }: ProjectDetailsProps) {
  const { id } = await params;
  if (!id) return notFound();

  const data = await getProject(id);
  if (!data || data.error) return notFound();

  const { project, related, prev, next } = data;

  return (
    <div className="min-h-screen bg-white py-16 px-6 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">{project.name}</h1>
        <p className="text-gray-600 max-w-3xl mx-auto mb-2 text-lg">
          {project.summary}
        </p>
        <p className="text-sm text-gray-400 mb-4">{project.date}</p>
        <div className="flex justify-between mt-6">
          {prev ? (
            <Link
              href={`/projects/${prev.id}`}
              className="text-blue-600 hover:underline"
            >
              ← {prev.name}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.id}`}
              className="text-blue-600 hover:underline"
            >
              {next.name} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
      {/* Images Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {(project.images || [])
          .slice(0, 2)
          .map((img: string, index: number) => (
            <div
              key={index}
              className="relative w-full h-80 rounded-2xl overflow-hidden"
            >
              <Image
                src={img}
                alt={`Project image ${index + 1}`}
                fill
                className="object-cover object-center"
                style={{ borderRadius: "inherit" }}
              />
            </div>
          ))}
      </div>
      {/* Details */}
      <div className="mb-8">
        <p className="text-gray-700 text-lg mb-6">{project.details}</p>
      </div>
      {/* Challenges */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Challenges Faced:</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {(project.challenges || []).map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      {/* Related Projects */}
      <div className="mt-16">
        <h3 className="text-lg font-semibold mb-4">Other Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {related.map((rel: any) => (
            <Link
              key={rel.id}
              href={`/projects/${rel.id}`}
              className="block group hover:scale-105 transition-transform"
            >
              <div className="relative w-full h-60 rounded-2xl overflow-hidden shadow-lg bg-white">
                <div
                  className="absolute inset-0 bg-white z-0"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
                  }}
                />
                {rel.images && rel.images[0] && (
                  <Image
                    src={rel.images[0]}
                    alt={rel.name}
                    fill
                    className="object-cover object-center z-10"
                    style={{ borderRadius: "inherit" }}
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    {rel.name}
                  </h4>
                  <p className="text-gray-700 text-base font-medium mb-2 line-clamp-2">
                    {rel.summary}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
