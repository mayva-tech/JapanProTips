/** Copy and structured data for engineering vertical routes. */

export const HOME_ENGINEERING_SECTION_TITLE = "Engineering in Japan";

export const HOME_ENGINEERING_SECTION_DESCRIPTION =
  "Career guidance, manufacturing insights, and technical communication support from a foreign engineer with more than 25 years of experience working inside Japanese manufacturing and product development organizations.";

export const ENGINEERING_SAMPLE_REVIEW_MAILTO =
  "mailto:engineering@japanprotips.com?subject=Free%20Sample%20Review%20Request";

export const ENGINEERING_FOUNDER_INTRO =
  "A foreign engineer with more than 25 years inside Japanese manufacturing and product development organizations. This vertical shares career guidance, manufacturing insights, and engineering communication support for people working across Japanese and international teams.";

export const ENGINEER_HUB_STRATEGY_INTRO =
  "Engineering in Japan covers three practical areas: careers for foreign engineers in Japan, manufacturing and product development realities, and technical communication across Japanese and international teams.";

export const ENGINEER_HUB_STRATEGY_BALANCE =
  "Published guides mix founder authority with demand-driven career topics and communication-focused content. The next articles prioritize job and career search intent while keeping manufacturing credibility.";

export type EngineerContentTrack = {
  id: string;
  title: string;
  share: string;
  description: string;
  examples: readonly string[];
};

export const ENGINEER_CONTENT_TRACKS: EngineerContentTrack[] = [
  {
    id: "careers",
    title: "Work in Japan as an engineer",
    share: "Search demand · ~40%",
    description:
      "Career paths, hiring expectations, compensation, and job hunting for foreign engineers in Japan.",
    examples: [
      "Foreign engineer career paths",
      "Engineering jobs in Japan",
      "Working in Japan as an engineer",
      "Salary and compensation",
      "Job hunting and interviews",
    ],
  },
  {
    id: "manufacturing",
    title: "Japanese manufacturing & product development",
    share: "Founder authority · ~40%",
    description:
      "How engineering work actually runs inside manufacturing, automotive, and product development organizations.",
    examples: [
      "Manufacturing culture and design reviews",
      "Product development and change management",
      "CAD and CAE career paths",
      "Supplier coordination",
      "How decisions get made",
    ],
  },
  {
    id: "communication",
    title: "Engineering communication",
    share: "Consulting relevance · ~20%",
    description:
      "Documentation, reports, presentations, and cross-cultural communication for engineering teams.",
    examples: [
      "Technical documentation and reports",
      "Engineering presentations",
      "Supplier communication",
      "Overseas affiliate alignment",
      "Cross-cultural engineering communication",
    ],
  },
];

export const FOUNDER_CREDIBILITY_POINTS = [
  "More than 25 years working in Japan",
  "Manufacturing and automotive industry experience",
  "Product development from concept through release",
  "CAD design and CAE analysis experience",
  "Technical documentation and engineering reports",
  "Engineering change management",
  "Supplier coordination with domestic and overseas teams",
  "Cross-cultural communication inside Japanese organizations",
] as const;

export const ENGINEERING_CHALLENGES = [
  "Technical documents that overseas teams struggle to understand",
  "Engineering reports that lose clarity across languages and cultures",
  "Supplier communication that stalls decisions or misstates requirements",
  "Technical presentations that fail to communicate key engineering decisions",
  "Product development documentation that lacks structure and traceability",
  "Overseas affiliate communication that misstates engineering intent",
  "Engineering change documentation that teams cannot trace or approve quickly",
] as const;

export const ENGINEER_HUB_CREDIBILITY_HEADLINE =
  "Built From More Than 25 Years in Japanese Manufacturing";

export const ENGINEER_HUB_CREDIBILITY_BODY =
  "This hub is based on practical experience inside Japan's manufacturing, automotive, and product development environments, including CAD, CAE, supplier coordination, engineering documentation, and cross-cultural technical communication.";

export const ENGINEERING_SERVICES_CREDIBILITY_HEADLINE =
  "Engineering Review From Someone Who Understands the Work";

export const ENGINEERING_SERVICES_CREDIBILITY_BODY =
  "Engineering communication support for people and teams working across Japanese and international engineering environments. This is not generic proofreading, English editing, or automation consulting. Reviews consider technical meaning, document structure, engineering clarity, and how information lands with manufacturing, supplier, and cross-border stakeholders.";

export const ENGINEERING_SERVICES_POSITIONING =
  "Primary focus: engineering documentation, technical communication, presentations and reports, and supplier or overseas affiliate communication. Engineer career positioning is available when technical credibility needs to be communicated clearly in applications or profiles.";

export const ABOUT_ENGINEER_HERO_TITLE =
  "More Than 25 Years Inside Japanese Engineering Organizations";

export const ABOUT_ENGINEER_HERO_DESCRIPTION =
  "Practical engineering communication and career guidance from a foreign engineer with decades of experience in Japan's manufacturing and product development industries.";

export const ABOUT_FOUNDER_POSITIONING_HEADLINE =
  "A Foreign Engineer Working Inside Japan's Manufacturing World";

export const ABOUT_FOUNDER_POSITIONING_BODY = [
  "The engineering section of JapanProTips comes from more than 25 years working inside Japan's engineering, manufacturing, automotive, and product development environments.",
  "The perspective is based on real work inside engineering organizations: design reviews, validation reports, supplier coordination, engineering change management, and cross-functional communication. It is not outside commentary or generic career advice.",
  "Experience spans automotive product development, CAD design, CAE analysis, engineering reports, design review materials, technical documentation, supplier coordination, and communication between Japanese and international engineering teams.",
] as const;

export type ExperiencePillar = {
  id: string;
  title: string;
  description: string;
};

export const EXPERIENCE_PILLARS: ExperiencePillar[] = [
  {
    id: "manufacturing-automotive",
    title: "Manufacturing & Automotive",
    description:
      "Experience in manufacturing environments where engineering decisions affect cost, quality, schedule, and production.",
  },
  {
    id: "product-development",
    title: "Product Development",
    description:
      "Engineering work connected to design, validation, changes, and cross-functional coordination through release.",
  },
  {
    id: "cad-cae",
    title: "CAD & CAE",
    description:
      "Design and analysis workflows used in product development environments, from modeling through validation support.",
  },
  {
    id: "supplier-coordination",
    title: "Supplier Coordination",
    description:
      "Communicating technical issues, requirements, and feedback across company and country boundaries.",
  },
  {
    id: "engineering-documentation",
    title: "Engineering Documentation",
    description:
      "Preparing, reviewing, and improving engineering reports, technical documents, procedures, and design materials.",
  },
  {
    id: "cross-cultural-communication",
    title: "Cross-Cultural Engineering Communication",
    description:
      "Translating technical intent across Japanese and international working styles without losing engineering meaning.",
  },
];

export const ABOUT_SITE_HELPS_WITH = [
  "Understanding engineering careers in Japan",
  "Understanding Japanese manufacturing culture",
  "Communicating technical ideas clearly across teams",
  "Preparing engineering resumes and profiles with technical credibility",
  "Improving technical documentation and engineering reports",
  "Supplier and overseas affiliate communication",
  "Building long-term engineering credibility inside Japan",
] as const;

export const ABOUT_SITE_IS_NOT = [
  "A visa law service",
  "A recruiting agency",
  "A generic English correction service",
  "A travel influencer page",
  "An automation consulting page",
] as const;

export const ABOUT_SITE_IS = [
  "Practical engineering perspective from inside Japanese organizations",
  "Technical communication and documentation support",
  "Manufacturing and product development career guidance",
  "Cross-border engineering communication support",
] as const;

export const LEAD_MAGNET_TITLE =
  "Lessons From 25 Years Working as a Foreign Engineer in Japan";

export const LEAD_MAGNET_DESCRIPTION =
  "A structured guide covering manufacturing culture, product development realities, supplier coordination, and communication lessons from inside Japanese engineering organizations. Download flow coming soon.";

export type CornerstoneGuide = {
  id: string;
  title: string;
  description: string;
  /** Set when the guide is published. Omit for coming-soon placeholders. */
  href?: string;
};

export const CORNERSTONE_25_YEARS_SLUG = "what-25-years-japanese-manufacturing-taught-me";

export const CORNERSTONE_25_YEARS_PATH = `/engineer/${CORNERSTONE_25_YEARS_SLUG}`;

export const CORNERSTONE_DECISIONS_SLUG =
  "how-japanese-engineering-organizations-actually-make-decisions";

export const CORNERSTONE_DECISIONS_PATH = `/engineer/${CORNERSTONE_DECISIONS_SLUG}`;

export const CORNERSTONE_CAREER_PATHS_SLUG = "foreign-engineer-career-paths-japan";

export const CORNERSTONE_CAREER_PATHS_PATH = `/engineer/${CORNERSTONE_CAREER_PATHS_SLUG}`;

export const CORNERSTONE_JOBS_SLUG = "engineering-jobs-japan-what-companies-look-for";

export const CORNERSTONE_JOBS_PATH = `/engineer/${CORNERSTONE_JOBS_SLUG}`;

export const CORNERSTONE_EXPECTATIONS_SLUG =
  "working-in-japan-as-an-engineer-expectations-vs-reality";

export const CORNERSTONE_EXPECTATIONS_PATH = `/engineer/${CORNERSTONE_EXPECTATIONS_SLUG}`;

export const CORNERSTONE_GUIDES: CornerstoneGuide[] = [
  {
    id: "25-years-manufacturing",
    title: "What 25 Years Working in Japanese Manufacturing Taught Me",
    description:
      "Founder authority: core lessons from decades inside manufacturing and automotive product development.",
    href: CORNERSTONE_25_YEARS_PATH,
  },
  {
    id: "how-decisions-made",
    title: "How Japanese Engineering Organizations Actually Make Decisions",
    description:
      "Founder authority: how consensus, documentation, and manufacturing realities shape engineering outcomes.",
    href: CORNERSTONE_DECISIONS_PATH,
  },
  {
    id: "foreign-engineer-career-paths",
    title: "Foreign Engineer Career Paths in Japan",
    description:
      "Career guidance: realistic paths in manufacturing, product development, CAD, CAE, quality, supplier roles, and leadership.",
    href: CORNERSTONE_CAREER_PATHS_PATH,
  },
  {
    id: "engineering-jobs-japan",
    title: "Engineering Jobs in Japan: What Japanese Companies Actually Look For",
    description:
      "Hiring intent: what employers evaluate beyond job-post keywords, including proof, communication, documentation, and team fit.",
    href: CORNERSTONE_JOBS_PATH,
  },
  {
    id: "working-in-japan-expectations",
    title: "Working in Japan as an Engineer: Expectations vs Reality",
    description:
      "On-the-job reality: meetings, documentation, communication, quality culture, pace, and what changes after you start.",
    href: CORNERSTONE_EXPECTATIONS_PATH,
  },
];

export type UpcomingEngineerGuide = {
  title: string;
  description: string;
  track: "career" | "manufacturing" | "communication";
};

/** Next-phase article roadmap (priority order). Published cornerstone guides excluded. */
export const ENGINEER_UPCOMING_GUIDES: UpcomingEngineerGuide[] = [
  {
    title: "Common Mistakes Foreign Engineers Make in Japanese Companies",
    description:
      "Practical missteps in communication, process, and manufacturing awareness.",
    track: "career",
  },
  {
    title: "Top Industries Hiring Foreign Engineers in Japan",
    description:
      "Where manufacturing, automotive, and product development roles concentrate.",
    track: "career",
  },
  {
    title: "How Design Reviews Work in Japanese Manufacturing",
    description:
      "CAD, CAE, manufacturing, and quality reviews as communication mechanisms.",
    track: "manufacturing",
  },
  {
    title: "Why Technical Communication Matters More Than Technical Skill",
    description:
      "When strong analysis fails to move decisions because the material does not land.",
    track: "communication",
  },
  {
    title: "How Japanese Engineering Organizations Handle Change",
    description:
      "Engineering change documentation, approvals, and downstream impact.",
    track: "manufacturing",
  },
  {
    title: "Supplier Communication Lessons From Japanese Manufacturing",
    description:
      "Requirements, issue resolution, and written records across supplier networks.",
    track: "communication",
  },
  {
    title: "English Communication Challenges Inside Japanese Engineering Teams",
    description:
      "Where language gaps create rework and how to reduce friction without losing precision.",
    track: "communication",
  },
];

export type BeforeAfterExample = {
  title: string;
  before: string;
  after: string;
};

export const BEFORE_AFTER_EXAMPLES: BeforeAfterExample[] = [
  {
    title: "Engineering Report",
    before:
      "Test was done. Result OK. Some issues found. Will fix later. Please check attached data.",
    after:
      "Validation test completed per VT-2841. Two non-conforming items identified (surface finish, dimensional tolerance). Corrective actions assigned with target dates. Full data attached in Section 4.",
  },
  {
    title: "Supplier Communication Email",
    before:
      "Your parts are wrong again. We need better quality. Send new samples ASAP.",
    after:
      "Three units from Lot 2026-03 failed incoming inspection (scratch on sealing face, out-of-spec bore diameter). Please confirm root cause and propose countermeasure by Friday. Sample re-submission required before next shipment release.",
  },
  {
    title: "Technical Documentation",
    before:
      "Procedure for assembly. Follow drawing. Contact supervisor if problem.",
    after:
      "Work instruction WI-ASSY-017: torque sequence, inspection checkpoints, and hold points defined. Escalation path documented for non-conformance at Steps 3 and 6.",
  },
  {
    title: "Resume Achievement Statement",
    before:
      "Worked on automotive projects and supported design team with CAD and testing.",
    after:
      "Led design validation for powertrain component program (12-part supplier network). Reduced prototype rework cycles by 30% through structured DFMEA reviews and bilingual engineering change documentation.",
  },
];

export type EngineeringService = {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  pricingPlaceholder: string;
};

export const ENGINEERING_SERVICES: EngineeringService[] = [
  {
    id: "documentation-review",
    title: "Engineering Documentation Review",
    description:
      "Structured review of specifications, procedures, change records, and project documentation for clarity, completeness, and cross-border readability.",
    deliverables: [
      "Specifications and design documents",
      "Validation and test reports",
      "Engineering procedures and work instructions",
      "Engineering change documentation",
      "Development summaries",
    ],
    pricingPlaceholder: "From ¥25,000 per document (scope dependent)",
  },
  {
    id: "technical-communication",
    title: "Technical Communication Review",
    description:
      "Improve how engineering decisions, risks, requirements, and trade-offs are communicated to internal and external stakeholders.",
    deliverables: [
      "Technical memos and executive summaries",
      "Cross-functional alignment documents",
      "Overseas affiliate communication drafts",
      "Meeting and review follow-up records",
    ],
    pricingPlaceholder: "From ¥30,000 per engagement (scope dependent)",
  },
  {
    id: "presentation-report-review",
    title: "Engineering Presentation & Report Review",
    description:
      "Review presentations and reports for structure, technical clarity, and decision-ready messaging before design reviews or management meetings.",
    deliverables: [
      "Design review presentations",
      "Validation and test report summaries",
      "Management briefing decks",
      "Technical read-ahead packages",
    ],
    pricingPlaceholder: "From ¥30,000 per engagement (scope dependent)",
  },
  {
    id: "supplier-communication",
    title: "Supplier & Overseas Affiliate Communication Support",
    description:
      "Clarify supplier emails, corrective action requests, technical clarifications, and cross-border engineering threads without losing precision.",
    deliverables: [
      "Supplier issue reports",
      "Corrective action requests",
      "Requirement clarification letters",
      "Affiliate technical summaries",
    ],
    pricingPlaceholder: "From ¥30,000 per engagement (scope dependent)",
  },
  {
    id: "career-positioning",
    title: "Engineer Career Positioning",
    description:
      "Position technical achievements for engineering roles in Japan or internationally. Secondary to documentation and communication work; not generic resume writing or job placement.",
    deliverables: [
      "Technical achievement positioning",
      "Engineering resume review",
      "Application narrative clarity",
      "Professional profile structure",
    ],
    pricingPlaceholder: "From ¥20,000 per package (scope dependent)",
  },
];

export const ENGINEERING_PROCESS_STEPS = [
  {
    step: "1",
    title: "Submit material",
    description:
      "Share your document, presentation, or career material with context on audience and purpose.",
  },
  {
    step: "2",
    title: "Receive assessment",
    description:
      "Get a concise review of clarity gaps, structural issues, and communication risks.",
  },
  {
    step: "3",
    title: "Receive quote",
    description:
      "Confirm scope, timeline, and deliverables before work begins. NDAs available on request.",
  },
  {
    step: "4",
    title: "Receive completed deliverables",
    description:
      "Receive revised materials with practical notes you can reuse on future projects.",
  },
] as const;

export const ENGINEERING_TRUST_AREAS = [
  "Manufacturing",
  "Automotive",
  "Product development",
  "CAD",
  "CAE",
  "Technical documentation",
  "Long-term experience in Japan",
] as const;

export const ENGINEERING_SERVICES_FAQ = [
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes. Confidentiality agreements are standard for engineering documentation and supplier communication work.",
  },
  {
    question: "Can you review engineering reports?",
    answer:
      "Yes. Validation reports, test reports, design reviews, and engineering change summaries are common request types.",
  },
  {
    question: "Can you review technical presentations?",
    answer:
      "Yes. Presentations for design reviews, supplier meetings, and executive summaries can be reviewed for structure and clarity.",
  },
  {
    question: "Can you assist supplier communication?",
    answer:
      "Yes. Supplier emails, corrective action requests, and technical clarifications are supported when engineering context is provided.",
  },
  {
    question: "Can you help engineers applying for roles in Japan or internationally?",
    answer:
      "Yes, as engineer career positioning: technical achievement framing in resumes and applications. This is not generic resume writing, recruiting, or guaranteed job outcomes.",
  },
  {
    question: "What industries do you support?",
    answer:
      "Manufacturing, automotive, and product development are the primary focus. Related mechanical and industrial engineering contexts are also supported.",
  },
] as const;

export type EngineerCategory = {
  id: string;
  title: string;
  description: string;
};

export const ENGINEER_CATEGORIES: EngineerCategory[] = [
  {
    id: "visas",
    title: "Visas & Legal",
    description: "Work authorization, renewals, and employment basics for engineers.",
  },
  {
    id: "job-hunting",
    title: "Job Hunting",
    description: "Applications, interviews, and hiring patterns in Japanese companies.",
  },
  {
    id: "salary",
    title: "Salary & Compensation",
    description: "Pay structures, bonuses, and negotiation context inside Japan.",
  },
  {
    id: "workplace-culture",
    title: "Workplace Culture",
    description: "Meetings, hierarchy, and daily expectations in engineering teams.",
  },
  {
    id: "manufacturing-culture",
    title: "Japanese Manufacturing Culture",
    description: "Quality systems, shop floor coordination, and production mindset.",
  },
  {
    id: "product-development",
    title: "Product Development",
    description: "How programs move from concept through validation and release.",
  },
  {
    id: "cad-cae",
    title: "CAD & CAE",
    description: "Design and analysis career paths inside Japanese organizations.",
  },
  {
    id: "supplier-management",
    title: "Supplier Management",
    description: "Coordination, audits, and technical communication with suppliers.",
  },
  {
    id: "engineering-communication",
    title: "Engineering Communication",
    description: "Reports, presentations, and cross-border technical alignment.",
  },
  {
    id: "career-growth",
    title: "Career Growth",
    description: "Long-term progression for foreign engineers in Japan.",
  },
  {
    id: "automotive",
    title: "Automotive Industry Insights",
    description: "Program structures, validation cycles, and supplier networks.",
  },
  {
    id: "decision-making",
    title: "Engineering Decisions",
    description: "How Japanese engineering organizations reach and document decisions.",
  },
];

export const ENGINEERING_SERVICES_KEYWORDS = [
  "foreign engineer Japan",
  "engineering jobs Japan",
  "engineering communication Japan",
  "technical documentation Japan",
  "manufacturing engineer Japan",
  "automotive engineer Japan",
  "product development Japan",
  "CAD engineer Japan",
  "CAE engineer Japan",
  "working in Japan as an engineer",
] as const;

export const ENGINEER_HUB_KEYWORDS = [
  "foreign engineer Japan",
  "engineering jobs Japan",
  "engineering career Japan",
  "working in Japan as an engineer",
  "manufacturing engineer Japan",
  "automotive engineer Japan",
  "product development Japan",
  "CAD engineer Japan",
  "CAE engineer Japan",
  "Japanese manufacturing culture",
  "technical documentation Japan",
  "engineering communication Japan",
] as const;

export const ABOUT_ENGINEER_KEYWORDS = [
  "foreign engineer Japan",
  "Japanese manufacturing engineer",
  "automotive engineer Japan",
  "product development Japan",
  "CAD engineer Japan",
  "CAE engineer Japan",
  "engineering communication Japan",
  "technical documentation Japan",
] as const;

/** @deprecated Use ENGINEER_UPCOMING_GUIDES for roadmap placeholders. */
export const ENGINEER_FEATURED_GUIDE_PLACEHOLDERS = ENGINEER_UPCOMING_GUIDES.map(
  (guide) => guide.title,
) as readonly string[];
