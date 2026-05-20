import type { Metadata } from "next";
import Link from "next/link";
import { ServiceBlock } from "@/components/ServiceBlock";
import { ResidentsCrosslinks } from "@/components/guides/ResidentsCrosslinks";

export const metadata: Metadata = {
  title:
    "How to Pay Bills in Japan (Electricity, Gas, Water, Internet)",
  description:
    "Pay utility and internet bills in Japan: konbini barcodes, payment slips, bank auto-debit, deadlines, and what usually goes wrong for residents.",
};

export default function PayBillsJapanPage() {
  return (
    <main className="bg-cream min-h-screen font-sans">
      <article className="max-w-3xl mx-auto px-6 pt-12 pb-16">
        <h1
          className="guide-page-title"
        >
          How to Pay Bills in Japan (Electricity, Gas, Water, Internet)
        </h1>

        <div className="article-body mb-12 max-w-2xl space-y-4">
          <p>
            Japan uses different payment systems than many countries. Paper slips,
            barcodes at convenience stores, and bank auto-withdrawal all show up in
            normal adult life here.
          </p>
          <p>
            New to move-in setup? Start with the{" "}
            <Link
              href="/residents/japan-utilities-guide"
              className="font-sans font-bold text-rust hover:text-maroon transition-colors duration-150"
            >
              utilities guide for foreign residents
            </Link>
            , then use this page for payment methods.
          </p>
          <p>
            Auto-debit needs a{" "}
            <Link
              href="/residents/open-bank-account-japan"
              className="font-sans font-bold text-rust hover:text-maroon transition-colors duration-150"
            >
              Japanese bank account
            </Link>{" "}
            first. For PayPay, Suica, and wallet apps, see the{" "}
            <Link
              href="/residents/japan-mobile-payment-guide"
              className="font-sans font-bold text-rust hover:text-maroon transition-colors duration-150"
            >
              mobile payments guide
            </Link>
            .
          </p>
        </div>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Quick Answer
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Pay at convenience stores
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Or set up bank auto-withdrawal
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Common Payment Methods
          </h2>
          <div className="article-body space-y-6 max-w-2xl">
            <div>
              <h3 className="font-display text-dark text-2xl tracking-wide mb-2">
                Convenience store payment slips
              </h3>
              <p>
                Your bill or postcard arrives with a barcode or slip. Take it to a
                konbini, hand it to the machine or staff, pay cash or sometimes card
                depending on the store. Keep the receipt.
              </p>
            </div>
            <div>
              <h3 className="font-display text-dark text-2xl tracking-wide mb-2">
                Bank auto-debit
              </h3>
              <p>
                You authorize the utility or telco to pull from your Japanese bank
                account each cycle. Less mental load once it is wired correctly.
              </p>
            </div>
            <div>
              <h3 className="font-display text-dark text-2xl tracking-wide mb-2">
                Credit card (limited cases)
              </h3>
              <p>
                Some providers let you register a card for recurring charges. Not
                universal. Check your contract portal or the paper that came with
                your first bill.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            How It Works
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Receive bill
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Pay at konbini OR
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Set auto-payment
            </li>
          </ul>
          <p className="article-body mt-6 max-w-2xl">
            First month after move-in you often get extra paper. Read the due date
            and the exact name on the account so you do not pay the wrong slip.
          </p>
        </section>

        <div className="mb-12 max-w-2xl">
          <p className="article-body-sm mb-4">
            Setting auto-pay before the first due date is easier than reversing a
            late fee.
          </p>
          <ServiceBlock
            title="Want to automate your payments?"
            description="Setting up auto-pay saves time and avoids missed deadlines."
            linkText="Automate transfers and bill pay with Wise →"
            href="https://wise.com/"
          />
        </div>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Common Mistakes
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Missing deadlines
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Losing payment slips
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Not setting auto-pay
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Reality Check
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Systems are old but reliable
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Bottom Line
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Use auto-payment if possible
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Otherwise, pay at convenience store
            </li>
          </ul>
        </section>

        <ResidentsCrosslinks currentHref="/residents/pay-bills-japan" />
      </article>
    </main>
  );
}
