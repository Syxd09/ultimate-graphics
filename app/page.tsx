import { getRawPageData } from "@/lib/raw-data";
import FramerScriptsRunner from "@/components/FramerScriptsRunner";

export default function HomePage() {
  const homeData = getRawPageData("home.json");

  return (
    <>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: homeData.styles }} />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: homeData.mainHtml }} />
      <FramerScriptsRunner scriptsHtml={homeData.scripts} />
    </>
  );
}
