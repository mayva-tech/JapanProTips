import type { Metadata } from "next";
import Link from "next/link";
import { ServiceBlock } from "@/components/ServiceBlock";
import { ResidentsCrosslinks } from "@/components/guides/ResidentsCrosslinks";

export const metadata: Metadata = {
  title:
    "How to Open a Bank Account in Japan (What Actually Works)",
  description:
    "Open a bank account in Japan as a foreign resident: Japan Post Bank, documents, residence card, address, phone, common rejections, and what usually works.",
};

export default function OpenBankAccountJapanPage() {
  return (
    <main className="bg-cream min-h-screen font-sans">
      <article className="max-w-3xl mx-auto px-6 pt-12 pb-16">
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(36px, 5.5vw, 56px)" }}
        >
          How to Open a Bank Account in Japan (What Actually Works)
        </h1>

        <div className="article-body mb-12 max-w-2xl space-y-4">
          <p>
            Opening a bank account in Japan is not straightforward. Branches
            follow internal rules you will not see written on a single English
            page.
          </p>
          <p>
            Requirements vary depending on visa status, how long you have been in
            the country, and sometimes the mood of the counter that day.
          </p>
          <p>
            Once the account exists, you can wire{" "}
            <Link
              href="/residents/pay-bills-japan"
              className="font-sans font-bold text-rust hover:text-maroon transition-colors duration-150"
            >
              bill payment and auto-debit
            </Link>{" "}
            through it.
          </p>
          <p>
            After the account is open, set up the app and furikomi transfers:{" "}
            <Link
              href="/residents/japan-banking-apps-guide"
              className="font-sans font-bold text-rust hover:text-maroon transition-colors duration-150"
            >
              banking apps and online banking guide
            </Link>
            .
          </p>
        </div>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Quick Answer
          </h2>
          <p className="article-body mb-4 max-w-2xl">
            You usually need:
          </p>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Residence card
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Address
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Phone number
            </li>
          </ul>
          <p className="article-body mt-6 max-w-2xl">
            Some banks reject short-term residents or people without stable work or
            study ties. Treat that as normal, not personal.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Best Banks for Foreigners
          </h2>
          <div className="article-body space-y-6 max-w-2xl">
            <div>
              <h3 className="font-display text-dark text-2xl tracking-wide mb-2">
                Japan Post Bank (Yucho)
              </h3>
              <p>
                Often the first realistic stop for new residents. Wide branch
                network, familiar flow for basic accounts, still paperwork heavy.
              </p>
            </div>
            <div>
              <h3 className="font-display text-dark text-2xl tracking-wide mb-2">
                Shinsei Bank (if applicable)
              </h3>
              <p>
                Sometimes recommended for English-friendly service, but product
                rules change. Confirm current account types and eligibility on their
                site or by phone before you go.
              </p>
            </div>
            <div>
              <h3 className="font-display text-dark text-2xl tracking-wide mb-2">
                Online banks (limitations)
              </h3>
              <p>
                Convenient once you already exist in the system. Many still require
                the same ID stack and a Japanese phone number. Not always easier for
                day-one arrivals.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            What You Need
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Residence card
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Proof of address
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Phone number
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              In some cases: job or student status
            </li>
          </ul>
          <p className="article-body mt-6 max-w-2xl">
            Bring originals. Bring copies if you have them. Bring a Japanese speaker
            if you can.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Common Problems
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Being rejected without explanation
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Language barrier
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Long processing times
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            What Actually Works
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Go to Japan Post Bank first
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Bring all documents
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Be prepared for Japanese-only forms
            </li>
          </ul>
        </section>

        <div className="mb-12 max-w-2xl">
          <p className="article-body mb-4">
            If you want to move yen without a full local stack yet, do this:
          </p>
          <p className="article-body-sm mb-4">
            Having a transfer path ready before rent and deposits hit reduces
            back-and-forth.
          </p>
          <ServiceBlock
            title="Need help sending or receiving money?"
            description="International transfers are easier with services built for foreigners."
            linkText="Send and convert money with Wise →"
            href="https://wise.com/"
          />
        </div>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Reality Check
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              It is not fast
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              It is not always logical
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              But it is manageable
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Bottom Line
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Start with Japan Post Bank
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Bring complete documents
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Expect friction
            </li>
          </ul>
        </section>

        <ResidentsCrosslinks currentHref="/residents/open-bank-account-japan" />
      </article>
    </main>
  );
}
