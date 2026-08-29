import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

function fail(message) {
  failures.push(message);
}

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

function walkFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git" || name === ".next") continue;
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) walkFiles(full, out);
    else out.push(full);
  }
  return out;
}

const prior = ["da", "ta", "dog"].join("");
const priorTitle = prior[0].toUpperCase() + prior.slice(1);
const priorCaps = prior.toUpperCase();
const otherPrior = ["Sea", "gate"].join("");
const otherPriorLower = otherPrior.toLowerCase();
const oldAeFirst = ["Made", "line"].join("");
const oldAeLast = ["Ingle", "by"].join("");
const oldHexes = [
  ["202", "31f"],
  ["686", "b63"],
  ["f5f", "1e8"],
  ["fbf", "9f4"],
  ["d8d", "3c8"],
  ["632", "ca6"],
  ["4c1", "d82"],
  ["788", "274"],
  ["5e7", "180"],
  ["c8c", "3b7"],
  ["007", "aff"],
  ["e9e", "9eb"],
].map((parts) => `#${parts.join("")}`);
const oldRgbValues = [
  ["32, 35, ", "31"].join(""),
  ["104, 107, ", "99"].join(""),
  ["245, 241, ", "232"].join(""),
  ["251, 249, ", "244"].join(""),
  ["216, 211, ", "200"].join(""),
  ["99, 44, ", "166"].join(""),
];
const simpleA = ["simple", "icons"].join("");
const simpleB = ["simple-", "icons"].join("");
const oldArt = [
  ["watercolor-", "pad"].join(""),
  ["watercolor-", "room"].join(""),
  ["watercolor-", "deal"].join(""),
  ["watercolor-", "attach"].join(""),
];
const oldMarkFile = `${prior}-wordmark.svg`;
const oldCookie = `${prior}_cro_session`;
const oldHash = `${prior}-cro:`;
const oldHost = `${prior}hq`;
const dash = String.fromCharCode(0x2014);

let tracked = [];
try {
  tracked = execFileSync("git", ["ls-files"], { cwd: root, encoding: "utf8" })
    .split("\n")
    .filter(Boolean);
} catch {
  tracked = walkFiles(root).map((file) => file.slice(root.length + 1));
}

for (const rel of [
  "src/components/HeroDemo.tsx",
  "src/data/hero-jobs.ts",
]) {
  if (existsSync(join(root, rel)) && !tracked.includes(rel)) tracked.push(rel);
}

const skipExact = new Set(["scripts/verify-amphenol.mjs"]);
const binaryExt = new Set([
  ".mp4",
  ".webm",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
]);

for (const rel of tracked) {
  if (skipExact.has(rel)) continue;
  const full = join(root, rel);
  if (!existsSync(full) || statSync(full).isDirectory()) continue;
  const ext = rel.slice(rel.lastIndexOf(".")).toLowerCase();
  if (binaryExt.has(ext)) {
    const base = rel.split("/").pop() || rel;
    if (oldArt.some((art) => base.includes(art)) || base.includes(oldMarkFile) || /^dd_/.test(base)) {
      fail(`${rel} is leftover prior-customer art`);
    }
    continue;
  }
  let text = "";
  try {
    text = readFileSync(full, "utf8");
  } catch {
    continue;
  }
  const lower = text.toLowerCase();
  if (text.includes(dash)) fail(`${rel} contains the long-dash character`);
  if (lower.includes(prior) || text.includes(priorTitle) || text.includes(priorCaps)) {
    fail(`${rel} still names the previous customer`);
  }
  if (lower.includes(otherPriorLower)) fail(`${rel} still names another previous customer`);
  if (text.includes(oldAeFirst) || text.includes(oldAeLast)) {
    fail(`${rel} still names the previous AE`);
  }
  if (
    oldHexes.some((value) => lower.includes(value)) ||
    oldRgbValues.some((value) => text.includes(value))
  ) {
    fail(`${rel} still uses the old palette`);
  }
  if (lower.includes(simpleA) || lower.includes(simpleB)) {
    fail(`${rel} uses Simple Icons`);
  }
  for (const art of oldArt) {
    if (lower.includes(art)) fail(`${rel} still uses old art name ${art}`);
  }
  if (lower.includes(oldMarkFile) || text.includes(oldCookie) || text.includes(oldHash) || lower.includes(oldHost)) {
    fail(`${rel} still carries old auth, host, or mark names`);
  }
}

if (existsSync(join(root, "public/brand", oldMarkFile))) {
  fail(`public/brand/${oldMarkFile} must be deleted`);
}

const pkg = JSON.parse(read("package.json"));
if (pkg.name !== "amphenol") fail("package.json name must be amphenol");
if (pkg.dependencies?.next !== "15.5.24") fail("next must be 15.5.24");
if (pkg.devDependencies?.["eslint-config-next"] !== "15.5.24") {
  fail("eslint-config-next must be 15.5.24");
}
if (!pkg.dependencies?.geist) fail("geist is required");
if (!pkg.dependencies?.vgpu) fail("vgpu is required");
if (!existsSync(join(root, "src"))) fail("src/ is required");
if (!existsSync(join(root, "src/lib/hero-telemetry.wgsl"))) {
  fail("src/lib/hero-telemetry.wgsl is required");
}

const layout = read("src/app/layout.tsx");
if (!layout.includes('title: "Amphenol x SpaceXAI"')) {
  fail("metadata title must be exactly Amphenol x SpaceXAI");
}
if (!layout.includes("geist/font/sans") || !layout.includes("GeistSans")) {
  fail("Geist must stay wired in src/app/layout.tsx");
}

const lockup = read("src/components/BrandLockup.tsx");
const officialLogo =
  "https://s21.q4cdn.com/564806605/files/design/logo.svg";
if (!lockup.includes(officialLogo)) {
  fail("BrandLockup must use the official investor logo URL");
}

const page = read("src/app/(protected)/page.tsx");
if (!page.includes("Mike Weinert") || !page.includes("mike.weinert@cursor.com")) {
  fail("owner footer must name Mike Weinert and mike.weinert@cursor.com");
}

const heroDemoPath = "src/components/HeroDemo.tsx";
const heroJobsPath = "src/data/hero-jobs.ts";
let heroDemo = "";
let heroJobs = "";
if (!existsSync(join(root, heroDemoPath))) {
  fail(`${heroDemoPath} is required`);
} else {
  heroDemo = read(heroDemoPath);
}
if (!existsSync(join(root, heroJobsPath))) {
  fail(`${heroJobsPath} is required`);
} else {
  heroJobs = read(heroJobsPath);
}

if (!page.includes('import { HeroDemo } from "@/components/HeroDemo"')) {
  fail("protected page must import HeroDemo");
}
const heroSection = page.match(
  /<section className="hero">\s*([\s\S]*?)\s*<\/section>/,
);
if (!heroSection || heroSection[1].trim() !== "<HeroDemo />") {
  fail("HeroDemo must be the entire hero section");
}

if (!heroDemo.includes("HERO_JOBS")) {
  fail("HeroDemo must render HERO_JOBS");
}
if (!heroJobs.includes("export const HERO_JOBS")) {
  fail("hero-jobs.ts must export HERO_JOBS");
}
const heroJobCount = [...heroJobs.matchAll(/^\s{4}id: "[^"]+",$/gm)].length;
if (heroJobCount !== 8) {
  fail(`expected eight HERO_JOBS entries, found ${heroJobCount}`);
}

const heroClassNames = new Set(
  [...heroDemo.matchAll(/className="([^"]+)"/g)].flatMap((match) =>
    match[1].split(/\s+/),
  ),
);
for (const className of [
  "hero-copy",
  "hero-phone-jobs",
  "hero-bot-demo",
  "hero-phone",
  "notch",
  "header",
  "thread",
  "composer",
]) {
  if (!heroClassNames.has(className)) {
    fail(`HeroDemo must include the ${className} class`);
  }
}

const styles = read("src/app/globals.css");
for (const selector of [
  ".hero-phone",
  ".hero-bot-demo",
  ".hero-phone-jobs",
]) {
  if (!styles.includes(`${selector} {`)) {
    fail(`globals.css must include the ${selector} family`);
  }
}

if (/\bSent\b/i.test(`${heroDemo}\n${heroJobs}`)) {
  fail("HeroDemo must never show Sent");
}
if (
  !heroDemo.toLowerCase().includes("working in the background") ||
  !heroJobs.includes("draft") ||
  !heroJobs.includes("review")
) {
  fail("HeroDemo must show background work with draft and review semantics");
}

const grok = read("src/components/GrokBotWindow.tsx");
if (!grok.includes("Mark reviewed")) {
  fail("GrokBotWindow must use Mark reviewed");
}
if (/\bSent\b/.test(grok)) {
  fail("GrokBotWindow must never show Sent");
}

const jobs = read("src/data/jobs.ts");
const jobCount = [...jobs.matchAll(/^\s+number: [123]\b/gm)].length;
if (jobCount !== 3) fail(`expected three jobs, found ${jobCount}`);

const auth = read("src/lib/auth.ts");
if (!auth.includes("amphenol_cro_session") || !auth.includes("amphenol-cro:")) {
  fail("auth cookie and hash context must be renamed to amphenol");
}

const env = read(".env.example");
if (!env.includes("SITE_PASSWORD=land2expand")) {
  fail(".env.example must keep SITE_PASSWORD=land2expand");
}

if (!existsSync(join(root, "public/brand/spacexai.svg"))) {
  fail("existing SpaceXAI product mark must remain");
}

if (failures.length) {
  for (const item of failures) console.error(item);
  process.exit(1);
}

console.log("amphenol checks passed");
