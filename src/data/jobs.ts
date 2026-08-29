import type { CroJob } from "./types";

export const JOBS: CroJob[] = [
  {
    id: "standardize-room",
    number: 1,
    title: "Turn a live call into a reviewable follow-up",
    trigger: "A live call starts",
    backgroundAction: "Listening on the call computer and sorting approved notes",
    problem:
      "The call ends and the follow-up is still a pile of tabs. Notes sit in one place. The note you can send sits in another.",
    botJob:
      "Grok Bot sits on the call computer, keeps approved notes in order, and leaves a follow-up you can read before anything leaves the machine.",
    storyboard: [
      {
        when: "Call starts",
        label: "The call starts. Grok is already on the computer. No prompt.",
        scene: "call",
        visual: {
          kind: "live-call",
          title: "Sample account call",
          people: [
            { initials: "YO", name: "You" },
            { initials: "CC", name: "Customer contact" },
            { initials: "AE", name: "Seller" },
          ],
        },
      },
      {
        when: "Notes land",
        label: "Approved notes are sorted. Open questions stay marked as open.",
        scene: "notes",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Approved notes", answer: "Held for the follow-up" },
            { name: "Open questions", answer: "Needs confirmation" },
            { name: "Next step", answer: "Draft only" },
          ],
          status: "Illustrative workflow",
        },
      },
      {
        when: "Follow-up ready",
        label: "The follow-up is the artifact. You read it before it moves.",
        scene: "send",
        artifact: {
          kind: "gmail",
          title: "Follow-up draft",
          to: "Customer contact",
          subject: "Sample account. Notes from today",
          body: "Sharing a short note from today's call.\n\nWhat we captured is in the attached draft. Open questions are marked Needs confirmation. Nothing here is a quote from the room.\n\nReply with corrections and I will update the note.\n\nIllustrative workflow. Draft only.",
        },
      },
    ],
    unlock:
      "A live call becomes a follow-up you can actually read, still on the same day.",
    outcome:
      "The last scene is the follow-up itself. Not a recap of a recap.",
    clips: ["03-slides-granola"],
    demo: {
      title: "Call notes",
      subtitle: "Live call · follow-up draft",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "room",
          name: "Call notes",
          role: "bot",
          persona: "Keeps the call computer on the notes and the follow-up",
          color: "#3D6B73",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "room",
          kind: "routine",
          body: "Call started. I am on the notes computer. I will sort approved notes and leave open questions marked Needs confirmation.",
        },
        {
          id: "m2",
          from: "room",
          kind: "text",
          body: "Still on the call. Approved notes are going into the follow-up. I am not writing a transcript line as if someone said it.",
        },
        {
          id: "m3",
          from: "room",
          kind: "draft",
          draftLabel: "Approved notes · still a draft",
          artifact: {
            kind: "packet",
            title: "Notes from the call",
            fields: [
              {
                label: "Held",
                value:
                  "Topics the room already agreed to put in writing. Illustrative workflow.",
              },
              {
                label: "Needs confirmation",
                value:
                  "Anything that was not closed on the call stays here. No invented wording.",
              },
              {
                label: "Next",
                value: "A follow-up the seller can read and mark reviewed.",
              },
            ],
          },
        },
        {
          id: "m4",
          from: "room",
          kind: "draft",
          draftLabel: "Follow-up · needs review",
          artifact: {
            kind: "gmail",
            title: "Follow-up draft",
            to: "Customer contact",
            subject: "Sample account. Notes from today",
            body: "Sharing a short note from today's call.\n\nWhat we captured is in the attached draft. Open questions are marked Needs confirmation.\n\nReply with corrections and I will update the note.\n\nIllustrative workflow. Draft only.",
          },
        },
        {
          id: "m5",
          from: "room",
          kind: "system",
          body: "Still a draft. Mark it reviewed when you have read it. Nothing leaves this machine on its own.",
        },
      ],
    },
  },
  {
    id: "legal-redlines",
    number: 2,
    title: "Turn a product question into a sourced draft",
    trigger: "A product question lands",
    backgroundAction: "Separating approved sources from open questions",
    problem:
      "A product question turns into a hunt across inboxes and side threads. The seller waits. The contact waits. The answer, when it arrives, has no source line.",
    botJob:
      "Grok Bot parks the question, splits approved sources from open questions, and leaves a reply you can review. It does not invent fit, lead time, availability, or terms.",
    storyboard: [
      {
        when: "Question lands",
        label: "A product question lands. Grok starts on the inbox computer.",
        scene: "notes",
        visual: {
          kind: "procurement-email",
          sender: "Customer contact",
          subject: "Question on a high-speed line",
          questions: 2,
        },
      },
      {
        when: "Sources split",
        label: "Approved sources sit on one side. Open questions sit on the other.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Public catalog", answer: "Approved source" },
            { name: "Product page", answer: "Approved source" },
            { name: "Lead time", answer: "Needs confirmation" },
          ],
          status: "Illustrative workflow",
        },
      },
      {
        when: "Reply ready",
        label: "The reply is the artifact. Unsupported lines stay marked.",
        scene: "send",
        artifact: {
          kind: "gmail",
          title: "Sourced reply",
          to: "Customer contact",
          subject: "Sample account. Your product question",
          body: "Thanks for the question.\n\nI pulled the public catalog page and the product page into the draft below. Those are labeled Approved source.\n\nLead time, availability, and terms are marked Needs confirmation. I am not stating fit.\n\nTell me what to correct and I will update the draft.\n\nIllustrative workflow.",
        },
      },
    ],
    unlock:
      "A product question in. A sourced draft out. Open items stay open.",
    outcome:
      "The last scene is the reply. Sources and open questions are already split.",
    clips: ["01-morning-inbox"],
    demo: {
      title: "Product desk",
      subtitle: "Question in · sourced draft",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "paper",
          name: "Product desk",
          role: "bot",
          persona: "Reads the question and drafts a sourced reply",
          color: "#8A5A32",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "paper",
          kind: "routine",
          body: "New product question from Customer contact. I am on the inbox computer. I will not write lead time, availability, or terms.",
        },
        {
          id: "m2",
          from: "paper",
          kind: "text",
          body: "Public catalog and product page are in. Those can sit under Approved source. Anything about fit or timing stays Needs confirmation.",
        },
        {
          id: "m3",
          from: "paper",
          kind: "draft",
          draftLabel: "Sources and open questions",
          artifact: {
            kind: "packet",
            title: "What is sourced",
            fields: [
              {
                label: "Approved source",
                value:
                  "Public catalog copy and the public product page. Illustrative workflow.",
              },
              {
                label: "Needs confirmation",
                value:
                  "Lead time, availability, terms, and any claim of fit. Left unmarked as answers.",
              },
            ],
          },
        },
        {
          id: "m4",
          from: "paper",
          kind: "draft",
          draftLabel: "Reply · needs review",
          artifact: {
            kind: "gmail",
            title: "Sourced reply",
            to: "Customer contact",
            subject: "Sample account. Your product question",
            body: "Thanks for the question.\n\nI pulled the public catalog page and the product page into this draft. Those are labeled Approved source.\n\nLead time, availability, and terms are marked Needs confirmation. I am not stating fit.\n\nTell me what to correct and I will update the draft.\n\nIllustrative workflow.",
          },
        },
        {
          id: "m5",
          from: "paper",
          kind: "system",
          body: "Still a draft. Mark it reviewed when you have read the sources. Nothing is a quote from an internal system.",
        },
      ],
    },
  },
  {
    id: "attach-engine",
    number: 3,
    title: "Build an account brief from public signals",
    trigger: "You open a sample account",
    backgroundAction: "Reading public pages and parking questions",
    problem:
      "A brief that is only a logo and a guess does not help the next call. Public signals exist. They need to sit next to the questions they do not answer.",
    botJob:
      "Grok Bot reads public materials on the research computer and leaves a brief. It does not name buyers. It does not invent metrics.",
    storyboard: [
      {
        when: "Research starts",
        label: "Public research starts. Grok is already on the computer.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Sample account",
          sources: ["Investor pages", "Product pages", "Public filings"],
          signal: "Public signals only",
        },
      },
      {
        when: "Signals sorted",
        label: "Evidence and questions are in two piles. No buyer list.",
        scene: "notes",
        visual: {
          kind: "three-why",
          items: [
            { label: "Public sources", answer: "Links and dates collected" },
            { label: "Questions to test", answer: "AI infrastructure priorities" },
            { label: "Buyer and timing", answer: "Needs confirmation" },
          ],
        },
      },
      {
        when: "Brief ready",
        label: "The brief is the artifact. Questions stay questions.",
        scene: "send",
        artifact: {
          kind: "one-pager",
          title: "Sample account brief",
          eyebrow: "Illustrative workflow",
          sections: [
            {
              heading: "Public signals",
              body: "Current public pages, filings, and news appear with source links and dates.",
            },
            {
              heading: "Questions to test",
              body: "Ask whether AI infrastructure work creates high-speed or fiber-optic priorities.",
            },
            {
              heading: "Needs confirmation",
              body: "Buyer, timing, product fit, and the next step remain open.",
            },
          ],
        },
      },
    ],
    unlock:
      "Public pages in. A brief you can hand to yourself before the next call.",
    outcome:
      "The last scene is the brief. Evidence and questions are already apart.",
    clips: ["02-prospecting-pg"],
    demo: {
      title: "Account brief",
      subtitle: "Public signals · one-page brief",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "attach",
          name: "Account brief",
          role: "bot",
          persona: "Reads public pages and drafts a brief",
          color: "#1A3A52",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "attach",
          kind: "routine",
          body: "Sample account is open. I am on the research computer. Public pages only. I will not name buyers or write a metric.",
        },
        {
          id: "m2",
          from: "attach",
          kind: "text",
          body: "Investor pages, product pages, and public filings are in. I am splitting what those pages actually say from what still needs confirmation.",
        },
        {
          id: "m3",
          from: "attach",
          kind: "draft",
          draftLabel: "Evidence and questions",
          artifact: {
            kind: "packet",
            title: "Public pile",
            fields: [
              {
                label: "Public sources",
                value:
                  "Current pages, filings, and news collected with links and dates.",
              },
              {
                label: "Questions to test",
                value:
                  "Does AI infrastructure work create high-speed or fiber-optic priorities? Buyer, timing, and product fit still need confirmation.",
              },
            ],
          },
        },
        {
          id: "m4",
          from: "attach",
          kind: "draft",
          draftLabel: "Brief · needs review",
          artifact: {
            kind: "one-pager",
            title: "Sample account brief",
            eyebrow: "Illustrative workflow",
            sections: [
              {
                heading: "Public signals",
                body: "Current public pages, filings, and news appear with source links and dates.",
              },
              {
                heading: "Questions to test",
                body: "Ask whether AI infrastructure work creates high-speed or fiber-optic priorities.",
              },
              {
                heading: "Needs confirmation",
                body: "Buyer, timing, product fit, and the next step remain open.",
              },
            ],
          },
        },
        {
          id: "m5",
          from: "attach",
          kind: "system",
          body: "Still a draft. Mark it reviewed when you have read the sources. No outreach is queued.",
        },
      ],
    },
  },
];

export function getJob(id: string): CroJob | undefined {
  return JOBS.find((job) => job.id === id);
}
