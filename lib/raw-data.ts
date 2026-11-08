import fs from "fs";
import path from "path";

export interface RawPageData {
  styles: string;
  mainHtml: string;
  scripts: string;
}

export function getRawPageData(fileName: string): RawPageData {
  const filePath = path.join(process.cwd(), "app", "_raw", fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Raw page data file not found: ${filePath}`);
  }
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as RawPageData;
}

