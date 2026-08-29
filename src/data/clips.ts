import type { Clip, ClipId } from "./types";

function clip(
  id: ClipId,
  title: string,
  caption: string,
): Clip {
  return {
    id,
    file: `/api/media/krista-clips/${id}.mp4`,
    poster: `/media/krista-clips/${id}.jpg`,
    title,
    caption,
  };
}

export const CLIPS: Record<ClipId, Clip> = {
  "01-morning-inbox": clip(
    "01-morning-inbox",
    "Morning inbox",
    "Weekday scan. Flags what needs a reply. Quiet if the inbox is empty.",
  ),
  "02-prospecting-pg": clip(
    "02-prospecting-pg",
    "Prospecting",
    "Drafts sit on the computer. Nothing leaves until someone reviews them.",
  ),
  "03-slides-granola": clip(
    "03-slides-granola",
    "Notes from the room",
    "Notes stay on the call computer while the follow-up is still a draft.",
  ),
  "04-engineer-bugbot": clip(
    "04-engineer-bugbot",
    "Engineer",
    "Wired to the repo. Answers a setup question without leaving the thread.",
  ),
  "05-forecast-sfdc": clip(
    "05-forecast-sfdc",
    "Forecast",
    "Demo notes in. Next steps in the format the manager asked for.",
  ),
  "06-customer-expert": clip(
    "06-customer-expert",
    "Customer expert",
    "Who is in the account, what is public, questions in Slack.",
  ),
  "07-customer-exec-brief": clip(
    "07-customer-exec-brief",
    "Exec brief",
    "Turns what it just watched into a short note for review.",
  ),
  "08-chief-groupchat": clip(
    "08-chief-groupchat",
    "Chief group chat",
    "Opens a group channel. Splits the work across agents with computers.",
  ),
};

export const ALL_CLIPS: Clip[] = Object.values(CLIPS);
