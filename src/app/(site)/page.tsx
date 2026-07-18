import { Intro } from "@/components/Intro";
import { WorkIndex } from "@/components/WorkIndex";
import { MobileWorkIndex } from "@/components/MobileWorkIndex";
import { ProjectChapter } from "@/components/ProjectChapter";
import { ChapterNav } from "@/components/ChapterNav";
import { Contact } from "@/components/Contact";
import { getProjects, getSettings } from "@/lib/content";

export default async function Home() {
  const [projects, settings] = await Promise.all([
    getProjects(),
    getSettings(),
  ]);

  return (
    <main>
      <ChapterNav projects={projects} />
      <Intro settings={settings} />

      <div id="contents">
        <WorkIndex projects={projects} />
        <MobileWorkIndex projects={projects} />
      </div>

      {projects.map((p, i) => (
        <ProjectChapter key={p.slug} project={p} priority={i === 0} />
      ))}

      <Contact settings={settings} />
    </main>
  );
}
