const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  BorderStyle, LevelFormat, convertInchesToTwip
} = require("docx");

const FONT = "Calibri";
const NAVY = "1F3864";
const GREY = "595959";
const TAILOR = "C00000"; // red — marks instructions to edit/delete before sending

const bullet = (children, opts = {}) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { after: 60 },
  children,
  ...opts,
});

const body = (text, opts = {}) => new TextRun({ text, font: FONT, size: 21, ...opts }); // 10.5pt

const sectionHeading = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 260, after: 100 },
  border: { bottom: { color: NAVY, space: 2, style: BorderStyle.SINGLE, size: 6 } },
  children: [new TextRun({ text: text.toUpperCase(), font: FONT, bold: true, color: NAVY, size: 23 })],
});

const roleHeading = (title, org) => new Paragraph({
  spacing: { before: 180, after: 20 },
  children: [
    new TextRun({ text: `${title} — `, font: FONT, bold: true, size: 22 }),
    new TextRun({ text: org, font: FONT, bold: true, size: 22, color: NAVY }),
  ],
});

const dateLine = (text) => new Paragraph({
  spacing: { after: 80 },
  children: [new TextRun({ text, font: FONT, italics: true, size: 20, color: GREY })],
});

const tailorNote = (text) => new Paragraph({
  spacing: { after: 100 },
  children: [new TextRun({ text: `[TAILOR: ${text}]`, font: FONT, italics: true, size: 20, color: TAILOR })],
});

const skillLine = (label, value) => new Paragraph({
  spacing: { after: 60 },
  children: [
    new TextRun({ text: `${label}: `, font: FONT, bold: true, size: 21 }),
    new TextRun({ text: value, font: FONT, size: 21 }),
  ],
});

const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.15) } } } }],
    }],
  },
  styles: {
    default: {
      document: { run: { font: FONT, size: 21 } },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 720, bottom: 720, left: 850, right: 850 },
      },
    },
    children: [
      // ---------- HEADER (in body, not Word header — ATS-safe) ----------
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 40 },
        children: [new TextRun({ text: "ALEXANDRA MOISEYENKO", bold: true, size: 34, font: FONT, color: NAVY })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 20 },
        children: [new TextRun({
          text: "London, W5 1QS  |  alexandramois007@gmail.com  |  +44 7949 782900",
          font: FONT, size: 20,
        })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 40 },
        children: [new TextRun({ text: "[Add LinkedIn URL]  |  [Add GitHub/portfolio URL if applicable]", font: FONT, size: 19, italics: true, color: TAILOR })],
      }),

      // ---------- TARGET ROLE / SUMMARY ----------
      sectionHeading("Target Role"),
      tailorNote("paste the exact job title from the posting here, e.g. \"Graduate Software Engineer\" — this becomes the top line ATS keyword-matches against."),
      new Paragraph({ spacing: { after: 120 }, children: [body("[JOB TITLE FROM POSTING]", { color: TAILOR, italics: true })] }),

      sectionHeading("Professional Summary"),
      tailorNote("2–3 sentences. Swap the bracketed parts for the target role + 2–3 keywords pulled straight from the job description."),
      new Paragraph({
        spacing: { after: 60 },
        children: [body(
          "Final-year Computer Science student (City, University of London, predicted 1:1) with hands-on experience building "
          + "Python and SQL automation, REST API integrations, and event-driven data pipelines in a financial services environment. "
          + "Business Analytics certificate from Imperial College London covering regression, clustering and machine learning. "
          + "Seeking to apply strong analytical and programming skills as a "
        ), body("[TARGET JOB TITLE]", { color: TAILOR, italics: true }), body(" at "), body("[COMPANY NAME]", { color: TAILOR, italics: true }), body(".")],
      }),

      // ---------- CORE SKILLS (first-pass ATS line) ----------
      sectionHeading("Core Skills"),
      tailorNote("pick 10–14 keywords straight from the job description, prioritising exact phrasing. Use the Skills Bank on the last page as your source list."),
      new Paragraph({
        spacing: { after: 120 },
        children: [body("[Python] · [SQL] · [Pandas] · [REST APIs] · [FastAPI] · [JSON] · [Kafka] · [Data Analysis] · [Process Automation] · [Stakeholder Communication]", { color: TAILOR, italics: true })],
      }),

      // ---------- TECHNICAL SKILLS (full, factual list) ----------
      sectionHeading("Technical Skills"),
      skillLine("Programming & Data", "Python, SQL, Pandas, Java, C++, JavaScript, HTML"),
      skillLine("APIs & Integration", "REST APIs, FastAPI, Uvicorn, JSON, Kafka, Event Hub, event-driven systems"),
      skillLine("IT Engineering", "Automation, data extraction and comparison, error handling, testing, troubleshooting, technical documentation"),
      skillLine("Analytics", "Regression analysis, clustering, decision trees, nearest neighbour methods, support vector machines, machine learning, linear programming"),
      skillLine("Tools", "Microsoft Office 365, SharePoint, Excel"),

      // ---------- EXPERIENCE ----------
      sectionHeading("Experience"),

      roleHeading("Technology Developer (Internship)", "Barclays UK"),
      dateLine("June 2026 – Aug 2026  [confirm exact dates before sending]"),
      bullet([body("Built Python- and SQL-based access-management automation, extracting and comparing enterprise data to identify changes in users, roles and groups")]),
      bullet([body("Developed data normalisation, role-mapping and differential-processing logic using Pandas, producing structured provisioning outputs and JSON payloads for downstream workflows")]),
      bullet([body("Created an event-driven integration between Cutover and an internal Kafka/Event Hub platform using FastAPI and Uvicorn, including publisher/consumer testing and secure certificate-based connectivity")]),
      bullet([body("Integrated Cutover with the ThousandEyes REST API to automate network-test creation and health monitoring, implementing result polling, proxy connectivity and error handling")]),
      bullet([body("Tested and troubleshot APIs and distributed workflows; documented technical limitations and design decisions; communicated solutions to technical and non-technical stakeholders")]),
      bullet([body("Led an interns project team: translated business requirements into technical specifications, broke work into tasks/milestones, and managed delivery timelines")]),

      roleHeading("Executive Assistant (Part-time)", "Meta Advisory Ltd"),
      dateLine("Nov 2023 – June 2026"),
      bullet([body("Coordinated proposal input across internal and external stakeholders; prepared draft presentations and executive summaries")]),
      bullet([body("Tracked project assignments against schedule and budget; managed timesheet entry and consultant follow-up")]),
      bullet([body("Consolidated multi-author documents and sections into final client-ready format")]),
      bullet([body("Prepared draft financial packs, including P&L, Balance Sheet and reconciliations")]),

      roleHeading("Tender Bids and Finance Assistant (Part-time)", "Elva Consulting BV Ltd"),
      dateLine("Dec 2019 – Sept 2021"),
      bullet([body("Sourced and coordinated subcontractors for proposals and bids against defined client criteria")]),
      bullet([body("Scheduled candidate interviews and follow-up appointments; gathered supporting data")]),
      bullet([body("Collected legal documentation to meet strict client compliance requirements")]),
      bullet([body("Managed direct client contact on administrative queries")]),

      roleHeading("Engineering Placement", "Parnall Engineering Advanced Ltd"),
      dateLine("June 2019 (1 month)"),
      bullet([body("Gained hands-on experience in metal and Spitfire production processes")]),
      bullet([body("Worked alongside engineering professionals on 3D photography and 3D computer-system integration")]),
      bullet([body("Assisted with projection mapping and robotics, including structured light scanning and generative effects")]),

      // ---------- EDUCATION ----------
      sectionHeading("Education"),
      new Paragraph({ spacing: { after: 20 }, children: [body("BSc Computer Science — ", { bold: true }), body("City, University of London", { bold: true, color: NAVY })] }),
      new Paragraph({ spacing: { after: 100 }, children: [body("Expected graduation: May 2027  |  Current grade: 2:1 (predicted 1:1)", { italics: true, color: GREY, size: 20 })] }),

      new Paragraph({ spacing: { after: 20 }, children: [body("Certificate in Business Analytics: From Data to Decisions — ", { bold: true }), body("Imperial College London", { bold: true, color: NAVY })] }),
      new Paragraph({ spacing: { after: 100 }, children: [body("Coursework: regression analysis, clustering, decision trees, nearest neighbour methods, support vector machines, machine learning, linear programming, business proposal development", { size: 20 })] }),

      new Paragraph({ spacing: { after: 100 }, children: [body("A-Levels: ", { bold: true }), body("Further Mathematics, Mathematics, Russian")] }),

      // ---------- ADDITIONAL ----------
      sectionHeading("Additional Information"),
      new Paragraph({ spacing: { after: 20 }, children: [body("Right to work: ", { bold: true }), body("UK passport holder — eligible to work in the UK without sponsorship")] }),
      new Paragraph({ spacing: { after: 200 }, children: [body("Interests: ", { bold: true }), body("Sailing, cars, horse riding")] }),

      // ================= PAGE 2: SKILLS BANK (reference only — delete before sending) =================
      new Paragraph({ children: [new TextRun({ break: 1 })], pageBreakBefore: true }),
      new Paragraph({
        spacing: { after: 60 },
        children: [new TextRun({ text: "SKILLS BANK — REFERENCE ONLY, DELETE THIS PAGE BEFORE SENDING", bold: true, color: TAILOR, size: 24, font: FONT })],
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [body("Use this page to build the \"Core Skills\" and \"Professional Summary\" sections above. Copy 10–14 relevant terms into Core Skills, matching the exact wording used in the job posting. Delete this entire page from the version you actually submit.", { italics: true, color: GREY, size: 20 })],
      }),

      sectionHeading("Track A — Software / Data Engineering roles"),
      new Paragraph({ spacing: { after: 120 }, children: [body("Python, SQL, Pandas, Java, C++, JavaScript, HTML, REST API, FastAPI, Uvicorn, JSON, Git, object-oriented programming, unit testing, debugging, Agile, data structures and algorithms, ETL, data pipelines, data normalisation, API integration", { size: 20 })] }),

      sectionHeading("Track B — IAM / Cybersecurity roles"),
      new Paragraph({ spacing: { after: 120 }, children: [body("Access management, user provisioning, role-based access control (RBAC), role mapping, access reviews, joiners movers leavers (JML), access governance, audit, compliance, certificate-based connectivity, secure API integration, data reconciliation", { size: 20 })] }),

      sectionHeading("Track C — Business / Data Analyst roles"),
      new Paragraph({ spacing: { after: 120 }, children: [body("Business analysis, requirements gathering, stakeholder management, process improvement, data analysis, data visualization, regression analysis, clustering, decision trees, KPI reporting, dashboards, UAT, Agile/Scrum, business analytics, predictive modelling", { size: 20 })] }),

      sectionHeading("Track D — EA / Finance / Business Support roles"),
      new Paragraph({ spacing: { after: 120 }, children: [body("Executive support, stakeholder coordination, calendar and scheduling, presentation preparation, executive summaries, budget tracking, timesheet management, P&L, Balance Sheet, reconciliations, tender management, bid writing, RFP/RFI, administrative support, attention to detail", { size: 20 })] }),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  require("fs").writeFileSync("Alexandra_Moiseyenko_CV_Master_Template.docx", buf);
  console.log("written");
});
