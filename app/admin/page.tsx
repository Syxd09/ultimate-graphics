"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import type { Submission, SubmissionStats, SubmissionStatus } from "@/lib/submissions";
import type { Project, BlogPost } from "@/lib/cms";

type AdminTab = "inquiries" | "works" | "blog" | "media";

interface MediaItem {
  name: string;
  url: string;
  size: number;
  ext: string;
  mtime: string;
}

// Clean, precise architectural SVG icons (zero emojis)
const Icons = {
  inbox: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  works: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <rect x="2" y="7" width="20" height="14" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  article: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  media: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <rect x="3" y="3" width="18" height="18" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  chevronLeft: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  chevronRight: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  sync: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    </svg>
  ),
  download: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  upload: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  plus: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  copy: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  phone: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  mail: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" />
      <polyline points="22 6 12 13 2 6" />
    </svg>
  ),
  fileText: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  close: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  clock: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  menu: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  check: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  lock: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <rect x="3" y="11" width="18" height="11" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
};

export default function AdminDashboard() {
  // Auth state
  const [authStatus, setAuthStatus] = useState<"loading" | "unauthenticated" | "authenticated">("loading");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Sidebar Open / Close State (collapsible)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Live Studio Clock (London GMT)
  const [londonTime, setLondonTime] = useState("");

  // Navigation tab
  const [activeTab, setActiveTab] = useState<AdminTab>("inquiries");

  // Inquiries / Leads state
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState<SubmissionStats | null>(null);
  const [searchInquiries, setSearchInquiries] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Submission | null>(null);
  const [notesDraft, setNotesDraft] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Works state
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchWorks, setSearchWorks] = useState("");
  const [worksCategoryFilter, setWorksCategoryFilter] = useState("all");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Blog state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchBlog, setSearchBlog] = useState("");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  // Media state
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [searchMedia, setSearchMedia] = useState("");
  const [mediaFormatFilter, setMediaFormatFilter] = useState<string>("all");
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [previewMediaUrl, setPreviewMediaUrl] = useState<string | null>(null);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<"project" | "blog" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // UI feedback & dialogs
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ type: string; id: string } | null>(null);

  // Initial check on mount & live clock
  useEffect(() => {
    checkAuth();

    const updateClock = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString("en-GB", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setLondonTime(`${timeStr} GMT`);
      } catch {
        setLondonTime("LONDON STUDIO");
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Lock outer viewport so the window never scrolls; only inner content container scrolls
  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevHtmlHeight = document.documentElement.style.height;
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyHeight = document.body.style.height;

    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.documentElement.style.height = prevHtmlHeight;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.height = prevBodyHeight;
    };
  }, []);

  // Keyboard shortcut listener: ESC to close modals, '[' to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (previewMediaUrl) setPreviewMediaUrl(null);
        else if (confirmDelete) setConfirmDelete(null);
        else if (mediaPickerTarget) setMediaPickerTarget(null);
        else if (isProjectModalOpen) setIsProjectModalOpen(false);
        else if (isBlogModalOpen) setIsBlogModalOpen(false);
        else if (selectedLead) setSelectedLead(null);
      } else if (e.key === "[" && !e.ctrlKey && !e.metaKey && authStatus === "authenticated") {
        const target = e.target as HTMLElement;
        if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")) {
          return;
        }
        setIsSidebarOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewMediaUrl, confirmDelete, mediaPickerTarget, isProjectModalOpen, isBlogModalOpen, selectedLead, authStatus]);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3500);
  };

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/auth");
      if (res.ok) {
        setAuthStatus("authenticated");
        fetchAllData();
      } else {
        setAuthStatus("unauthenticated");
      }
    } catch {
      setAuthStatus("unauthenticated");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Incorrect master passcode");
      }

      setAuthStatus("authenticated");
      setPasswordInput("");
      fetchAllData();
      showToast("Access authorized. Studio CMS online.");
    } catch (err: any) {
      setLoginError(err.message || "Failed to authenticate.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      setAuthStatus("unauthenticated");
      showToast("Session locked.");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const fetchAllData = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        fetchSubmissions(),
        fetchProjects(),
        fetchBlogPosts(),
        fetchMediaList(),
      ]);
    } finally {
      setIsRefreshing(false);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await fetch("/api/admin/submissions");
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
        setStats(data.stats || null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/works");
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const res = await fetch("/api/admin/blog");
      if (res.ok) {
        const data = await res.json();
        setBlogPosts(data.posts || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMediaList = async () => {
    try {
      const res = await fetch("/api/admin/media");
      if (res.ok) {
        const data = await res.json();
        setMediaList(data.media || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- INQUIRY HANDLERS ----------------
  const handleStatusChange = async (id: string, newStatus: SubmissionStatus) => {
    setActionLoadingId(id);
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setSubmissions((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      if (data.stats) setStats(data.stats);
      showToast(`Status updated to ${formatStatusName(newStatus)}`);
    } catch (err: any) {
      showToast(err.message || "Failed to update status", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setIsSavingNotes(true);
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedLead.id, notes: notesDraft }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setSubmissions((prev) =>
        prev.map((item) => (item.id === selectedLead.id ? { ...item, notes: notesDraft } : item))
      );
      setSelectedLead((prev) => (prev ? { ...prev, notes: notesDraft } : null));
      showToast("Fabrication log saved.");
    } catch (err: any) {
      showToast(err.message || "Failed to save log", "error");
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/submissions?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setSubmissions((prev) => prev.filter((item) => item.id !== id));
      if (selectedLead && selectedLead.id === id) setSelectedLead(null);
      if (data.stats) setStats(data.stats);
      setConfirmDelete(null);
      showToast("Inquiry deleted permanently.");
    } catch (err: any) {
      showToast(err.message || "Failed to delete", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleCreateTestLead = async () => {
    try {
      const services = [
        "12kW Fiber Laser Cutting",
        "Illuminated 3D Channel Letters",
        "Architectural Facade & Monolith Signage",
        "Commercial Fleet Branding & 3M Wraps",
        "5-Axis Precision CNC Milling",
      ];
      const randomService = services[Math.floor(Math.random() * services.length)];
      const clientProfiles = [
        { name: "Sir Julian Sterling", service: "Bespoke Halo-Lit Brass Channel Letters", spec: "Mayfair private office entrance. Hand-brushed marine brass, 2700K ultra-warm halo illumination, concealed wiring." },
        { name: "Claire Dupont", service: "12kW Fiber Laser Cladding", spec: "3000mm x 1500mm perforated facade panels in 4mm anodized architectural aluminum for Soho gallery." },
        { name: "Harrison Shaw", service: "3M Fleet Wrap Fleet Program", spec: "12 Mercedes Sprinter L3H2 long-wheelbase delivery vans. 3M IJ180mC cast film with 8518 gloss laminate." },
        { name: "Beatrix Vance", service: "Architectural Wayfinding Totems", spec: "Double-sided illuminated monument sign with 12kW laser cut stencil lettering and amber perimeter accents." },
      ];
      const pick = clientProfiles[Math.floor(Math.random() * clientProfiles.length)];

      const res = await fetch("/api/admin/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: pick.name,
          email: `${pick.name.toLowerCase().replace(/[^a-z]/g, ".")}@londonstudio.co.uk`,
          phone: "+44 20 7946 " + Math.floor(1000 + Math.random() * 9000),
          service: pick.service || randomService,
          message: pick.spec,
          source: "Direct Quote Portal",
        }),
      });

      const data = await res.json();
      if (data.success && data.submission) {
        setSubmissions((prev) => [data.submission, ...prev]);
        if (data.stats) setStats(data.stats);
        showToast(`Simulated inquiry received: ${pick.name}`);
      }
    } catch {
      showToast("Failed to simulate inquiry", "error");
    }
  };

  // ---------------- WORKS / CASE STUDIES HANDLERS ----------------
  const handleOpenProjectModal = (proj?: Project) => {
    if (proj) {
      setEditingProject({ ...proj });
    } else {
      setEditingProject({
        id: "",
        slug: "",
        title: "",
        subtitle: "",
        client: "",
        year: "2026",
        category: "Architectural Signage",
        tags: ["Architectural Signage", "12kW Laser", "Channel Letters"],
        image: "/images/qWv5OBNRreRPv9FqvBaNWdZK4.jpg",
        summary: "",
        challenge: "",
        solution: "",
        results: [
          { label: "Fabrication Turnaround", value: "10 Days" },
          { label: "Structural Warranty", value: "10 Years" },
        ],
        featured: true,
      });
    }
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    try {
      const isNew = !editingProject.id;
      const res = await fetch("/api/admin/works", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      if (isNew) {
        setProjects((prev) => [data.project, ...prev]);
        showToast("New case study published!");
      } else {
        setProjects((prev) => prev.map((p) => (p.id === data.project.id ? data.project : p)));
        showToast("Case study updated successfully!");
      }
      setIsProjectModalOpen(false);
      setEditingProject(null);
    } catch (err: any) {
      showToast(err.message || "Failed to save project", "error");
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/works?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setProjects((prev) => prev.filter((p) => p.id !== id && p.slug !== id));
      setConfirmDelete(null);
      showToast("Case study removed.");
    } catch (err: any) {
      showToast(err.message || "Failed to delete project", "error");
    }
  };

  // ---------------- BLOG ARTICLES HANDLERS ----------------
  const handleOpenBlogModal = (post?: BlogPost) => {
    if (post) {
      setEditingPost({ ...post });
    } else {
      setEditingPost({
        slug: "",
        title: "",
        subtitle: "",
        category: "Technical Guide",
        date: "March 2026",
        readTime: "5 min read",
        image: "/images/VhyohSgiQO3sBPZXatgzi0sVXFI.png",
        excerpt: "",
        content: [
          "When specifying exterior commercial signage, the most frequent failure point isn't aesthetic — it's galvanic corrosion and improper thermal expansion allowances between dissimilar metals.",
          "In British and European climates, rapid temperature cycling creates substantial structural movement that requires engineered mechanical isolation.",
        ],
      });
    }
    setIsBlogModalOpen(true);
  };

  const handleSaveBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !editingPost.title) return;

    try {
      const isNew = !blogPosts.some((b) => b.slug === editingPost.slug);
      const res = await fetch("/api/admin/blog", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPost),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      if (isNew) {
        setBlogPosts((prev) => [data.post, ...prev]);
        showToast("Article published to journal!");
      } else {
        setBlogPosts((prev) => prev.map((b) => (b.slug === data.post.slug ? data.post : b)));
        showToast("Article updated successfully!");
      }
      setIsBlogModalOpen(false);
      setEditingPost(null);
    } catch (err: any) {
      showToast(err.message || "Failed to save blog post", "error");
    }
  };

  const handleDeleteBlogPost = async (slug: string) => {
    try {
      const res = await fetch(`/api/admin/blog?slug=${encodeURIComponent(slug)}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setBlogPosts((prev) => prev.filter((b) => b.slug !== slug));
      setConfirmDelete(null);
      showToast("Article deleted.");
    } catch (err: any) {
      showToast(err.message || "Failed to delete article", "error");
    }
  };

  // ---------------- MEDIA VAULT HANDLERS ----------------
  const handleUploadFileDirectly = async (file: File) => {
    setIsUploadingMedia(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setMediaList((prev) => [data.file, ...prev]);
      showToast(`Uploaded: ${data.file.name}`);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      showToast(err.message || "Failed to upload image", "error");
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    await handleUploadFileDirectly(files[0]);
  };

  const handleDropFile = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await handleUploadFileDirectly(files[0]);
    }
  };

  const handleDeleteMedia = async (name: string) => {
    try {
      const res = await fetch(`/api/admin/media?name=${encodeURIComponent(name)}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setMediaList((prev) => prev.filter((m) => m.name !== name));
      setConfirmDelete(null);
      showToast("Asset removed from disk.");
    } catch (err: any) {
      showToast(err.message || "Failed to delete image", "error");
    }
  };

  const copyToClipboard = (text: string, label: string = "Path") => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard`);
  };

  // Select image from media vault picker modal
  const handleSelectMediaForTarget = (url: string) => {
    if (mediaPickerTarget === "project" && editingProject) {
      setEditingProject({ ...editingProject, image: url });
      showToast(`Asset linked to case study: ${url}`);
    } else if (mediaPickerTarget === "blog" && editingPost) {
      setEditingPost({ ...editingPost, image: url });
      showToast(`Asset linked to article: ${url}`);
    }
    setMediaPickerTarget(null);
  };

  // Formatting utilities
  const formatTimeAgo = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const diffMs = Date.now() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 2) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    } catch {
      return dateStr;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatStatusName = (status: SubmissionStatus) => {
    switch (status) {
      case "new": return "New Lead";
      case "in_review": return "In Review";
      case "contacted": return "Contacted";
      case "completed": return "Completed";
      case "archived": return "Archived";
      default: return status;
    }
  };

  const getStatusBadgeStyle = (status: SubmissionStatus) => {
    switch (status) {
      case "new":
        return { bg: "rgba(16, 185, 129, 0.12)", color: "#34D399", border: "rgba(16, 185, 129, 0.4)", dot: "#10B981" };
      case "in_review":
        return { bg: "rgba(245, 158, 11, 0.12)", color: "#FBBF24", border: "rgba(245, 158, 11, 0.4)", dot: "#F59E0B" };
      case "contacted":
        return { bg: "rgba(59, 130, 246, 0.12)", color: "#60A5FA", border: "rgba(59, 130, 246, 0.4)", dot: "#3B82F6" };
      case "completed":
        return { bg: "rgba(139, 92, 246, 0.12)", color: "#A78BFA", border: "rgba(139, 92, 246, 0.4)", dot: "#8B5CF6" };
      case "archived":
      default:
        return { bg: "rgba(156, 163, 175, 0.1)", color: "#9CA3AF", border: "rgba(156, 163, 175, 0.25)", dot: "#6B7280" };
    }
  };

  // Filter computations
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((item) => {
      const q = searchInquiries.toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        (item.phone && item.phone.toLowerCase().includes(q)) ||
        (item.service && item.service.toLowerCase().includes(q)) ||
        (item.message && item.message.toLowerCase().includes(q)) ||
        (item.notes && item.notes.toLowerCase().includes(q));

      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [submissions, searchInquiries, statusFilter]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const q = searchWorks.toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));

      const matchesCategory =
        worksCategoryFilter === "all" ||
        p.category.toLowerCase().includes(worksCategoryFilter.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchWorks, worksCategoryFilter]);

  const filteredBlogPosts = useMemo(() => {
    return blogPosts.filter((b) => {
      const q = searchBlog.toLowerCase();
      return (
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q)
      );
    });
  }, [blogPosts, searchBlog]);

  const filteredMedia = useMemo(() => {
    return mediaList.filter((m) => {
      const q = searchMedia.toLowerCase();
      const matchesText = !q || m.name.toLowerCase().includes(q) || m.ext.toLowerCase().includes(q);
      const matchesFormat =
        mediaFormatFilter === "all" || m.ext.toLowerCase() === mediaFormatFilter.toLowerCase();
      return matchesText && matchesFormat;
    });
  }, [mediaList, searchMedia, mediaFormatFilter]);

  // Global strict 0px border-radius styling enforcement & layout bounds
  const strictSharpStyles = (
    <style>{`
      html, body {
        height: 100vh !important;
        max-height: 100vh !important;
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
        background-color: #070707 !important;
      }
      .admin-dashboard,
      .admin-dashboard *,
      .admin-dashboard *::before,
      .admin-dashboard *::after {
        box-sizing: border-box !important;
        border-radius: 0px !important;
      }
      .admin-dashboard input,
      .admin-dashboard button,
      .admin-dashboard select,
      .admin-dashboard textarea {
        border-radius: 0px !important;
        box-sizing: border-box !important;
      }
      @keyframes spinFast {
        to { transform: rotate(360deg); }
      }
      /* Custom clean scrollbars on the inner scrolling main area ONLY */
      .admin-scroll-area {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.22) #070707;
      }
      .admin-scroll-area::-webkit-scrollbar {
        width: 7px;
        height: 7px;
      }
      .admin-scroll-area::-webkit-scrollbar-track {
        background: #070707;
      }
      .admin-scroll-area::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.22);
      }
      .admin-scroll-area::-webkit-scrollbar-thumb:hover {
        background: #ff4500;
      }
      /* Nested table horizontal scrollbar */
      .admin-dashboard div::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      .admin-dashboard div::-webkit-scrollbar-track {
        background: #0c0c0e;
      }
      .admin-dashboard div::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.18);
      }
      .admin-dashboard div::-webkit-scrollbar-thumb:hover {
        background: #ff4500;
      }
      /* Sidebar subtle scrollbar */
      aside::-webkit-scrollbar {
        width: 4px;
      }
      aside::-webkit-scrollbar-track {
        background: #0a0a0c;
      }
      aside::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.12);
      }
    `}</style>
  );

  // Loading View
  if (authStatus === "loading") {
    return (
      <div
        className="admin-dashboard"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#070707",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Geist', system-ui, sans-serif",
          color: "#ffffff",
          overflow: "hidden",
        }}
      >
        {strictSharpStyles}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              border: "2px solid rgba(255,255,255,0.1)",
              borderTopColor: "#ff4500",
              animation: "spinFast 0.6s linear infinite",
              margin: "0 auto 16px auto",
            }}
          />
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.72rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: "'Geist Mono', monospace",
            }}
          >
            VERIFYING STUDIO ACCESS...
          </p>
        </div>
      </div>
    );
  }

  // Login View with Razor-Sharp Corners
  if (authStatus === "unauthenticated") {
    return (
      <div
        className="admin-dashboard"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#070707",
          backgroundImage: "radial-gradient(circle at 50% 20%, rgba(255, 69, 0, 0.08) 0%, transparent 60%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          fontFamily: "'Geist', system-ui, sans-serif",
          color: "#ffffff",
          overflow: "hidden",
        }}
      >
        {strictSharpStyles}
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#0c0c0e",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            padding: "40px 32px",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.95)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                backgroundColor: "#ff4500",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "1.1rem",
                margin: "0 auto 16px auto",
                letterSpacing: "-0.04em",
              }}
            >
              UG
            </div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 4px 0", letterSpacing: "-0.03em" }}>
              Studio CMS Suite
            </h1>
            <p
              style={{
                fontSize: "0.72rem",
                color: "rgba(255, 255, 255, 0.45)",
                margin: 0,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "'Geist Mono', monospace",
              }}
            >
              Ultimate Graphics® London
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {loginError && (
              <div
                style={{
                  padding: "10px 12px",
                  backgroundColor: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid #ef4444",
                  color: "#fca5a5",
                  fontSize: "0.78rem",
                  textAlign: "center",
                }}
              >
                {loginError}
              </div>
            )}

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.68rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(255, 255, 255, 0.6)",
                  marginBottom: "6px",
                  fontWeight: 600,
                  fontFamily: "'Geist Mono', monospace",
                }}
              >
                Master Access Passcode
              </label>
              <input
                type="password"
                placeholder="Enter passcode..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
                required
                style={{
                  width: "100%",
                  padding: "11px 12px",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <div
                style={{
                  marginTop: "6px",
                  fontSize: "0.7rem",
                  color: "rgba(255, 255, 255, 0.35)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  Default: <code style={{ color: "#ff4500" }}>admin123</code>
                </span>
                <span style={{ fontFamily: "'Geist Mono', monospace" }}>EST. 2014</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              style={{
                padding: "12px 18px",
                backgroundColor: "#ff4500",
                color: "#ffffff",
                border: "none",
                fontWeight: 700,
                fontSize: "0.82rem",
                cursor: "pointer",
                transition: "opacity 0.15s ease",
                opacity: isLoggingIn ? 0.6 : 1,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {isLoggingIn ? "Authorizing..." : "Authorize Access →"}
            </button>
          </form>

          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <Link href="/" style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.45)", textDecoration: "none" }}>
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- AUTHENTICATED STUDIO CMS SUITE ----------------
  return (
    <div
      className="admin-dashboard"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        maxHeight: "100vh",
        backgroundColor: "#070707",
        color: "#ffffff",
        fontFamily: "'Geist', system-ui, sans-serif",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {strictSharpStyles}

      {/* Toast Notification Alert */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 99999,
            padding: "10px 16px",
            backgroundColor: toast.type === "success" ? "#062817" : "#3b0808",
            border: `1px solid ${toast.type === "success" ? "#10B981" : "#ef4444"}`,
            boxShadow: "0 15px 35px rgba(0,0,0,0.85)",
            color: "#ffffff",
            fontSize: "0.8rem",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ color: toast.type === "success" ? "#10B981" : "#ef4444", fontWeight: 700 }}>
            {toast.type === "success" ? Icons.check : "!"}
          </span>
          <span>{toast.text}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* OPENABLE & CLOSABLE RAZOR-SHARP SIDEBAR                      */}
      {/* ============================================================ */}
      <aside
        style={{
          width: isSidebarOpen ? "250px" : "64px",
          transition: "width 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          backgroundColor: "#0a0a0c",
          borderRight: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          zIndex: 100,
        }}
      >
        {/* Top Header / Branding & Toggle Button */}
        <div>
          <div
            style={{
              padding: isSidebarOpen ? "16px 14px" : "16px 8px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: isSidebarOpen ? "space-between" : "center",
              gap: "6px",
            }}
          >
            {isSidebarOpen ? (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", overflow: "hidden" }}>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#ff4500",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "0.88rem",
                    letterSpacing: "-0.04em",
                    flexShrink: 0,
                  }}
                >
                  UG
                </div>
                <div style={{ overflow: "hidden" }}>
                  <h2 style={{ margin: 0, fontSize: "0.85rem", fontWeight: 700, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
                    Ultimate Graphics
                  </h2>
                  <div style={{ fontSize: "0.62rem", color: "rgba(255, 255, 255, 0.4)", textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap", fontFamily: "'Geist Mono', monospace" }}>
                    Studio CMS Suite
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#ff4500",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  flexShrink: 0,
                }}
                title="Ultimate Graphics London"
              >
                UG
              </div>
            )}

            {/* Sidebar Collapse Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title={isSidebarOpen ? "Collapse sidebar ([)" : "Expand sidebar ([)"}
              style={{
                width: "26px",
                height: "26px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "rgba(255, 255, 255, 0.75)",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {isSidebarOpen ? Icons.chevronLeft : Icons.chevronRight}
            </button>
          </div>

          {/* Navigation Links */}
          <div style={{ padding: isSidebarOpen ? "14px 8px" : "12px 4px" }}>
            {isSidebarOpen && (
              <div
                style={{
                  fontSize: "0.62rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "rgba(255, 255, 255, 0.35)",
                  fontWeight: 700,
                  padding: "0 8px 8px 8px",
                  fontFamily: "'Geist Mono', monospace",
                }}
              >
                MANAGEMENT
              </div>
            )}

            <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {/* 1. Inquiries */}
              <button
                onClick={() => setActiveTab("inquiries")}
                title="Inquiries & RFQ Queue"
                style={{
                  width: "100%",
                  padding: isSidebarOpen ? "9px 10px" : "11px 0",
                  backgroundColor: activeTab === "inquiries" ? "rgba(255, 69, 0, 0.15)" : "transparent",
                  borderLeft: activeTab === "inquiries" ? "3px solid #ff4500" : "3px solid transparent",
                  borderTop: "none",
                  borderRight: "none",
                  borderBottom: "none",
                  color: activeTab === "inquiries" ? "#ffffff" : "rgba(255, 255, 255, 0.65)",
                  fontSize: "0.82rem",
                  fontWeight: activeTab === "inquiries" ? 700 : 500,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isSidebarOpen ? "space-between" : "center",
                  transition: "background-color 0.15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ color: activeTab === "inquiries" ? "#ff4500" : "rgba(255,255,255,0.6)" }}>{Icons.inbox}</span>
                  {isSidebarOpen && <span>Inquiries</span>}
                </div>
                {isSidebarOpen && (
                  <span
                    style={{
                      fontSize: "0.62rem",
                      padding: "2px 5px",
                      backgroundColor: activeTab === "inquiries" ? "#ff4500" : "rgba(255, 255, 255, 0.08)",
                      color: "#ffffff",
                      fontWeight: 700,
                      fontFamily: "'Geist Mono', monospace",
                    }}
                  >
                    {stats?.new ? `${stats.new} NEW` : submissions.length}
                  </span>
                )}
              </button>

              {/* 2. Works */}
              <button
                onClick={() => setActiveTab("works")}
                title="Works & Portfolio"
                style={{
                  width: "100%",
                  padding: isSidebarOpen ? "9px 10px" : "11px 0",
                  backgroundColor: activeTab === "works" ? "rgba(255, 69, 0, 0.15)" : "transparent",
                  borderLeft: activeTab === "works" ? "3px solid #ff4500" : "3px solid transparent",
                  borderTop: "none",
                  borderRight: "none",
                  borderBottom: "none",
                  color: activeTab === "works" ? "#ffffff" : "rgba(255, 255, 255, 0.65)",
                  fontSize: "0.82rem",
                  fontWeight: activeTab === "works" ? 700 : 500,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isSidebarOpen ? "space-between" : "center",
                  transition: "background-color 0.15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ color: activeTab === "works" ? "#ff4500" : "rgba(255,255,255,0.6)" }}>{Icons.works}</span>
                  {isSidebarOpen && <span>Works</span>}
                </div>
                {isSidebarOpen && (
                  <span
                    style={{
                      fontSize: "0.62rem",
                      padding: "2px 5px",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      color: "rgba(255, 255, 255, 0.7)",
                      fontWeight: 600,
                      fontFamily: "'Geist Mono', monospace",
                    }}
                  >
                    {projects.length}
                  </span>
                )}
              </button>

              {/* 3. Blog */}
              <button
                onClick={() => setActiveTab("blog")}
                title="Journal & Articles"
                style={{
                  width: "100%",
                  padding: isSidebarOpen ? "9px 10px" : "11px 0",
                  backgroundColor: activeTab === "blog" ? "rgba(255, 69, 0, 0.15)" : "transparent",
                  borderLeft: activeTab === "blog" ? "3px solid #ff4500" : "3px solid transparent",
                  borderTop: "none",
                  borderRight: "none",
                  borderBottom: "none",
                  color: activeTab === "blog" ? "#ffffff" : "rgba(255, 255, 255, 0.65)",
                  fontSize: "0.82rem",
                  fontWeight: activeTab === "blog" ? 700 : 500,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isSidebarOpen ? "space-between" : "center",
                  transition: "background-color 0.15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ color: activeTab === "blog" ? "#ff4500" : "rgba(255,255,255,0.6)" }}>{Icons.article}</span>
                  {isSidebarOpen && <span>Journal</span>}
                </div>
                {isSidebarOpen && (
                  <span
                    style={{
                      fontSize: "0.62rem",
                      padding: "2px 5px",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      color: "rgba(255, 255, 255, 0.7)",
                      fontWeight: 600,
                      fontFamily: "'Geist Mono', monospace",
                    }}
                  >
                    {blogPosts.length}
                  </span>
                )}
              </button>

              {/* 4. Media */}
              <button
                onClick={() => setActiveTab("media")}
                title="Media Asset Vault"
                style={{
                  width: "100%",
                  padding: isSidebarOpen ? "9px 10px" : "11px 0",
                  backgroundColor: activeTab === "media" ? "rgba(255, 69, 0, 0.15)" : "transparent",
                  borderLeft: activeTab === "media" ? "3px solid #ff4500" : "3px solid transparent",
                  borderTop: "none",
                  borderRight: "none",
                  borderBottom: "none",
                  color: activeTab === "media" ? "#ffffff" : "rgba(255, 255, 255, 0.65)",
                  fontSize: "0.82rem",
                  fontWeight: activeTab === "media" ? 700 : 500,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isSidebarOpen ? "space-between" : "center",
                  transition: "background-color 0.15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ color: activeTab === "media" ? "#ff4500" : "rgba(255,255,255,0.6)" }}>{Icons.media}</span>
                  {isSidebarOpen && <span>Media Vault</span>}
                </div>
                {isSidebarOpen && (
                  <span
                    style={{
                      fontSize: "0.62rem",
                      padding: "2px 5px",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      color: "rgba(255, 255, 255, 0.7)",
                      fontWeight: 600,
                      fontFamily: "'Geist Mono', monospace",
                    }}
                  >
                    {mediaList.length}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Profile & Actions */}
        <div
          style={{
            padding: isSidebarOpen ? "14px" : "12px 6px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "#070708",
          }}
        >
          {isSidebarOpen ? (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <img
                  src="/images/wlJMtkRVckBTirLzGQd8qmCMDw.jpg"
                  alt="David Miller"
                  style={{
                    width: "30px",
                    height: "30px",
                    objectFit: "cover",
                    border: "1px solid #ff4500",
                    flexShrink: 0,
                  }}
                />
                <div style={{ overflow: "hidden" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    David Miller
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "rgba(255, 255, 255, 0.45)", fontFamily: "'Geist Mono', monospace" }}>
                    Director • London
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "6px" }}>
                <Link
                  href="/"
                  target="_blank"
                  style={{
                    flex: 1,
                    padding: "6px 8px",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "0.7rem",
                    textDecoration: "none",
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Live Site ↗
                </Link>

                <button
                  onClick={handleLogout}
                  title="Lock session"
                  style={{
                    padding: "6px 10px",
                    backgroundColor: "transparent",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#fca5a5",
                    fontSize: "0.7rem",
                    cursor: "pointer",
                    textTransform: "uppercase",
                  }}
                >
                  Lock
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
              <Link href="/" target="_blank" title="View live website" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.85rem" }}>
                ↗
              </Link>
              <button onClick={handleLogout} title="Lock session" style={{ background: "none", border: "none", color: "#fca5a5", cursor: "pointer", padding: "4px" }}>
                {Icons.lock}
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ============================================================ */}
      {/* MAIN CONTENT AREA (FIXED FRAME - ONLY INNER MAIN SCROLLS)    */}
      {/* ============================================================ */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          height: "100vh",
          maxHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: "#070707",
        }}
      >
        {/* Fixed Top Architectural Subheader Bar */}
        <header
          style={{
            flexShrink: 0,
            backgroundColor: "#070707",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "12px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 40,
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {/* Section Breadcrumb & Expand Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                title="Expand sidebar ([)"
                style={{
                  padding: "6px 10px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: "0.72rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                {Icons.menu}
                <span>Sidebar</span>
              </button>
            )}

            <div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "rgba(255, 255, 255, 0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  fontFamily: "'Geist Mono', monospace",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>SLA: 2-HR RESPONSE</span>
                <span style={{ color: "#ff4500" }}>•</span>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{londonTime}</span>
              </div>
              <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ffffff", margin: "2px 0 0 0", letterSpacing: "-0.02em" }}>
                {activeTab === "inquiries" && "Lead Submissions & RFQ Queue"}
                {activeTab === "works" && "Architectural Portfolio & Case Studies"}
                {activeTab === "blog" && "Technical Fabrication Journal Articles"}
                {activeTab === "media" && "Media Vault & Asset Manager"}
              </h2>
            </div>
          </div>

          {/* Action Tools */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={fetchAllData}
              disabled={isRefreshing}
              style={{
                padding: "7px 12px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.72rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{ animation: isRefreshing ? "spinFast 0.8s linear infinite" : "none" }}>{Icons.sync}</span>
              <span>{isRefreshing ? "Syncing" : "Sync CMS"}</span>
            </button>

            {activeTab === "inquiries" && (
              <a
                href="/api/admin/export"
                download
                style={{
                  padding: "7px 12px",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {Icons.download}
                <span>Export CSV</span>
              </a>
            )}

            {activeTab === "works" && (
              <button
                onClick={() => handleOpenProjectModal()}
                style={{
                  padding: "7px 14px",
                  backgroundColor: "#ff4500",
                  color: "#ffffff",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {Icons.plus}
                <span>Create Case Study</span>
              </button>
            )}

            {activeTab === "blog" && (
              <button
                onClick={() => handleOpenBlogModal()}
                style={{
                  padding: "7px 14px",
                  backgroundColor: "#ff4500",
                  color: "#ffffff",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {Icons.plus}
                <span>Write Article</span>
              </button>
            )}

            {activeTab === "media" && (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingMedia}
                style={{
                  padding: "7px 14px",
                  backgroundColor: "#ff4500",
                  color: "#ffffff",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  cursor: "pointer",
                  opacity: isUploadingMedia ? 0.6 : 1,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {Icons.upload}
                <span>{isUploadingMedia ? "Uploading..." : "Upload Asset"}</span>
              </button>
            )}
          </div>
        </header>

        {/* Scrollable Main Content Body (ONLY this inner part scrolls!) */}
        <main
          className="admin-scroll-area"
          style={{
            flex: 1,
            minHeight: 0,
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            padding: "20px 24px 60px 24px",
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* ============================================================ */}
          {/* TAB 1: INQUIRIES & LEADS                                      */}
          {/* ============================================================ */}
          {activeTab === "inquiries" && (
            <div style={{ width: "100%", maxWidth: "100%" }}>
              {/* Architectural Metrics Bar */}
              {stats && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                    gap: "1px",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    marginBottom: "16px",
                    width: "100%",
                  }}
                >
                  <div style={{ backgroundColor: "#0b0b0d", padding: "14px 16px" }}>
                    <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255, 255, 255, 0.45)", fontFamily: "'Geist Mono', monospace" }}>
                      Total Leads
                    </div>
                    <div style={{ fontSize: "1.7rem", fontWeight: 800, marginTop: "2px", fontFamily: "'Geist Mono', monospace" }}>{stats.total}</div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(255, 255, 255, 0.4)" }}>{stats.todayCount} logged today</div>
                  </div>

                  <div style={{ backgroundColor: "#0b0b0d", padding: "14px 16px", borderLeft: "2px solid #10B981" }}>
                    <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#34D399", fontFamily: "'Geist Mono', monospace" }}>
                      New &amp; Unread
                    </div>
                    <div style={{ fontSize: "1.7rem", fontWeight: 800, marginTop: "2px", color: "#34D399", fontFamily: "'Geist Mono', monospace" }}>{stats.new}</div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(255, 255, 255, 0.4)" }}>Awaiting 2-hr quote</div>
                  </div>

                  <div style={{ backgroundColor: "#0b0b0d", padding: "14px 16px", borderLeft: "2px solid #F59E0B" }}>
                    <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#FBBF24", fontFamily: "'Geist Mono', monospace" }}>
                      In Review
                    </div>
                    <div style={{ fontSize: "1.7rem", fontWeight: 800, marginTop: "2px", color: "#FBBF24", fontFamily: "'Geist Mono', monospace" }}>{stats.inReview}</div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(255, 255, 255, 0.4)" }}>CAD / Estimation</div>
                  </div>

                  <div style={{ backgroundColor: "#0b0b0d", padding: "14px 16px", borderLeft: "2px solid #3B82F6" }}>
                    <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#60A5FA", fontFamily: "'Geist Mono', monospace" }}>
                      Contacted
                    </div>
                    <div style={{ fontSize: "1.7rem", fontWeight: 800, marginTop: "2px", color: "#60A5FA", fontFamily: "'Geist Mono', monospace" }}>{stats.contacted}</div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(255, 255, 255, 0.4)" }}>Quote sent</div>
                  </div>

                  <div style={{ backgroundColor: "#0b0b0d", padding: "14px 16px", borderLeft: "2px solid #8B5CF6" }}>
                    <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#A78BFA", fontFamily: "'Geist Mono', monospace" }}>
                      Completed
                    </div>
                    <div style={{ fontSize: "1.7rem", fontWeight: 800, marginTop: "2px", color: "#A78BFA", fontFamily: "'Geist Mono', monospace" }}>{stats.completed}</div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(255, 255, 255, 0.4)" }}>Fabricated &amp; installed</div>
                  </div>
                </div>
              )}

              {/* Filter and Search Bar */}
              <div
                style={{
                  backgroundColor: "#0c0c0e",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  padding: "10px 14px",
                  marginBottom: "14px",
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <input
                  type="text"
                  placeholder="Filter inquiries by name, email, phone, location, specifications..."
                  value={searchInquiries}
                  onChange={(e) => setSearchInquiries(e.target.value)}
                  style={{
                    flex: "1 1 200px",
                    minWidth: "160px",
                    padding: "8px 10px",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#ffffff",
                    fontSize: "0.8rem",
                    outline: "none",
                  }}
                />

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{
                      padding: "7px 10px",
                      backgroundColor: "#16161a",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "#ffffff",
                      fontSize: "0.78rem",
                      outline: "none",
                    }}
                  >
                    <option value="all">All Statuses ({submissions.length})</option>
                    <option value="new">New ({stats?.new || 0})</option>
                    <option value="in_review">In Review ({stats?.inReview || 0})</option>
                    <option value="contacted">Contacted ({stats?.contacted || 0})</option>
                    <option value="completed">Completed ({stats?.completed || 0})</option>
                    <option value="archived">Archived ({stats?.archived || 0})</option>
                  </select>

                  <button
                    onClick={handleCreateTestLead}
                    style={{
                      padding: "7px 12px",
                      backgroundColor: "rgba(255, 69, 0, 0.12)",
                      border: "1px solid rgba(255, 69, 0, 0.3)",
                      color: "#ff8142",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      textTransform: "uppercase",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {Icons.plus}
                    <span>Simulate Lead</span>
                  </button>
                </div>
              </div>

              {/* Inquiries Table Container (Guaranteed never to overflow viewport) */}
              <div
                style={{
                  backgroundColor: "#0c0c0e",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  width: "100%",
                  maxWidth: "100%",
                  overflowX: "auto",
                }}
              >
                {filteredSubmissions.length === 0 ? (
                  <div style={{ padding: "48px 20px", textAlign: "center", color: "rgba(255, 255, 255, 0.4)" }}>
                    <div style={{ color: "rgba(255,255,255,0.3)", marginBottom: "8px" }}>{Icons.inbox}</div>
                    <p style={{ margin: 0, fontSize: "0.82rem" }}>No inquiries matching your criteria.</p>
                  </div>
                ) : (
                  <table
                    style={{
                      width: "100%",
                      minWidth: "880px",
                      tableLayout: "fixed",
                      borderCollapse: "collapse",
                      fontSize: "0.8rem",
                      textAlign: "left",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                          backgroundColor: "rgba(255, 255, 255, 0.02)",
                          color: "rgba(255, 255, 255, 0.45)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          fontSize: "0.68rem",
                          fontFamily: "'Geist Mono', monospace",
                        }}
                      >
                        <th style={{ width: "110px", padding: "12px 14px" }}>Received</th>
                        <th style={{ width: "200px", padding: "12px 14px" }}>Client</th>
                        <th style={{ width: "160px", padding: "12px 14px" }}>Service</th>
                        <th style={{ padding: "12px 14px" }}>Brief / Specifications</th>
                        <th style={{ width: "135px", padding: "12px 14px" }}>Status</th>
                        <th style={{ width: "145px", minWidth: "145px", padding: "12px 14px", textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubmissions.map((item) => {
                        const style = getStatusBadgeStyle(item.status);
                        return (
                          <tr
                            key={item.id}
                            style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.02)")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                          >
                            <td style={{ padding: "12px 14px", whiteSpace: "nowrap" }}>
                              <div style={{ fontWeight: 600, color: "#ffffff" }}>{formatTimeAgo(item.createdAt)}</div>
                              <div style={{ fontSize: "0.65rem", color: "rgba(255, 255, 255, 0.4)", marginTop: "2px", fontFamily: "'Geist Mono', monospace" }}>
                                {new Date(item.createdAt).toLocaleDateString("en-GB")}
                              </div>
                            </td>

                            <td style={{ padding: "12px 14px", overflow: "hidden" }}>
                              <div style={{ fontWeight: 700, color: "#ffffff", fontSize: "0.85rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {item.name}
                              </div>
                              <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                <a href={`mailto:${item.email}`} style={{ color: "#ff8142", textDecoration: "none", fontSize: "0.75rem" }} title={item.email}>
                                  {item.email}
                                </a>
                              </div>
                              {item.phone && (
                                <div style={{ fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.5)", marginTop: "1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  <a href={`tel:${item.phone}`} style={{ color: "inherit", textDecoration: "none" }}>
                                    {item.phone}
                                  </a>
                                </div>
                              )}
                            </td>

                            <td style={{ padding: "12px 14px", overflow: "hidden" }}>
                              <span style={{ display: "inline-block", padding: "2px 6px", backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.1)", fontSize: "0.72rem", color: "rgba(255, 255, 255, 0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
                                {item.service || "General Signage"}
                              </span>
                              <div style={{ fontSize: "0.65rem", color: "rgba(255, 255, 255, 0.4)", marginTop: "2px", whiteSpace: "nowrap" }}>
                                via {item.source}
                              </div>
                            </td>

                            <td style={{ padding: "12px 14px", overflow: "hidden" }}>
                              <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "rgba(255, 255, 255, 0.7)" }} title={item.message}>
                                {item.message || <span style={{ fontStyle: "italic", opacity: 0.4 }}>No dimensions specified</span>}
                              </div>
                              {item.notes && (
                                <div style={{ marginTop: "3px", fontSize: "0.7rem", color: "#FBBF24", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  [Log]: {item.notes}
                                </div>
                              )}
                            </td>

                            <td style={{ padding: "12px 14px", whiteSpace: "nowrap" }}>
                              <select
                                value={item.status}
                                onChange={(e) => handleStatusChange(item.id, e.target.value as SubmissionStatus)}
                                disabled={actionLoadingId === item.id}
                                style={{
                                  width: "100%",
                                  padding: "4px 6px",
                                  backgroundColor: style.bg,
                                  color: style.color,
                                  border: `1px solid ${style.border}`,
                                  fontSize: "0.72rem",
                                  fontWeight: 600,
                                  outline: "none",
                                  cursor: "pointer",
                                }}
                              >
                                <option value="new">New Lead</option>
                                <option value="in_review">In Review</option>
                                <option value="contacted">Contacted</option>
                                <option value="completed">Completed</option>
                                <option value="archived">Archived</option>
                              </select>
                            </td>

                            <td style={{ width: "145px", minWidth: "145px", padding: "12px 14px", textAlign: "right", whiteSpace: "nowrap" }}>
                              <button
                                onClick={() => {
                                  setSelectedLead(item);
                                  setNotesDraft(item.notes || "");
                                }}
                                style={{
                                  padding: "5px 10px",
                                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                                  border: "1px solid rgba(255, 255, 255, 0.12)",
                                  color: "#ffffff",
                                  fontSize: "0.72rem",
                                  cursor: "pointer",
                                  marginRight: "6px",
                                }}
                              >
                                Inspect
                              </button>

                              <button
                                onClick={() => setConfirmDelete({ type: "submission", id: item.id })}
                                title="Delete lead"
                                style={{
                                  padding: "5px 7px",
                                  background: "transparent",
                                  border: "1px solid rgba(239, 68, 68, 0.25)",
                                  color: "#f87171",
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                {Icons.close}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: WORKS & CASE STUDIES                                  */}
          {/* ============================================================ */}
          {activeTab === "works" && (
            <div style={{ width: "100%", maxWidth: "100%" }}>
              {/* Works Filter */}
              <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
                <input
                  type="text"
                  placeholder="Filter works by title, client, category, or materials..."
                  value={searchWorks}
                  onChange={(e) => setSearchWorks(e.target.value)}
                  style={{
                    flex: "1 1 240px",
                    maxWidth: "420px",
                    padding: "8px 10px",
                    backgroundColor: "#0c0c0e",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    fontSize: "0.8rem",
                    outline: "none",
                  }}
                />

                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {["all", "Wayfinding", "Illuminated", "Hospitality", "Corporate"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setWorksCategoryFilter(cat)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: worksCategoryFilter === cat ? "rgba(255, 69, 0, 0.15)" : "#0c0c0e",
                        border: `1px solid ${worksCategoryFilter === cat ? "#ff4500" : "rgba(255, 255, 255, 0.1)"}`,
                        color: worksCategoryFilter === cat ? "#ff8142" : "rgba(255, 255, 255, 0.6)",
                        fontSize: "0.72rem",
                        cursor: "pointer",
                        textTransform: "uppercase",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Projects Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "16px" }}>
                {filteredProjects.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      backgroundColor: "#0c0c0e",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Thumbnail */}
                    <div style={{ height: "170px", backgroundColor: "#141418", position: "relative", overflow: "hidden" }}>
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <div style={{ position: "absolute", top: "8px", left: "8px", padding: "2px 6px", backgroundColor: "#000000", fontSize: "0.68rem", color: "#ff8142", fontWeight: 700, border: "1px solid rgba(255,255,255,0.15)" }}>
                        {p.category}
                      </div>
                      {p.featured && (
                        <div style={{ position: "absolute", top: "8px", right: "8px", padding: "2px 6px", backgroundColor: "#ff4500", fontSize: "0.65rem", color: "#ffffff", fontWeight: 700 }}>
                          FEATURED
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div style={{ padding: "14px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: "0.72rem", color: "rgba(255, 255, 255, 0.45)", marginBottom: "4px" }}>
                          Client: <strong style={{ color: "#ffffff" }}>{p.client}</strong> • {p.year}
                        </div>
                        <h3 style={{ margin: "0 0 6px 0", fontSize: "1.05rem", fontWeight: 700 }}>{p.title}</h3>
                        <p style={{ margin: "0 0 10px 0", fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {p.summary}
                        </p>

                        {/* Tags */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "12px" }}>
                          {p.tags.map((t) => (
                            <span key={t} style={{ fontSize: "0.65rem", padding: "2px 5px", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255, 255, 255, 0.7)" }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Link
                          href={`/work/${p.slug}`}
                          target="_blank"
                          style={{ fontSize: "0.72rem", color: "rgba(255, 255, 255, 0.5)", textDecoration: "none", fontFamily: "'Geist Mono', monospace" }}
                        >
                          /{p.slug} ↗
                        </Link>

                        <div style={{ display: "flex", gap: "6px" }}>
                          <button
                            onClick={() => handleOpenProjectModal(p)}
                            style={{
                              padding: "5px 10px",
                              backgroundColor: "rgba(255, 255, 255, 0.06)",
                              border: "1px solid rgba(255, 255, 255, 0.12)",
                              color: "#ffffff",
                              fontSize: "0.72rem",
                              cursor: "pointer",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setConfirmDelete({ type: "project", id: p.id })}
                            style={{
                              padding: "5px 8px",
                              background: "transparent",
                              border: "1px solid rgba(239, 68, 68, 0.25)",
                              color: "#f87171",
                              fontSize: "0.72rem",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                            }}
                          >
                            {Icons.close}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 3: JOURNAL & BLOG ARTICLES                               */}
          {/* ============================================================ */}
          {activeTab === "blog" && (
            <div style={{ width: "100%", maxWidth: "100%" }}>
              {/* Blog Filter */}
              <div style={{ marginBottom: "16px" }}>
                <input
                  type="text"
                  placeholder="Filter articles by title, category, or excerpt..."
                  value={searchBlog}
                  onChange={(e) => setSearchBlog(e.target.value)}
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: "8px 10px",
                    backgroundColor: "#0c0c0e",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    fontSize: "0.8rem",
                    outline: "none",
                  }}
                />
              </div>

              {/* Blog List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {filteredBlogPosts.map((b) => (
                  <div
                    key={b.slug}
                    style={{
                      backgroundColor: "#0c0c0e",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      padding: "14px 16px",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "14px", alignItems: "center", flex: "1 1 340px", minWidth: 0 }}>
                      <div style={{ width: "80px", height: "56px", overflow: "hidden", backgroundColor: "#16161a", flexShrink: 0 }}>
                        <img src={b.image} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ minWidth: 0, overflow: "hidden" }}>
                        <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "3px" }}>
                          <span style={{ fontSize: "0.68rem", color: "#ff4500", fontWeight: 700 }}>{b.category}</span>
                          <span style={{ fontSize: "0.68rem", color: "rgba(255, 255, 255, 0.4)", fontFamily: "'Geist Mono', monospace" }}>• {b.date} • {b.readTime}</span>
                        </div>
                        <h3 style={{ margin: "0 0 3px 0", fontSize: "0.95rem", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.title}</h3>
                        <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.6)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {b.excerpt}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "6px", alignItems: "center", flexShrink: 0 }}>
                      <Link
                        href={`/blog/${b.slug}`}
                        target="_blank"
                        style={{ padding: "5px 10px", backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "rgba(255, 255, 255, 0.7)", fontSize: "0.72rem", textDecoration: "none" }}
                      >
                        Read ↗
                      </Link>
                      <button
                        onClick={() => handleOpenBlogModal(b)}
                        style={{ padding: "5px 10px", backgroundColor: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", color: "#ffffff", fontSize: "0.72rem", cursor: "pointer" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setConfirmDelete({ type: "blog", id: b.slug })}
                        style={{ padding: "5px 8px", background: "transparent", border: "1px solid rgba(239, 68, 68, 0.25)", color: "#f87171", cursor: "pointer", display: "inline-flex", alignItems: "center" }}
                      >
                        {Icons.close}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 4: MEDIA VAULT                                           */}
          {/* ============================================================ */}
          {activeTab === "media" && (
            <div style={{ width: "100%", maxWidth: "100%" }}>
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
                style={{ display: "none" }}
              />

              {/* Drag and Drop Upload Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDropFile}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${isDragging ? "#ff4500" : "rgba(255, 255, 255, 0.15)"}`,
                  backgroundColor: isDragging ? "rgba(255, 69, 0, 0.05)" : "#0c0c0e",
                  padding: "28px 20px",
                  textAlign: "center",
                  cursor: "pointer",
                  marginBottom: "20px",
                  transition: "all 0.15s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div style={{ color: "#ff4500" }}>{Icons.upload}</div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#ffffff" }}>
                  {isUploadingMedia ? "Processing upload..." : "Drag & Drop Image Files Here, or Click to Browse"}
                </div>
                <div style={{ fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.4)", fontFamily: "'Geist Mono', monospace" }}>
                  PNG, JPG, WEBP, SVG • Saved directly to /public/images/
                </div>
              </div>

              {/* Media Search & Format Filter */}
              <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
                <input
                  type="text"
                  placeholder="Search assets by filename or format..."
                  value={searchMedia}
                  onChange={(e) => setSearchMedia(e.target.value)}
                  style={{
                    flex: "1 1 220px",
                    maxWidth: "380px",
                    padding: "8px 10px",
                    backgroundColor: "#0c0c0e",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    fontSize: "0.8rem",
                    outline: "none",
                  }}
                />

                <div style={{ display: "flex", gap: "6px" }}>
                  {["all", "jpg", "png", "webp", "svg"].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setMediaFormatFilter(fmt)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: mediaFormatFilter === fmt ? "rgba(255, 69, 0, 0.15)" : "#0c0c0e",
                        border: `1px solid ${mediaFormatFilter === fmt ? "#ff4500" : "rgba(255, 255, 255, 0.1)"}`,
                        color: mediaFormatFilter === fmt ? "#ff8142" : "rgba(255, 255, 255, 0.6)",
                        fontSize: "0.72rem",
                        cursor: "pointer",
                        textTransform: "uppercase",
                      }}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Media Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "14px" }}>
                {filteredMedia.map((m) => (
                  <div
                    key={m.name}
                    style={{
                      backgroundColor: "#0c0c0e",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => setPreviewMediaUrl(m.url)}
                      style={{
                        height: "125px",
                        backgroundColor: "#16161a",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <img src={m.url} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <span style={{ position: "absolute", top: "6px", right: "6px", fontSize: "0.62rem", padding: "1px 5px", backgroundColor: "#000000", color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)" }}>
                        {m.ext}
                      </span>
                    </div>

                    {/* Metadata & Actions */}
                    <div style={{ padding: "10px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#ffffff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={m.name}>
                          {m.name}
                        </div>
                        <div style={{ fontSize: "0.65rem", color: "rgba(255, 255, 255, 0.4)", marginTop: "2px", fontFamily: "'Geist Mono', monospace" }}>
                          {formatFileSize(m.size)}
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                        <button
                          onClick={() => copyToClipboard(m.url, "Image URL")}
                          style={{
                            flex: 1,
                            padding: "5px 6px",
                            backgroundColor: "rgba(255, 255, 255, 0.06)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            color: "#ffffff",
                            fontSize: "0.68rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            textTransform: "uppercase",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "4px",
                          }}
                        >
                          {Icons.copy}
                          <span>Copy URL</span>
                        </button>

                        <button
                          onClick={() => setConfirmDelete({ type: "media", id: m.name })}
                          style={{
                            padding: "5px 7px",
                            background: "transparent",
                            border: "1px solid rgba(239, 68, 68, 0.25)",
                            color: "#f87171",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                        >
                          {Icons.close}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ============================================================ */}
      {/* MODAL 1: LEAD INSPECTION DRAWER                              */}
      {/* ============================================================ */}
      {selectedLead && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 1000,
          }}
          onClick={() => setSelectedLead(null)}
        >
          <div
            style={{
              backgroundColor: "#0e0e11",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "24px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.95)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "14px" }}>
              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 6px",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "4px",
                    backgroundColor: getStatusBadgeStyle(selectedLead.status).bg,
                    color: getStatusBadgeStyle(selectedLead.status).color,
                    border: `1px solid ${getStatusBadgeStyle(selectedLead.status).border}`,
                  }}
                >
                  {formatStatusName(selectedLead.status)}
                </span>
                <h2 style={{ margin: "0 0 2px 0", fontSize: "1.2rem", fontWeight: 700 }}>{selectedLead.name}</h2>
                <div style={{ fontSize: "0.72rem", color: "rgba(255, 255, 255, 0.45)", fontFamily: "'Geist Mono', monospace" }}>
                  Received {new Date(selectedLead.createdAt).toLocaleString("en-GB")} via {selectedLead.source}
                </div>
              </div>
              <button onClick={() => setSelectedLead(null)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: "4px" }}>
                {Icons.close}
              </button>
            </div>

            {/* Direct Client Contact Credentials (Email & Phone) */}
            <div
              style={{
                backgroundColor: "#070709",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "14px 16px",
                marginBottom: "16px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "14px",
              }}
            >
              {/* Mail ID */}
              <div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    color: "rgba(255, 255, 255, 0.45)",
                    letterSpacing: "0.1em",
                    marginBottom: "5px",
                    fontWeight: 600,
                    fontFamily: "'Geist Mono', monospace",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <span style={{ color: "#ff8142" }}>{Icons.mail}</span>
                  <span>Email Address</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#ff8142",
                      textDecoration: "none",
                      wordBreak: "break-all",
                    }}
                    title="Click to compose email"
                  >
                    {selectedLead.email}
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedLead.email);
                      showToast("Email address copied to clipboard!");
                    }}
                    title="Copy email address"
                    style={{
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "rgba(255, 255, 255, 0.75)",
                      padding: "3px 7px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "0.68rem",
                      flexShrink: 0,
                    }}
                  >
                    {Icons.copy}
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    color: "rgba(255, 255, 255, 0.45)",
                    letterSpacing: "0.1em",
                    marginBottom: "5px",
                    fontWeight: 600,
                    fontFamily: "'Geist Mono', monospace",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <span style={{ color: "#10b981" }}>{Icons.phone}</span>
                  <span>Phone Number</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  {selectedLead.phone ? (
                    <>
                      <a
                        href={`tel:${selectedLead.phone}`}
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: "#ffffff",
                          textDecoration: "none",
                          fontFamily: "'Geist Mono', monospace",
                        }}
                        title="Click to dial"
                      >
                        {selectedLead.phone}
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(selectedLead.phone!);
                          showToast("Phone number copied to clipboard!");
                        }}
                        title="Copy phone number"
                        style={{
                          background: "rgba(255, 255, 255, 0.06)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "rgba(255, 255, 255, 0.75)",
                          padding: "3px 7px",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "0.68rem",
                          flexShrink: 0,
                        }}
                      >
                        {Icons.copy}
                        <span>Copy</span>
                      </button>
                    </>
                  ) : (
                    <span style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.35)", fontStyle: "italic" }}>
                      Not provided
                    </span>
                  )}
                </div>
              </div>

              {/* Service Requested */}
              {selectedLead.service && (
                <div style={{ gridColumn: "1 / -1", paddingTop: "8px", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
                  <div
                    style={{
                      fontSize: "0.65rem",
                      textTransform: "uppercase",
                      color: "rgba(255, 255, 255, 0.45)",
                      letterSpacing: "0.1em",
                      marginBottom: "4px",
                      fontWeight: 600,
                      fontFamily: "'Geist Mono', monospace",
                    }}
                  >
                    Requested Capability / Service
                  </div>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "3px 8px",
                      backgroundColor: "rgba(255, 69, 0, 0.1)",
                      border: "1px solid rgba(255, 69, 0, 0.3)",
                      color: "#ff8142",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    {selectedLead.service}
                  </span>
                </div>
              )}
            </div>

            {/* Contact quick actions */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "18px", flexWrap: "wrap" }}>
              <a
                href={`mailto:${selectedLead.email}?subject=Re: Your Signage & Fabrication Brief - Ultimate Graphics London`}
                style={{ flex: 1, padding: "9px 12px", backgroundColor: "#ffffff", color: "#000000", fontWeight: 700, fontSize: "0.8rem", textAlign: "center", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.04em", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
              >
                {Icons.mail}
                <span>Reply via Email</span>
              </a>
              {selectedLead.phone && (
                <a
                  href={`tel:${selectedLead.phone}`}
                  style={{ padding: "9px 12px", backgroundColor: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(255, 255, 255, 0.15)", color: "#ffffff", fontWeight: 600, fontSize: "0.8rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}
                >
                  {Icons.phone}
                  <span>Call Client</span>
                </a>
              )}
            </div>

            {/* Brief Specification */}
            <div style={{ marginBottom: "18px" }}>
              <div style={{ fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.45)", letterSpacing: "0.1em", marginBottom: "6px", fontWeight: 600, fontFamily: "'Geist Mono', monospace" }}>
                Project Specifications &amp; Dimensions
              </div>
              <div style={{ padding: "12px", backgroundColor: "#060608", border: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "0.85rem", lineHeight: 1.5, color: "rgba(255, 255, 255, 0.85)", whiteSpace: "pre-wrap" }}>
                {selectedLead.message || "No project brief details provided."}
              </div>
            </div>

            {/* Status Changer */}
            <div style={{ marginBottom: "18px" }}>
              <div style={{ fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.45)", letterSpacing: "0.1em", marginBottom: "6px", fontWeight: 600, fontFamily: "'Geist Mono', monospace" }}>
                Set Pipeline Status
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {(["new", "in_review", "contacted", "completed", "archived"] as SubmissionStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedLead.id, st)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: selectedLead.status === st ? getStatusBadgeStyle(st).bg : "rgba(255, 255, 255, 0.04)",
                      border: `1px solid ${selectedLead.status === st ? getStatusBadgeStyle(st).border : "rgba(255, 255, 255, 0.1)"}`,
                      color: selectedLead.status === st ? getStatusBadgeStyle(st).color : "rgba(255, 255, 255, 0.6)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      textTransform: "uppercase",
                    }}
                  >
                    {formatStatusName(st)}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <div style={{ fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.45)", letterSpacing: "0.1em", marginBottom: "6px", fontWeight: 600, fontFamily: "'Geist Mono', monospace" }}>
                Internal CAD &amp; Estimation Notes
              </div>
              <textarea
                rows={3}
                placeholder="Log CAD review status, estimate quote number, or survey notes..."
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                style={{ width: "100%", padding: "8px 10px", backgroundColor: "#060608", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", fontSize: "0.82rem", outline: "none", resize: "vertical" }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                <button
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes}
                  style={{ padding: "7px 14px", backgroundColor: "#ff4500", border: "none", color: "#ffffff", fontWeight: 700, fontSize: "0.75rem", cursor: "pointer", opacity: isSavingNotes ? 0.6 : 1, textTransform: "uppercase" }}
                >
                  {isSavingNotes ? "Saving..." : "Save Log Entry"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: PROJECT / CASE STUDY EDITOR                         */}
      {/* ============================================================ */}
      {isProjectModalOpen && editingProject && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 1000,
          }}
          onClick={() => setIsProjectModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#0e0e11",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              maxWidth: "700px",
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              padding: "24px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.95)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "12px" }}>
              <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700 }}>
                {editingProject.id ? "Edit Case Study" : "Create New Case Study"}
              </h2>
              <button onClick={() => setIsProjectModalOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>
                {Icons.close}
              </button>
            </div>

            <form onSubmit={handleSaveProject} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", marginBottom: "4px" }}>
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lumina Headquarters"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    style={{ width: "100%", padding: "8px 10px", backgroundColor: "#060608", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", fontSize: "0.82rem" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", marginBottom: "4px" }}>
                    URL Slug
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. lumina-headquarters"
                    value={editingProject.slug}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    style={{ width: "100%", padding: "8px 10px", backgroundColor: "#060608", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", fontSize: "0.82rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", marginBottom: "4px" }}>
                    Client
                  </label>
                  <input
                    type="text"
                    value={editingProject.client}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    style={{ width: "100%", padding: "8px 10px", backgroundColor: "#060608", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", fontSize: "0.82rem" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", marginBottom: "4px" }}>
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    style={{ width: "100%", padding: "8px 10px", backgroundColor: "#060608", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", fontSize: "0.82rem" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", marginBottom: "4px" }}>
                    Year
                  </label>
                  <input
                    type="text"
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    style={{ width: "100%", padding: "8px 10px", backgroundColor: "#060608", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", fontSize: "0.82rem" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", marginBottom: "4px" }}>
                  Image URL / Relative Path *
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    required
                    placeholder="/images/your-sign.jpg"
                    value={editingProject.image}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    style={{ flex: 1, padding: "8px 10px", backgroundColor: "#060608", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", fontSize: "0.82rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerTarget("project")}
                    style={{ padding: "8px 12px", backgroundColor: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "0.72rem", cursor: "pointer", textTransform: "uppercase", whiteSpace: "nowrap" }}
                  >
                    Select from Vault
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", marginBottom: "4px" }}>
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Architectural Signage, 12kW Laser, CNC"
                  value={editingProject.tags.join(", ")}
                  onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                  style={{ width: "100%", padding: "8px 10px", backgroundColor: "#060608", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", fontSize: "0.82rem" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", marginBottom: "4px" }}>
                  Summary Brief
                </label>
                <textarea
                  rows={2}
                  value={editingProject.summary}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  style={{ width: "100%", padding: "8px 10px", backgroundColor: "#060608", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", fontSize: "0.82rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", marginBottom: "4px" }}>
                    Engineering Challenge
                  </label>
                  <textarea
                    rows={2}
                    value={editingProject.challenge}
                    onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                    style={{ width: "100%", padding: "8px 10px", backgroundColor: "#060608", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", fontSize: "0.82rem" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", marginBottom: "4px" }}>
                    Fabrication Solution
                  </label>
                  <textarea
                    rows={2}
                    value={editingProject.solution}
                    onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                    style={{ width: "100%", padding: "8px 10px", backgroundColor: "#060608", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", fontSize: "0.82rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                <input
                  type="checkbox"
                  id="featured"
                  checked={editingProject.featured}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                />
                <label htmlFor="featured" style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.85)", cursor: "pointer" }}>
                  Feature this project on the homepage showcase
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "14px" }}>
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  style={{ padding: "8px 14px", backgroundColor: "transparent", border: "1px solid rgba(255, 255, 255, 0.2)", color: "#ffffff", fontSize: "0.8rem", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "8px 18px", backgroundColor: "#ff4500", border: "none", color: "#ffffff", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", textTransform: "uppercase" }}
                >
                  Save Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 3: BLOG ARTICLE EDITOR                                 */}
      {/* ============================================================ */}
      {isBlogModalOpen && editingPost && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 1000,
          }}
          onClick={() => setIsBlogModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#0e0e11",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              maxWidth: "680px",
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              padding: "24px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.95)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "12px" }}>
              <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700 }}>
                {editingPost.slug ? "Edit Journal Article" : "Write New Journal Article"}
              </h2>
              <button onClick={() => setIsBlogModalOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>
                {Icons.close}
              </button>
            </div>

            <form onSubmit={handleSaveBlogPost} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", marginBottom: "4px" }}>
                  Article Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 12kW Fiber Laser vs Waterjet Cutting"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  style={{ width: "100%", padding: "8px 10px", backgroundColor: "#060608", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", fontSize: "0.82rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", marginBottom: "4px" }}>
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    style={{ width: "100%", padding: "8px 10px", backgroundColor: "#060608", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", fontSize: "0.82rem" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", marginBottom: "4px" }}>
                    Reading Time
                  </label>
                  <input
                    type="text"
                    value={editingPost.readTime}
                    onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                    style={{ width: "100%", padding: "8px 10px", backgroundColor: "#060608", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", fontSize: "0.82rem" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", marginBottom: "4px" }}>
                  Cover Image URL
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    value={editingPost.image}
                    onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                    style={{ flex: 1, padding: "8px 10px", backgroundColor: "#060608", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", fontSize: "0.82rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerTarget("blog")}
                    style={{ padding: "8px 12px", backgroundColor: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "0.72rem", cursor: "pointer", textTransform: "uppercase", whiteSpace: "nowrap" }}
                  >
                    Select from Vault
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", marginBottom: "4px" }}>
                  Excerpt / Brief
                </label>
                <textarea
                  rows={2}
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  style={{ width: "100%", padding: "8px 10px", backgroundColor: "#060608", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", fontSize: "0.82rem" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.68rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", marginBottom: "4px" }}>
                  Article Content Paragraphs (separate by double enter)
                </label>
                <textarea
                  rows={6}
                  value={editingPost.content.join("\n\n")}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value.split(/\n\n+/).filter(Boolean) })}
                  style={{ width: "100%", padding: "8px 10px", backgroundColor: "#060608", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", fontSize: "0.82rem", lineHeight: 1.5 }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "14px" }}>
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  style={{ padding: "8px 14px", backgroundColor: "transparent", border: "1px solid rgba(255, 255, 255, 0.2)", color: "#ffffff", fontSize: "0.8rem", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "8px 18px", backgroundColor: "#ff4500", border: "none", color: "#ffffff", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", textTransform: "uppercase" }}
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 4: IMAGE SELECTOR FROM MEDIA VAULT                     */}
      {/* ============================================================ */}
      {mediaPickerTarget && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 2500,
          }}
          onClick={() => setMediaPickerTarget(null)}
        >
          <div
            style={{
              backgroundColor: "#0e0e11",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              maxWidth: "760px",
              width: "100%",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.95)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "10px" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>Select Asset from Media Vault</h3>
                <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.45)", fontFamily: "'Geist Mono', monospace" }}>Click any asset to link it directly</div>
              </div>
              <button onClick={() => setMediaPickerTarget(null)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>
                {Icons.close}
              </button>
            </div>

            <div style={{ overflowY: "auto", flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "10px", padding: "4px 0" }}>
              {mediaList.map((m) => (
                <div
                  key={m.name}
                  onClick={() => handleSelectMediaForTarget(m.url)}
                  style={{
                    backgroundColor: "#070709",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    cursor: "pointer",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ff4500")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                >
                  <div style={{ height: "85px", backgroundColor: "#141418" }}>
                    <img src={m.url} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "5px", fontSize: "0.65rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "rgba(255,255,255,0.8)" }}>
                    {m.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 5: IMAGE PREVIEW LIGHTBOX                              */}
      {/* ============================================================ */}
      {previewMediaUrl && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            zIndex: 3000,
          }}
          onClick={() => setPreviewMediaUrl(null)}
        >
          <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }} onClick={(e) => e.stopPropagation()}>
            <img src={previewMediaUrl} alt="Preview" style={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain", border: "1px solid rgba(255,255,255,0.2)" }} />
            <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", fontFamily: "'Geist Mono', monospace" }}>{previewMediaUrl}</span>
              <button
                onClick={() => copyToClipboard(previewMediaUrl, "URL")}
                style={{ padding: "6px 12px", backgroundColor: "#ff4500", border: "none", color: "#ffffff", fontWeight: 700, fontSize: "0.72rem", cursor: "pointer", textTransform: "uppercase" }}
              >
                Copy Path
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 6: DELETE CONFIRMATION PROMPT                          */}
      {/* ============================================================ */}
      {confirmDelete && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 4000,
          }}
          onClick={() => setConfirmDelete(null)}
        >
          <div
            style={{
              backgroundColor: "#111114",
              border: "1px solid #ef4444",
              padding: "20px",
              maxWidth: "380px",
              width: "100%",
              boxShadow: "0 20px 40px rgba(0,0,0,0.9)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: "0 0 8px 0", color: "#f87171", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Confirm Permanent Deletion
            </h3>
            <p style={{ margin: "0 0 16px 0", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>
              Are you sure you want to permanently delete this {confirmDelete.type}? This action cannot be reversed.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button
                onClick={() => setConfirmDelete(null)}
                style={{ padding: "7px 14px", backgroundColor: "transparent", border: "1px solid rgba(255, 255, 255, 0.2)", color: "#ffffff", fontSize: "0.75rem", cursor: "pointer", textTransform: "uppercase" }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (confirmDelete.type === "submission") handleDeleteSubmission(confirmDelete.id);
                  else if (confirmDelete.type === "project") handleDeleteProject(confirmDelete.id);
                  else if (confirmDelete.type === "blog") handleDeleteBlogPost(confirmDelete.id);
                  else if (confirmDelete.type === "media") handleDeleteMedia(confirmDelete.id);
                }}
                style={{ padding: "7px 16px", backgroundColor: "#dc2626", border: "none", color: "#ffffff", fontWeight: 700, fontSize: "0.75rem", cursor: "pointer", textTransform: "uppercase" }}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
