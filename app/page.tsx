import homeData from "./_raw/home.json";
import FramerScriptsRunner from "@/components/FramerScriptsRunner";

export default function HomePage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: homeData.styles }} />
      <div dangerouslySetInnerHTML={{ __html: homeData.mainHtml }} />
      <FramerScriptsRunner scriptsHtml={homeData.scripts} />
    </>
  );
}
