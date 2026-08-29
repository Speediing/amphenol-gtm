export type HeroJobIcon =
  | "outbound"
  | "research"
  | "follow-up"
  | "review"
  | "pipeline"
  | "sync"
  | "compare"
  | "brief";

export type HeroJob = Readonly<{
  id: string;
  name: string;
  icon: HeroJobIcon;
  account: string;
  signal: string;
  work: string;
  result: string;
  user: string;
  bot: string;
}>;

export const HERO_JOBS = [
  {
    id: "ai-demand-watch",
    name: "AI demand watch",
    icon: "research",
    account: "Sample AI interconnect account",
    signal: "A public AI infrastructure update appears",
    work:
      "I pulled together the public update and matched it to Amphenol's publicly described high-speed interconnect work. I drafted a short account brief and questions for you to check.",
    result: "Sample account brief ready for review",
    user: "keep it as a draft until I check the sources",
    bot: "draft saved. each claim points back to public context.",
  },
  {
    id: "high-speed-design-prep",
    name: "High-speed design prep",
    icon: "pipeline",
    account: "Illustrative high-speed opportunity",
    signal: "A sample technical discovery call is coming up",
    work:
      "I organized the approved product notes available to this workflow and drafted plain questions about speed, density, and connection needs. Anything not in the notes stays open.",
    result: "Sample discovery questions ready for review",
    user: "mark the open points for me",
    bot: "open points are marked. this stays review only.",
  },
  {
    id: "fiber-optic-brief",
    name: "Fiber-optic brief",
    icon: "compare",
    account: "Sample fiber-optic opportunity",
    signal: "A public program update is available",
    work:
      "I gathered the public context and the approved fiber-optic product material available to this workflow. I kept confirmed details separate from questions for the next conversation.",
    result: "Illustrative fiber brief ready for review",
    user: "leave the questions in the brief",
    bot: "questions kept in place. the brief is still a draft.",
  },
  {
    id: "call-follow-up",
    name: "Call follow-up",
    icon: "follow-up",
    account: "Illustrative customer call",
    signal: "A sample call ends",
    work:
      "I sorted the approved notes, drafted a short recap, and kept unconfirmed points labeled as questions. No account statement is treated as a quote.",
    result: "Sample follow-up draft ready for review",
    user: "hold the recap for my review",
    bot: "held. no external action was taken.",
  },
  {
    id: "product-answer-draft",
    name: "Product answer draft",
    icon: "review",
    account: "Illustrative customer question",
    signal: "A sample product question arrives",
    work:
      "I checked the approved high-speed and fiber-optic material available to this workflow. I drafted a plain answer and marked every point that needs product review.",
    result: "Illustrative answer draft ready for review",
    user: "keep the marked points open",
    bot: "they stay open until a person confirms them.",
  },
  {
    id: "ccs-context-sync",
    name: "CCS context sync",
    icon: "sync",
    account: "CommScope CCS integration",
    signal: "New public integration context is available",
    work:
      "I gathered public material about Amphenol's completed CommScope CCS acquisition. I separated confirmed context from items that still need internal review and drafted a short note.",
    result: "Public context note ready for review",
    user: "keep internal questions out of the draft",
    bot: "done. the open questions remain in the review notes.",
  },
  {
    id: "operating-group-brief",
    name: "Operating group brief",
    icon: "brief",
    account: "Sample cross-business review",
    signal: "Approved updates are ready for a weekly review",
    work:
      "I organized only the updates each operating group chose to share. The draft keeps local ownership clear and does not guess at decisions.",
    result: "Illustrative operating brief ready for review",
    user: "show each group's source next to its update",
    bot: "sources are attached. the brief remains review only.",
  },
  {
    id: "opportunity-review",
    name: "Opportunity review",
    icon: "outbound",
    account: "Illustrative AI and data center work",
    signal: "An approved sample opportunity list is available",
    work:
      "I grouped the sample work by public demand signal, product area, and next question. I did not add a buyer, value, or forecast.",
    result: "Illustrative opportunity review ready",
    user: "park it for the team to check",
    bot: "parked as a draft. nothing was shared outside the review.",
  },
] satisfies readonly [HeroJob, ...HeroJob[]];
