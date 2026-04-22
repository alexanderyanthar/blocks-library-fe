import Link from "next/link";
import { notFound } from "next/navigation";
import { getClient } from "@/lib/apollo-client";
import { GET_PROJECT_BY_SLUG } from "@/graphql/queries/GetProjectBySlug";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import type { Block } from "@/types/blocks";

interface WPProject {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  editorBlocks: Block[];
}

interface GetProjectBySlugData {
  project: WPProject | null;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const client = getClient();
  const { data } = await client.query<GetProjectBySlugData>({
    query: GET_PROJECT_BY_SLUG,
    variables: { slug },
  });

  const project = data?.project;
  if (!project) notFound();

  const { title, date, editorBlocks, content } = project;

  return (
    <main className="max-w-2xl mx-auto py-16 px-6">
      <Link href="/projects" className="text-sm text-zinc-500 hover:underline mb-6 inline-block">
        ← All Projects
      </Link>
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
