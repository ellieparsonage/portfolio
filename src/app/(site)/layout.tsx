import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";

// Wraps only the public site with smooth-scroll + custom cursor.
// The /keystatic editor lives outside this group, so it renders clean.
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Cursor />
      <SmoothScroll>{children}</SmoothScroll>
    </>
  );
}
