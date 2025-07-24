import products from "../../data/products.json";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  summary: string;
  date: string;
  images: string[];
  details: string;
  challenges: string[];
  solutionsProvided: string[];
  projectImpact: string[];
  afterSalesService: string[];
}

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const { default: products } = await import("../../data/products.json");

  const product = products.find((p) => p.id === params.id) as Product;

  if (!product) return notFound();

  const index = products.findIndex((p) => p.id === product.id);
  const prev = index > 0 ? (products[index - 1] as Product) : null;
  const next =
    index < products.length - 1 ? (products[index + 1] as Product) : null;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-sm text-gray-500">{product.date}</p>

      {product.images.length > 0 && (
        <Image
          src={product.images[0]}
          alt={product.name}
          width={800}
          height={500}
          className="rounded-xl"
        />
      )}

      <p className="text-lg text-gray-700">{product.details}</p>

      <div className="space-y-4">
        {product.challenges?.length > 0 && (
          <div>
            <h2 className="font-semibold text-lg">Challenges</h2>
            <ul className="list-disc ml-6 text-sm text-gray-600">
              {product.challenges.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        {product.solutionsProvided?.length > 0 && (
          <div>
            <h2 className="font-semibold text-lg">Solutions Provided</h2>
            <ul className="list-disc ml-6 text-sm text-gray-600">
              {product.solutionsProvided.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {product.projectImpact?.length > 0 && (
          <div>
            <h2 className="font-semibold text-lg">Project Impact</h2>
            <ul className="list-disc ml-6 text-sm text-gray-600">
              {product.projectImpact.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        )}

        {product.afterSalesService?.length > 0 && (
          <div>
            <h2 className="font-semibold text-lg">After-Sales Service</h2>
            <ul className="list-disc ml-6 text-sm text-gray-600">
              {product.afterSalesService.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-8 text-sm">
        {prev ? (
          <Link href={`/products/${prev.id}`} className="text-blue-500">
            ← {prev.name}
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link href={`/products/${next.id}`} className="text-blue-500">
            {next.name} →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
