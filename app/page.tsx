import Link from "next/link";
import { getClient } from "@/lib/apollo-client";
import { GET_PAGES } from "@/graphql/queries/GetPages";

interface WPPage {
  id: string;
  title: string;
  slug: string;
  date: string;
}

interface GetPagesData {
  pages: { nodes: WPPage[] };
}

export default async function Home() {
  const client = getClient();
  const { data } = await client.query<GetPagesData>({ query: GET_PAGES });
  const pages = data?.pages?.nodes ?? [];

  return (
    <main className="max-w-2xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-semibold mb-8">WordPress Pages</h1>
      {pages.length === 0 ? (
        <p className="text-zinc-500">No pages found.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {pages.map((page: WPPage) => (
            <li key={page.id} className="border border-zinc-200 rounded-lg p-4">
              <Link href={`/${page.slug}`}>
                <h2 className="text-lg font-medium hover:underline">{page.title}</h2>
              </Link>
              <p className="text-sm text-zinc-500 mt-1">
                /{page.slug} &middot; {new Date(page.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
