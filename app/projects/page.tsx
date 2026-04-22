import Link from "next/link";
import { getClient } from "@/lib/apollo-client";
import { GET_PROJECTS } from "@/graphql/queries/GetProjects";

interface WPProject {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
}

interface GetProjectsData {
  projects: { nodes: WPProject[] };
}

export default async function ProjectsPage() {
  const client = getClient();
  const { data } = await client.query<GetProjectsData>({ query: GET_PROJECTS });
  const projects = data?.projects?.nodes ?? [];

  return (
    <main className="max-w-2xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-semibold mb-8">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-zinc-500">No projects found.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {projects.map((project) => (
            <li key={project.id} className="border border-zinc-200 rounded-lg p-4">
              <Link href={`/projects/${project.slug}`}>
                <h2 className="text-lg font-medium hover:underline">{project.title}</h2>
              </Link>
              {project.excerpt && (
                <div
                  className="text-sm text-zinc-500 mt-1"
                  dangerouslySetInnerHTML={{ __html: project.excerpt }}
                />
              )}
              <p className="text-xs text-zinc-400 mt-2">
                {new Date(project.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
