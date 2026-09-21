import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Callout } from "@/components/editorial/Callout";
import { EngineeringPageFooter } from "@/components/engineering/EngineeringPageFooter";
import {
  CORNERSTONE_25_YEARS_PATH,
  CORNERSTONE_CAREER_PATHS_PATH,
  CORNERSTONE_DECISIONS_PATH,
} from "@/lib/engineering-copy";
import { SITE_NAME, siteUrl } from "@/lib/site";

const PATH = CORNERSTONE_CAREER_PATHS_PATH;
const CANONICAL = `${siteUrl()}${PATH}`;

const title = "Foreign Engineer Career Paths in Japan";
const description =
  "A practical guide to engineering career paths in Japan, including manufacturing, product development, CAD, CAE, quality, supplier management, and leadership opportunities.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "foreign engineer Japan",
    "engineering career Japan",
    "engineer jobs Japan",
    "manufacturing engineer Japan",
    "CAD engineer Japan",
    "CAE engineer Japan",
    "automotive engineer Japan",
    "engineering manager Japan",
    "product development Japan",
    "working in Japan as an engineer",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    type: "article",
    url: CANONICAL,
    siteName: SITE_NAME,
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: title,
      description,
      inLanguage: "en-US",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: siteUrl() },
      breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
    },
    {
      "@type": "Article",
      "@id": `${CANONICAL}#article`,
      headline: title,
      description,
      inLanguage: "en-US",
      isPartOf: { "@id": `${CANONICAL}#webpage` },
      author: {
        "@type": "Organization",
        name: SITE_NAME,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: siteUrl(),
      },
      mainEntityOfPage: { "@id": `${CANONICAL}#webpage` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${CANONICAL}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl(),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Engineer",
          item: `${siteUrl()}/engineer`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: title,
          item: CANONICAL,
        },
      ],
    },
  ],
};

const inlineLink =
  "font-bold text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon";

function H2({ children }: { children: ReactNode }) {
  return <h2 className="editorial-heading mb-4 mt-10">{children}</h2>;
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="font-sans text-base font-bold uppercase tracking-widest text-dark mb-3 mt-6">
    {children}
  </h3>;
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="article-body list-none space-y-3 pl-0 max-w-2xl">
      {items.map((item) => (
        <li
          key={item}
          className="before:mr-3 before:font-bold before:text-rust before:content-['›']"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function ChecklistBox({
  heading,
  items,
}: {
  heading: string;
  items: readonly string[];
}) {
  return (
    <aside className="editorial-card my-8 border border-paper-edge bg-paper-card p-6 max-w-2xl">
      <p className="font-sans text-sm font-bold uppercase tracking-widest text-dark mb-4">
        {heading}
      </p>
      <ul className="article-body list-none space-y-2.5 pl-0">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm">
            <span className="shrink-0 font-sans font-bold text-rust" aria-hidden>
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default function ForeignEngineerCareerPathsJapanPage() {
  return (
    <main className="min-h-screen bg-cream font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="page-x mx-auto min-w-0 max-w-3xl pb-14 pt-10">
        <p className="editorial-kicker mb-3">
          <Link href="/engineer" className={inlineLink}>
            Engineer
          </Link>
        </p>
        <h1 className="guide-page-title">{title}</h1>

        <div className="guide-prose max-w-2xl">
          <p>
            Many foreign engineers focus almost entirely on getting a job in Japan.
            Visa status, language level, and interview preparation consume months of
            attention. That is understandable. What often gets less attention is
            what happens after the offer: where that first role can lead, how
            careers evolve inside Japanese organizations, and how technical paths
            differ from coordination paths and from management paths.
          </p>
          <p>
            This article answers a practical question: what can your engineering
            career actually become if you work in Japan? It is written from the
            perspective of a foreign engineer with more than 25 years of experience
            inside Japan&apos;s manufacturing and product development industries,
            including automotive programs, CAD and CAE work, supplier coordination,
            and technical documentation. It is not a recruiter pitch, a job board,
            or an immigration guide. It is career perspective from someone who has
            lived these paths.
          </p>
          <p>
            Career planning becomes increasingly important after the first few
            years. Early roles teach you how a company works. Mid-career choices
            determine whether you stay narrow, become a specialist, move toward
            coordination, or step toward leadership. If you understand the landscape
            early, you can make deliberate choices instead of drifting into a
            ceiling you did not see coming.
          </p>
          <p>
            This guide is useful whether you already work in Japan, are comparing
            offers from Japanese employers, are a student researching long-term
            options, or are a mid-career engineer deciding whether a move to Japan
            still fits your goals. The paths below appear repeatedly across
            manufacturing-heavy industries, especially automotive and industrial
            equipment, though titles and emphasis vary by company.
          </p>
          <p>
            For background on how organizations actually operate, read{" "}
            <Link href={CORNERSTONE_DECISIONS_PATH} className={inlineLink}>
              how Japanese engineering organizations make decisions
            </Link>
            . For foundational lessons from manufacturing work, see{" "}
            <Link href={CORNERSTONE_25_YEARS_PATH} className={inlineLink}>
              what 25 years in Japanese manufacturing taught me
            </Link>
            .
          </p>

          <H2>The typical foreign engineer journey</H2>
          <p>
            Not every engineer follows the same path. Company size, industry,
            language ability, and hiring context all matter. Still, a useful mental
            model is a progression from entry to mid-level, senior, specialist,
            and management roles. The labels differ between companies, but the
            underlying shift is consistent: early work is about execution and
            learning process; later work is about judgment, communication, and
            influence across functions.
          </p>

          <H3>Entry level</H3>
          <p>
            Entry roles for foreign engineers often sit in design support, analysis
            support, manufacturing engineering assistance, quality support, or
            technical liaison work with overseas affiliates. You may spend more time
            on documentation, data collection, model updates, test support, and
            meeting follow-up than on owning a full subsystem. That is normal.
            Japanese organizations often expect engineers to prove reliability in
            process before expanding scope.
          </p>
          <p>
            Entry is also where language and communication gaps show up most
            clearly. Engineers who treat documentation and meeting follow-up as
            secondary work often stall here longer than peers with similar technical
            skill.
          </p>

          <H3>Mid-level</H3>
          <p>
            Mid-level engineers own defined deliverables: a component family, a
            validation scope, a supplier interface, or a CAE domain. You are expected
            to prepare materials for design reviews, write reports that others can
            act on, and coordinate with manufacturing or quality without constant
            supervision. Foreign engineers who succeed at this stage usually combine
            technical competence with readable documentation and predictable
            communication.
          </p>

          <H3>Senior level</H3>
          <p>
            Senior engineers are trusted to interpret ambiguous requirements, propose
            trade-offs, and mentor junior staff. Scope widens beyond a single task to
            program-level risk. You may lead review preparation, represent your
            section in cross-functional meetings, or become the primary technical
            contact for a supplier cluster. Senior roles are less about doing every
            calculation yourself and more about ensuring the right work happens
            across people and departments.
          </p>

          <H3>Specialist level</H3>
          <p>
            Some engineers deepen vertically instead of moving toward people
            management. CAD methodology experts, CAE domain leads, quality system
            specialists, and manufacturing process experts can hold significant
            influence without becoming section managers. These paths reward depth,
            consistency, and reputation inside the organization. They can be
            excellent careers, but they require intentional skill building rather
            than accidental repetition of the same tasks.
          </p>

          <H3>Management level</H3>
          <p>
            Engineering managers in Japan coordinate people, schedules, budgets,
            approvals, and communication between departments. Technical background
            matters, but the daily work shifts toward alignment, resource allocation,
            and decision facilitation. Managers who assume promotions are purely
            technical often struggle. The shift is from proving your analysis to
            enabling a team to deliver under manufacturing and organizational
            constraints.
          </p>

          <Callout title="Field note">
            <p>
              Ask experienced engineers in your organization which transitions they
              saw most often: specialist depth, supplier coordination, or section
              management. Company culture shapes which paths are realistic more than
              job titles suggest.
            </p>
          </Callout>

          <H2>Manufacturing engineering</H2>
          <p>
            Manufacturing engineering sits close to production: line preparation,
            process capability, tooling issues, yield problems, and design-for-manufacturing
            feedback. In automotive and industrial product companies, manufacturing
            engineers translate design intent into something that can be built
            repeatedly at volume.
          </p>
          <p>
            Typical responsibilities include reviewing drawings and processes for
            buildability, supporting launch activities, analyzing defect trends,
            coordinating countermeasures with design and supplier teams, and
            documenting process changes. Strengths that matter include practical
            problem solving, patience with detail, and the ability to communicate
            with shop-floor stakeholders without dismissing their constraints.
          </p>
          <p>
            Manufacturing remains important in Japan because high-mix, high-quality
            production still anchors many engineering employers. Even as some design
            work globalizes, someone local must own how parts enter the line, how
            deviations are handled, and how engineering changes affect running
            production. Long-term prospects for manufacturing engineers who combine
            technical depth with clear communication remain solid, especially in
            automotive, industrial equipment, and precision manufacturing.
          </p>
          <p>
            Foreign engineers sometimes overlook manufacturing paths because they
            appear less glamorous than design office work. That is a mistake.
            Manufacturing exposure teaches how decisions actually land, which makes
            later product development and management work more credible.
          </p>
          <p>
            In automotive engineering, manufacturing roles often sit close to launch
            events, line changes, and supplier ramp-up. Engineers who understand
            how a drawing change affects tooling, inspection, and warranty risk
            become trusted voices in program meetings. That credibility is difficult
            to build from a CAD workstation alone.
          </p>

          <H2>Product development engineering</H2>
          <p>
            Product development engineering covers the arc from concept through
            design, validation, release, and post-launch support. In Japanese
            organizations, this work is rarely solo. It moves through cross-functional
            reviews involving design, CAE, manufacturing, quality, procurement, and
            sometimes overseas affiliates.
          </p>
          <p>
            Design work includes requirements interpretation, CAD development,
            tolerance strategy, and design review preparation. Validation work
            includes bench testing, simulation correlation, durability studies, and
            report writing that supports approval. Coordination work includes
            tracking open issues, aligning supplier samples with internal targets,
            and maintaining traceability as changes accumulate.
          </p>
          <p>
            This path connects naturally to long product cycles in automotive and
            industrial sectors. Engineers who thrive here learn to think in program
            time horizons, not only in individual tasks. They also learn that a
            good design on screen can still fail if validation evidence, supplier
            readiness, or manufacturing preparation is weak.
          </p>
          <p>
            Product development roles often become the bridge into supplier
            coordination or section leadership because they require visibility
            across functions. If you want to understand how reviews and approvals
            actually work, see{" "}
            <Link href={CORNERSTONE_DECISIONS_PATH} className={inlineLink}>
              how Japanese engineering organizations make decisions
            </Link>
            .
          </p>

          <H2>CAD engineer career path</H2>
          <p>
            CAD engineers build and maintain the digital definition of products:
            parts, assemblies, drawings, revision control, and release packages.
            In many Japanese companies, CAD work is treated as a core engineering
            discipline, not merely drafting support.
          </p>
          <p>
            Strengths for CAD engineers include modeling accuracy, standards
            discipline, awareness of manufacturing implications, and speed under
            revision pressure. CAD engineers who understand tolerance stack-ups,
            drawing completeness, and downstream use of models by CAE and manufacturing
            teams become highly valuable.
          </p>
          <p>
            Limitations appear when CAD engineers stay isolated from validation,
            supplier feedback, and review discussions. Modeling without context
            produces rework. Advancement opportunities include lead CAD roles,
            methodology ownership, integration with PLM systems, and transition into
            broader design responsibility. Some CAD specialists move toward product
            development ownership; others become technical authorities for modeling
            standards across programs.
          </p>
          <p>
            No path guarantees promotion. CAD careers advance when engineers
            demonstrate that their work reduces program risk, not when they simply
            accumulate modeling hours.
          </p>

          <H2>CAE engineer career path</H2>
          <p>
            CAE engineers focus on simulation and analysis: structural, thermal,
            durability, NVH, crash, or other domain-specific studies depending on
            industry. Their output supports design decisions before physical
            prototypes exist, and later correlates models with test results.
          </p>
          <p>
            CAE differs from CAD in purpose and audience. CAD defines geometry and
            release data. CAE interprets behavior, uncertainty, and margin. A strong
            CAE engineer explains assumptions, limits, and recommended actions, not
            only colorful contour plots. Reports that lack decision-ready conclusions
            often get ignored in review meetings.
          </p>
          <p>
            Specialization is common in CAE. Engineers may own a domain for years,
            building deep credibility. Advancement can mean lead analyst roles,
            methodology development, correlation strategy ownership, or transition
            into cross-domain validation leadership. CAE engineers who communicate
            clearly with design and test teams tend to move faster than those who
            speak only in solver terminology.
          </p>
          <p>
            Foreign engineers with strong simulation backgrounds can enter CAE paths
            competitively, but long-term success still depends on understanding
            Japanese review culture and documentation expectations.
          </p>
          <p>
            CAE careers often intersect with test departments. Correlation work,
            margin discussions, and failure analysis meetings are where analysts
            either gain program influence or remain isolated. Engineers who treat
            correlation as shared learning rather than blame assignment tend to
            build stronger long-term reputations.
          </p>

          <H2>Quality engineering</H2>
          <p>
            Quality engineering spans process quality, supplier quality, incoming
            inspection logic, audit preparation, and validation evidence that
            supports release decisions. Quality roles interact with many departments
            because they sit at the intersection of design intent, manufacturing
            capability, and customer requirements.
          </p>
          <p>
            Process quality engineers focus on stability, control plans, defect
            reduction, and corrective action systems. Supplier quality engineers
            evaluate vendor capability, review PPAP-like submission packages, and
            manage issue escalation when field or line problems trace back to
            purchased parts. Validation-oriented quality work ensures test evidence
            matches requirements and that open risks are visible before approval.
          </p>
          <p>
            Quality paths reward meticulous documentation, calm escalation, and the
            ability to challenge technical gaps without creating unnecessary
            adversarial dynamics. Foreign engineers sometimes underestimate quality
            roles because they appear process-heavy. In practice, quality engineers
            often see failure modes earlier than design teams and gain broad
            organizational visibility.
          </p>
          <p>
            Long-term prospects include quality lead roles, supplier quality
            management, audit leadership, and transitions into broader program or
            manufacturing leadership when combined with cross-functional experience.
          </p>

          <H2>Supplier coordination and technical liaison roles</H2>
          <p>
            Supplier coordination and technical liaison roles connect internal
            engineering teams with domestic and overseas suppliers, affiliates, and
            contract manufacturers. Responsibilities include requirement clarification,
            issue tracking, sample evaluation, corrective action follow-up, and
            written records that survive personnel changes on both sides.
          </p>
          <p>
            These roles demand technical literacy plus communication discipline.
            You must understand enough engineering to detect when a supplier
            response is vague, incomplete, or technically risky. You must also
            write emails, reports, and meeting minutes that move decisions forward
            instead of restarting debates.
          </p>
          <p>
            Communication becomes increasingly important in these paths. Engineers
            who resist written follow-up or avoid difficult clarity conversations
            often struggle here regardless of technical background. Conversely,
            engineers who build trust with suppliers and internal stakeholders can
            become indispensable program connectors.
          </p>
          <p>
            Foreign engineers with language ability and cross-cultural awareness
            sometimes enter liaison roles early. That can be an advantage if you
            treat the role as engineering communication, not as administrative
            support. For help refining supplier or affiliate communication, see{" "}
            <Link href="/engineering-services" className={inlineLink}>
              engineering services
            </Link>
            .
          </p>

          <H2>Engineering management</H2>
          <p>
            Engineering management paths include section chief roles, project
            leadership, program management with strong technical roots, and
            functional management over design, CAE, or quality teams. The common
            thread is coordination: people, schedules, priorities, and decisions
            across groups with different incentives.
          </p>
          <p>
            Technical skill alone is not enough. Managers must run meetings that
            end with clear actions, protect teams from unnecessary churn, escalate
            risks early, and translate leadership direction into workable engineering
            plans. In Japanese organizations, managers also carry responsibility for
            documentation quality, approval readiness, and stakeholder alignment.
          </p>
          <p>
            Foreign engineers can reach management roles, but credibility builds
            through consistent delivery, readable communication, and demonstrated
            understanding of manufacturing realities. Managers who cannot follow the
            documentation and approval flow their teams depend on lose trust quickly.
          </p>
          <p>
            If management interests you, seek opportunities to lead review
            preparation, mentor junior engineers, and own cross-functional issues
            before the title changes. The work usually starts informally.
          </p>
          <p>
            Engineering manager paths in Japan still require readable communication.
            Section chiefs are often judged on whether their teams produce
            approval-ready materials, maintain supplier relationships, and escalate
            risks without surprises. Leadership here is less about charisma and more
            about predictable execution across people, documents, and deadlines.
          </p>

          <H2>What skills matter most long-term</H2>
          <p>
            Early career success often emphasizes technical skill: modeling, analysis,
            testing, or process knowledge. Over time, the balance shifts. Below is a
            practical ranking for long-term engineering careers in Japan, especially
            in manufacturing-heavy organizations.
          </p>
          <BulletList
            items={[
              "Communication: the ability to make decisions understandable and actionable across language and culture gaps",
              "Documentation: reports, change records, and review materials that hold up without you in the room",
              "Manufacturing understanding: how design choices affect buildability, quality, and cost at volume",
              "Problem solving: structured diagnosis under incomplete information and schedule pressure",
              "Cross-cultural awareness: reading organizational context without treating difference as defect",
              "Technical skill: still essential, but rarely sufficient alone after mid-career",
              "Business understanding: cost, schedule, customer requirements, and supplier economics",
            ]}
          />
          <p>
            Communication rises in importance because senior work is judged by whether
            others can approve, implement, audit, or defend your engineering
            judgment. Analyses that only you understand do not scale. Documentation
            is how organizations remember. Manufacturing understanding prevents
            elegant designs from failing in production. Business understanding helps
            you propose realistic trade-offs instead of idealized ones.
          </p>
          <p>
            Technical skill remains the foundation. Without it, communication becomes
            empty polish. The point is not that technical depth stops mattering. The
            point is that technical depth without communication rarely reaches senior
            or leadership roles in Japanese engineering organizations.
          </p>
          <p>
            A practical way to read this ranking is by career stage. In the first three
            to five years, technical skill and problem solving usually dominate hiring
            and performance reviews. From mid-career onward, documentation and
            communication increasingly determine whether you lead reviews, own supplier
            interfaces, or receive management consideration. Manufacturing understanding
            and business awareness accelerate that transition because they show you
            see the organization beyond your immediate task.
          </p>

          <H2>Common career mistakes</H2>
          <p>
            Foreign engineers sometimes repeat patterns that limit growth. None of
            these are fatal, but they slow careers when left unaddressed.
          </p>
          <BulletList
            items={[
              "Staying too narrow: repeating the same task type without learning adjacent functions",
              "Avoiding communication work: treating reports, meetings, and supplier emails as low-value",
              "Ignoring documentation: assuming verbal agreement is enough for approval or traceability",
              "Assuming promotions are purely technical: overlooking coordination and stakeholder trust",
              "Neglecting relationship building: working in isolation from manufacturing, quality, and suppliers",
              "Dismissing manufacturing and quality perspectives as obstacles instead of information",
              "Waiting for perfect Japanese before contributing in meetings or writing drafts",
            ]}
          />
          <p>
            Another common mistake is comparing career pace to other countries without
            adjusting for how approval, documentation, and cross-functional alignment
            work locally. Frustration often comes from expecting fast individual
            decisions in systems designed for collective traceability.
          </p>

          <H2>Career advice for foreign engineers</H2>
          <p>
            Practical recommendations for long-term growth inside Japan:
          </p>
          <BulletList
            items={[
              "Build technical depth in at least one domain you can defend in review",
              "Volunteer for report and review preparation to learn how decisions move",
              "Learn how manufacturing and quality interpret your outputs",
              "Improve written communication even if spoken Japanese is still developing",
              "Seek feedback from managers on scope expansion, not only on task completion",
              "Document achievements in engineering terms: risk reduced, rework avoided, validation improved",
              "Build relationships across sections before you need them in a crisis",
            ]}
          />
          <p>
            Credibility accumulates through reliability: meeting notes sent promptly,
            reports that do not require rework, supplier issues tracked to closure,
            and design changes explained with downstream impact. Foreign engineers
            who demonstrate that reliability often gain scope faster than those with
            stronger credentials on paper but inconsistent follow-through.
          </p>
          <p>
            If you are still researching the founder perspective behind this section,
            read{" "}
            <Link href="/about-engineer" className={inlineLink}>
              about the engineer
            </Link>
            . For ongoing guides and roadmap topics, visit the{" "}
            <Link href="/engineer" className={inlineLink}>
              engineer hub
            </Link>
            .
          </p>

          <ChecklistBox
            heading="Practical career checklist"
            items={[
              "Build technical depth",
              "Learn documentation skills",
              "Understand manufacturing realities",
              "Improve communication",
              "Learn how decisions are made",
              "Build cross-functional relationships",
              "Develop leadership ability",
            ]}
          />

          <H2>Building a long-term engineering career in Japan</H2>
          <p>
            The strongest engineering careers in Japan usually combine technical
            expertise, communication ability, manufacturing understanding, and
            adaptability. The first job is an entry point, not the final definition
            of your career. Manufacturing, product development, CAD, CAE, quality,
            supplier coordination, and management paths all remain viable for foreign
            engineers who understand how Japanese organizations actually work.
          </p>
          <p>
            Career planning is not about picking the perfect title at 25. It is
            about recognizing which skills compound over time. Documentation,
            communication, and cross-functional trust compound. Narrow task repetition
            without learning adjacent functions usually does not.
          </p>
          <p>
            Use this article as a map, not a guarantee. Companies differ. Industries
            differ. Your language level, prior experience, and hiring context all
            shape what is available. Still, engineers who think early about where
            paths lead make better decisions about which skills to build and which
            roles to accept.
          </p>

          <H2>Where to Go Next</H2>
          <p>
            This article is part of the engineering section on JapanProTips. For
            foundational manufacturing lessons, read{" "}
            <Link href={CORNERSTONE_25_YEARS_PATH} className={inlineLink}>
              what 25 years in Japanese manufacturing taught me
            </Link>
            . For how decisions move through organizations, read{" "}
            <Link href={CORNERSTONE_DECISIONS_PATH} className={inlineLink}>
              how Japanese engineering organizations actually make decisions
            </Link>
            . For background on the author, see{" "}
            <Link href="/about-engineer" className={inlineLink}>
              about the engineer
            </Link>
            . For ongoing topics and the article roadmap, visit the{" "}
            <Link href="/engineer" className={inlineLink}>
              engineer hub
            </Link>
            .
          </p>

          <section className="editorial-cta-block my-10 max-w-2xl">
            <h2 className="editorial-heading mb-3 text-ink">
              Need Help Positioning Your Engineering Experience?
            </h2>
            <p className="article-body mb-5">
              Strong engineering careers depend not only on technical ability but
              also on how clearly experience, achievements, and technical
              contributions are communicated.
            </p>
            <Link
              href="/engineering-services"
              className="editorial-btn-primary editorial-chevron-cta"
            >
              Explore Engineering Services
            </Link>
          </section>
        </div>
      </article>

      <EngineeringPageFooter />
    </main>
  );
}
