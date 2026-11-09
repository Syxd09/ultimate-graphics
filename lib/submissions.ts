import fs from "fs/promises";
import path from "path";

export type SubmissionStatus = "new" | "in_review" | "contacted" | "completed" | "archived";

export interface Submission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  source: string;
  status: SubmissionStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  ip?: string;
}

export interface SubmissionStats {
  total: number;
  new: number;
  inReview: number;
  contacted: number;
  completed: number;
  archived: number;
  todayCount: number;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "submissions.json");

/**
 * Ensure the submissions data file exists
 */
async function ensureFileExists(): Promise<void> {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

/**
 * Read all submissions from disk
 */
export async function getSubmissions(): Promise<Submission[]> {
  await ensureFileExists();
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const data: Submission[] = JSON.parse(raw);
    return data.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (err) {
    console.error("Error reading submissions file:", err);
    return [];
  }
}

/**
 * Atomic write to disk to prevent corrupted JSON files
 */
async function saveSubmissions(submissions: Submission[]): Promise<void> {
  await ensureFileExists();
  const tempFile = `${DATA_FILE}.tmp.${Date.now()}.${Math.random().toString(36).substring(7)}`;
  await fs.writeFile(tempFile, JSON.stringify(submissions, null, 2), "utf8");
  await fs.rename(tempFile, DATA_FILE);
}

/**
 * Get a single submission by ID
 */
export async function getSubmissionById(id: string): Promise<Submission | null> {
  const all = await getSubmissions();
  return all.find((s) => s.id === id) || null;
}

/**
 * Add a new submission from a contact form
 */
export async function createSubmission(params: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  source?: string;
  ip?: string;
}): Promise<Submission> {
  const all = await getSubmissions();

  const now = new Date().toISOString();
  const newSubmission: Submission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: params.name.trim(),
    email: params.email.trim().toLowerCase(),
    phone: params.phone?.trim() || undefined,
    service: params.service?.trim() || "General Signage & Fabrication Enquiry",
    message: params.message?.trim() || undefined,
    source: params.source?.trim() || "Website Contact Form",
    status: "new",
    notes: "",
    createdAt: now,
    updatedAt: now,
    ip: params.ip,
  };

  all.unshift(newSubmission);
  await saveSubmissions(all);

  return newSubmission;
}

/**
 * Update an existing submission (status, notes, etc.)
 */
export async function updateSubmission(
  id: string,
  updates: Partial<Pick<Submission, "status" | "notes" | "service" | "phone" | "message">>
): Promise<Submission | null> {
  const all = await getSubmissions();
  const index = all.findIndex((s) => s.id === id);

  if (index === -1) {
    return null;
  }

  const existing = all[index];
  const updated: Submission = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  all[index] = updated;
  await saveSubmissions(all);

  return updated;
}

/**
 * Delete a submission by ID
 */
export async function deleteSubmission(id: string): Promise<boolean> {
  const all = await getSubmissions();
  const filtered = all.filter((s) => s.id !== id);

  if (filtered.length === all.length) {
    return false;
  }

  await saveSubmissions(filtered);
  return true;
}

/**
 * Calculate KPI summary statistics
 */
export async function getSubmissionStats(): Promise<SubmissionStats> {
  const all = await getSubmissions();

  const todayStr = new Date().toISOString().split("T")[0];

  const stats: SubmissionStats = {
    total: all.length,
    new: 0,
    inReview: 0,
    contacted: 0,
    completed: 0,
    archived: 0,
    todayCount: 0,
  };

  for (const s of all) {
    if (s.status === "new") stats.new++;
    else if (s.status === "in_review") stats.inReview++;
    else if (s.status === "contacted") stats.contacted++;
    else if (s.status === "completed") stats.completed++;
    else if (s.status === "archived") stats.archived++;

    if (s.createdAt.startsWith(todayStr)) {
      stats.todayCount++;
    }
  }

  return stats;
}

