import type { ClipId, JobId } from "./types";

export type SiteKind =
  | "granola"
  | "figma"
  | "gong"
  | "sfdc-account"
  | "sfdc-opp"
  | "sheets"
  | "gmail"
  | "slack"
  | "gdoc"
  | "linkedin"
  | "research"
  | "page"
  | "clip";

export type ChromeTab = {
  id: string;
  host: string;
  label: string;
};

export type ComputerBeat = {
  pill: string;
  host: string;
  path?: string;
  title: string;
  site: SiteKind;
  clip?: ClipId;
  tabs: ChromeTab[];
};

const notes = { id: "notes", host: "notes.example", label: "Notes" };
const docs = { id: "docs", host: "docs.example", label: "Docs" };
const mail = { id: "mail", host: "mail.example", label: "Mail" };
const web = { id: "web", host: "sample.example", label: "Public web" };
const crm = { id: "crm", host: "crm.example", label: "CRM" };

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "standardize-room": {
    m1: {
      pill: "Illustrative workflow",
      host: "notes.example",
      path: "/calls/sample-account",
      title: "Sample account call",
      site: "granola",
      tabs: [notes, docs, mail],
    },
    m2: {
      pill: "Sorting approved notes",
      host: "notes.example",
      path: "/calls/sample-account",
      title: "Sample account call",
      site: "granola",
      tabs: [notes, docs, mail],
    },
    m3: {
      pill: "Notes held for review",
      host: "docs.example",
      path: "/d/sample-account-notes",
      title: "Notes from the call",
      site: "gdoc",
      tabs: [notes, docs, mail],
    },
    m4: {
      pill: "Follow-up needs review",
      host: "mail.example",
      path: "/drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [notes, docs, mail],
    },
    m5: {
      pill: "Draft parked",
      host: "mail.example",
      path: "/drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [notes, docs, mail],
    },
  },
  "legal-redlines": {
    m1: {
      pill: "Illustrative workflow",
      host: "mail.example",
      path: "/inbox",
      title: "Inbox",
      site: "gmail",
      tabs: [mail, docs],
    },
    m2: {
      pill: "Splitting sources",
      host: "mail.example",
      path: "/inbox",
      title: "Inbox",
      site: "gmail",
      tabs: [mail, docs],
    },
    m3: {
      pill: "Sources held for review",
      host: "docs.example",
      path: "/d/sample-account-sources",
      title: "What is sourced",
      site: "gdoc",
      tabs: [mail, docs],
    },
    m4: {
      pill: "Reply needs review",
      host: "mail.example",
      path: "/drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [mail, docs],
    },
    m5: {
      pill: "Draft parked",
      host: "mail.example",
      path: "/drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [mail, docs],
    },
  },
  "attach-engine": {
    m1: {
      pill: "Illustrative workflow",
      host: "sample.example",
      path: "/public",
      title: "Public pages",
      site: "research",
      tabs: [web, docs, mail],
    },
    m2: {
      pill: "Reading public pages",
      host: "sample.example",
      path: "/public",
      title: "Public pages",
      site: "research",
      tabs: [web, docs, mail],
    },
    m3: {
      pill: "Evidence and questions",
      host: "docs.example",
      path: "/d/sample-account-pile",
      title: "Public pile",
      site: "gdoc",
      tabs: [web, docs, mail],
    },
    m4: {
      pill: "Brief needs review",
      host: "docs.example",
      path: "/d/sample-account-brief",
      title: "Sample account brief",
      site: "gdoc",
      tabs: [web, docs, mail],
    },
    m5: {
      pill: "Draft parked",
      host: "docs.example",
      path: "/d/sample-account-brief",
      title: "Sample account brief",
      site: "gdoc",
      tabs: [web, docs, mail, crm],
    },
  },
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
