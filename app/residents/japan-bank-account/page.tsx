import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { NextStepGuides } from "@/components/NextStepGuides";

export const metadata: Metadata = {
  title:
    "How to Open a Bank Account in Japan as a Foreigner",
  description:
    "Documents, banks that still open accounts for foreigners, realistic timelines, common rejection reasons, and a blunt first move if you are new in Japan.",
};

export default function JapanBankAccountGuidePage() {
  return (
    <GuideArticleShell
      showHotelConversion={false}
      title={
        <h1
          className="guide-page-title"
        >
          How to Open a Bank Account in Japan as a Foreigner
        </h1>
      }
      intro={
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            You need a bank account for salary, rent auto-debit, utilities, and
            daily life. Japan still runs on bank transfers more than outsiders
            expect. The process is slow, paper-heavy, and sometimes arbitrary at
            the branch level.
          </p>
          <p>
            This page is a straight checklist. For a longer resident-focused walk
            through, use the hub article linked at the end.
          </p>
        </div>
      }
      beforeComparison={
        <>
          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Required documents
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Residence card (在留カード) with a valid period of stay
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Proof of address: rental contract, juminhyo (住民票), or utility bill
                depending on what the branch asks for that week
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Japanese phone number (many banks treat this as non-optional)
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Hanko (印鑑) sometimes, signature sometimes. Bring both if you have a
                stamp. Ask the branch before you queue twice.
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Passport as backup ID, student ID or employment letter if they ask
                for status context
              </li>
            </ul>
            <p className="article-body mt-6">
              Rules shift by bank and by branch interpretation. Treat any English PDF
              from a blog as a hint, not a contract.
            </p>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Which banks accept foreigners
            </h2>
            <div className="article-body space-y-4">
              <p>
                <span className="font-sans font-bold text-dark">Japan Post Bank (ゆうちょ):</span>{" "}
                Still the usual first recommendation for new residents who need a
                basic passbook-style account. Wide branch footprint, conservative
                flow, not glamorous.
              </p>
              <p>
                <span className="font-sans font-bold text-dark">Major city banks (三菱UFJ, みずほ, 三井住友など):</span>{" "}
                Possible if your visa and employment story look stable to that
                branch. English counters exist in big branches, eligibility does not
                magically get easier because of English.
              </p>
              <p>
                <span className="font-sans font-bold text-dark">Online-first banks:</span>{" "}
                Useful once you already clear KYC elsewhere. Few are a true shortcut
                on day one without the same ID stack and phone number.
              </p>
              <p>
                <span className="font-sans font-bold text-dark">Shinsei and similar:</span>{" "}
                Products and foreigner-friendly positioning change over time.
                Check the official site or call before you treat any name as a
                guarantee.
              </p>
            </div>
          </section>
        </>
      }
      afterComparison={
        <>
          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Timeline reality
            </h2>
            <div className="article-body space-y-4">
              <p>
                First visit: paperwork, copies, queue. You rarely walk out with full
                app access the same hour unless the branch is quiet and your file is
                perfect.
              </p>
              <p>
                Cash card and PIN mail often arrive later. Budget a week or two for
                postal steps, longer around New Year or busy periods.
              </p>
              <p>
                If you need to pay rent tomorrow, a bank account opened today will not
                save you. Plan a backup path with your employer or landlord while you
                wait.
              </p>
            </div>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Common rejection reasons
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Short remaining period of stay on the residence card
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Address proof that does not match the branch’s internal checklist
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                No Japanese phone number yet
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                “Student” or “designated activities” status without extra letters the
                counter suddenly wants
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Branch policy: same bank, different window, different answer. That is
                normal here, even if it feels absurd.
              </li>
            </ul>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Final recommendation
            </h2>
            <div className="article-body space-y-4">
              <p>
                Bring every document in original plus copies. Go early in the day.
                Start with Japan Post Bank unless you already know a major bank will
                take your exact visa class.
              </p>
              <p>
                If one branch says no, try another branch of the same institution
                before you spiral. If every path says no, fix the missing item
                (address, phone, period of stay) instead of arguing at the counter.
              </p>
              <p>
                <Link
                  href="/residents/open-bank-account-japan"
                  className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
                >
                  Full resident guide: open a bank account in Japan →
                </Link>
              </p>
              <p>
                <Link
                  href="/guides/money-payments-japan"
                  className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
                >
                  Money, cards, and cash in Japan →
                </Link>
              </p>
            </div>
          </section>

          <NextStepGuides guideId="japan-bank-account" />

          <GuideEndCta
            parentHref="/residents"
            parentLabel="Residents hub →"
          />

          <div className="border-t border-tan pt-8 mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              JapanProTips homepage <span className="text-lg">‹‹‹</span>
            </Link>
          </div>
        </>
      }
    />
  );
}
