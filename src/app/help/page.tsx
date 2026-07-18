import type { Metadata } from "next";
import { getGuides } from "@/lib/guides";
import { HelpBrowser } from "./HelpBrowser";
import "./help.css";

export const metadata: Metadata = {
  title: "Guides",
  robots: { index: false },
};

export default async function HelpPage() {
  const guides = await getGuides();
  return (
    <div className="help-page">
      <header className="help-top">
        <span>Ellie Parsonage / Guides</span>
        <a href="/ellieadmin">← Back to editor</a>
      </header>
      <HelpBrowser guides={guides} />
    </div>
  );
}
