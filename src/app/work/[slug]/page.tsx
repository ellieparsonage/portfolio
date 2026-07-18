import { redirect } from "next/navigation";
import { getProject, projects } from "@/lib/projects";

// The portfolio is now a single continuous page; each project is a section.
// Keep these URLs working as shareable deep-links by redirecting to the anchor.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  redirect(project ? `/#${project.slug}` : "/");
}
