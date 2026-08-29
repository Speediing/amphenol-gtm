# Amphenol x SpaceXAI

Passworded sample site. Grok Bot from SpaceXAI, written for Amphenol sellers.

## What it is

Three sample GTM jobs on one page. Each job has a short problem statement, an interactive Grok Bot demo, and the matching clips under that demo. Below that: a fleet of agents with their own computers, a comparison, and a small wall of public Grok Bot reactions.

These are sample workflows. They are not a claim about a live account or a product fit.

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Default password is `land2expand`. Override it with `SITE_PASSWORD`.

## Clips

If clip files are present, download them into `private/media/krista-clips/` from the GitHub release. They are served only through the passworded `/api/media/...` route.

```bash
gh release download krista-gtm-clips-720p-2026-08-26 \
  --repo Speediing/grok-bot-quotes \
  --dir private/media/krista-clips
```

## Checks

```bash
npm run check
npm run lint
npm run build
```

`npm run check` runs `scripts/verify-amphenol.mjs`.

## Preview target

The intended Vercel project name is `amphenol-grokbot`. The intended host is `amphenol-grokbot.vercel.app`. Set `SITE_PASSWORD=land2expand`. This repo does not claim that host is live.
