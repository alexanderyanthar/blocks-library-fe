import { notFound } from "next/navigation";
import { getClient } from "@/lib/apollo-client";
import { GET_PAGE_BY_SLUG } from "@/graphql/queries/GetPageBySlug";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import type { Block } from "@/types/blocks";

interface WPPageFull {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  editorBlocks: Block[];
}

interface GetPageBySlugData {
  page: WPPageFull | null;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const client = getClient();
  const { data } = await client.query<GetPageBySlugData>({
    query: GET_PAGE_BY_SLUG,
    variables: { slug },
  });

  const page = data?.page;
  if (!page) notFound();

  const { title, date, editorBlocks, content } = page;

  return (
    <main className="max-w-2xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-semibold mb-2">{title}</h1>
      <p className="text-sm text-zinc-500 mb-8">
        {new Date(date).toLocaleDateString()}
      </p>
      {editorBlocks?.length > 0 ? (
        <BlockRenderer blocks={editorBlocks} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </main>
  );
}
