import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  jobId?: JobId;
  mark?: string;
  seat?: boolean;
};

export const FLEET: FleetBot[] = [
  {
    id: "rep",
    name: "You",
    blurb: "The human stays in control. Agents keep their computers moving.",
    color: "#E8E8ED",
    mark: "AE",
    seat: true,
  },
  {
    id: "agent-01",
    name: "Agent 01",
    blurb: "On the call computer. Sorting approved notes into a follow-up.",
    jobId: "standardize-room",
    color: "#3D6B73",
    mark: "01",
  },
  {
    id: "agent-02",
    name: "Agent 02",
    blurb: "On the inbox computer. Splitting sources from open questions.",
    jobId: "legal-redlines",
    color: "#8A5A32",
    mark: "02",
  },
  {
    id: "agent-03",
    name: "Agent 03",
    blurb: "On the research computer. Building a public brief.",
    jobId: "attach-engine",
    color: "#1A3A52",
    mark: "03",
  },
  {
    id: "agent-04",
    name: "Agent 04",
    blurb: "Idle computer. Waiting on the next trigger.",
    color: "#6B7A5C",
    mark: "04",
  },
  {
    id: "agent-05",
    name: "Agent 05",
    blurb: "On the integration computer. Refreshing approved context for review.",
    color: "#5A4030",
    mark: "05",
  },
];
