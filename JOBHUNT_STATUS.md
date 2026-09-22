# JobHunt — status and continuation brief

Owner: Alexandra Moiseyenko. Final-year BSc Computer Science student (City, University of London, expected May 2027, predicted 1:1), Imperial College London Business Analytics certificate, technology internship at Barclays UK (Python/SQL automation, FastAPI, Kafka, IAM-adjacent work), plus part-time Executive Assistant and Tender/Bids experience. Full CV content is in `cv/Alexandra_Moiseyenko_CV_Master_Template.docx`.

**This is a graduate/entry-level profile** — target roles are graduate schemes and junior/entry-level positions, not senior roles.

## Done so far

1. **20 target job titles** identified (see list below) with ATS keyword banks per title, grouped into 4 tracks: Software/Data Engineering, IAM/Cybersecurity, Business/Data Analyst, EA/Finance/Business Support.
2. **Master CV template** built: `cv/Alexandra_Moiseyenko_CV_Master_Template.docx` (regenerate via `cv/build_master_template.js` — `node build_master_template.js`, requires `npm install docx` in that directory). ATS-safe (single column, no tables, contact info in body not header). Page 1 is the CV with `[TAILOR: ...]` prompts in red for the Target Role / Professional Summary / Core Skills lines. Page 2 is a "Skills Bank" reference (delete before sending) with the 4 keyword tracks.

## In progress — blocked on data, not on a decision

The user asked to find every matching job on LinkedIn/Indeed in London, score them, and produce a tailored CV per job. **This session (cloud/remote sandbox) has all outbound WebFetch blocked** (`EGRESS_BLOCKED` on every domain tested, including google.com, linkedin.com, indeed.co.uk, amazon.jobs, higher.gs.com, gradcracker.com, lloydsbankinggrouptalent.com, jobs.natwestgroup.com) — only WebSearch (snippet-level, unreliable/stale) works. That's why the user is moving to a **local session**, which should have normal network/browser access.

### What a local session should do next

1. Fetch full job description text for the 14 roles the user already identified (list below) — either via WebFetch/browser if reachable locally, or by asking the user to paste JD text if still blocked.
2. Optionally run a broader LinkedIn/Indeed search across the remaining unmatched titles (list below) filtered to London, now that live browsing may work.
3. For each job: compute a **match score** (0–100%) against Alexandra's CV skill bank, with a short rationale (which keywords/requirements matched, which are gaps).
4. Build a **spreadsheet** (`.xlsx`) — one row per job — columns: Job Title, Company, Source (LinkedIn/Indeed/company site), URL, Location, Track, Match Score, Match Rationale, CV filename, Notes (e.g. deadline, sponsorship status if visible).
5. For each job (or at least the top matches — confirm volume with the user), generate a **tailored CV** `.docx` by copying `cv/Alexandra_Moiseyenko_CV_Master_Template.docx`, filling in Target Role / Professional Summary / Core Skills from that job's actual JD (mirror its exact keyword phrasing — ATS systems do literal matching, not synonym matching), and deleting the Skills Bank reference page. Save tailored CVs under `applications/<Company>_<RoleShortName>.docx`.

### 14 jobs already provided by the user (need full JD text — only title/company/URL known so far)

1. Lloyds — Data Science and AI Graduate Scheme — https://www.lloydsbankinggrouptalent.com/our-opportunities/graduates/data-science-and-ai-graduate-scheme/
2. Lloyds — Software Engineer Graduate Scheme — https://www.lloydsbankinggrouptalent.com/our-opportunities/graduates/software-engineer-graduate-scheme/
3. Bank of America — Global Tech Software Engineer — https://www.linkedin.com/jobs/view/4468473366/ (long tracking URL, see chat history for full link)
4. Saragossa — Python Engineer — https://www.linkedin.com/jobs/view/4467362707/ (long tracking URL, see chat history for full link)
5. Amazon — Software Development Engineer 2026 — https://amazon.jobs/en/jobs/10408763/software-development-engineer-2026
6. CERN (via Gradcracker/Zurich) — Change and Technology Management Graduate Programme 2027 — https://www.gradcracker.com/hub/432/zurich/graduate-job/83208/change-and-technology-management-graduate-programme-2027
7. CERN — Full Stack Developer — https://www.gradcracker.com/hub/759/cern/graduate-job/82917/full-stack-developer
8. CERN — Online Software Developer — https://www.gradcracker.com/hub/759/cern/graduate-job/83706/online-software-developer
9. CERN — High Level Trigger Calibration Scientist — https://www.gradcracker.com/hub/759/cern/graduate-job/83485/high-level-trigger-calibration-scientist
10. Goldman Sachs — Software Engineer — https://higher.gs.com/roles/169292
11. Goldman Sachs — Prime Finance Engineering — https://higher.gs.com/roles/177431
12. Goldman Sachs — Global Banking & Markets Quantitative Developer — https://higher.gs.com/roles/180755
13. NatWest — Data Science Graduate Programme — https://jobs.natwestgroup.com/pages/data-science-graduate-programmes
14. NatWest — Engineering Graduate Programme — https://jobs.natwestgroup.com/pages/engineering-graduate-programmes

Note: item 6 (CERN via Gradcracker/Zurich) reads like a Zurich Insurance graduate scheme surfaced under a CERN hub label — verify the actual employer before tailoring.

### 20 target job titles (full ATS keyword lists were given to the user in chat; regenerate/expand as needed)

**Software / Data Engineering:** Graduate Software Engineer · Junior Python Developer · Junior/Graduate Data Engineer · Graduate Data Analyst · Junior Backend Developer · Junior Integration Engineer/API Developer · Automation Engineer/RPA Developer (Junior)

**IAM / Security:** IAM (Identity & Access Management) Analyst — Graduate/Junior · Junior Cybersecurity Analyst (IAM/GRC track)

**Business / Data Analyst:** Technology Analyst — Graduate Scheme (Banking/Financial Services) · Junior Business Analyst (Technology) · Graduate Business Analyst — Data & Analytics · Graduate Technology Consultant · Graduate Quantitative/Business Analytics Analyst · Junior Product Analyst · IT Support/Technology Operations Analyst (Graduate) · Junior Systems Analyst

**EA / Finance / Business Support:** Executive Assistant (Corporate/Financial Services) · Bid Coordinator/Proposal Analyst · Finance Assistant/Business Support Analyst (Financial Services)

## Deliverables still owed to the user

- [ ] Match-scored spreadsheet covering the 14 provided jobs (and any more found)
- [ ] Tailored CV per job (`applications/` folder)
