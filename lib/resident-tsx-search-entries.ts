import type { GuideSearchEntry } from "@/lib/guide-search";
import { RESIDENT_SLUG_SECTION } from "@/lib/resident-guide-sections";

/** Resident guides that still use TSX page bodies (no content/residents MDX yet). */
export const RESIDENT_TSX_SEARCH_ENTRIES: GuideSearchEntry[] = [
  {
    title: "IC Cards in Japan for Daily Life (Suica, PASMO, ICOCA)",
    description:
      "IC cards for residents in Japan: Suica, PASMO, ICOCA for trains, buses, konbini, vending machines, physical vs mobile wallet, and daily habits.",
    href: "/residents/ic-card-japan",
    category: "Residents",
    section: RESIDENT_SLUG_SECTION["ic-card-japan"] ?? "Start Here",
    keywords: [
      "suica",
      "pasmo",
      "icoca",
      "ic card",
      "train",
      "konbini",
      "tap",
      "wallet",
      "resident",
    ],
  },
  {
    title: "How to Open a Bank Account in Japan as a Foreigner",
    description:
      "Documents, banks that still open accounts for foreigners, realistic timelines, common rejection reasons, and a blunt first move if you are new in Japan.",
    href: "/residents/japan-bank-account",
    category: "Residents",
    section: RESIDENT_SLUG_SECTION["japan-bank-account"] ?? "Start Here",
    keywords: ["bank", "account", "foreigner", "atm", "transfer", "yen", "resident"],
  },
  {
    title: "National Health Insurance in Japan Explained for Foreigners",
    description:
      "Kokumin Kenko Hoken (NHI) for foreign residents in Japan: who must enroll, city hall steps, premiums, the 30% copay, clinics vs hospitals, prescriptions, emergencies, and a fever visit walkthrough.",
    href: "/residents/japan-health-insurance",
    category: "Residents",
    section: RESIDENT_SLUG_SECTION["japan-health-insurance"] ?? "Daily Life",
    keywords: [
      "nhi",
      "kokumin",
      "kenko",
      "hoken",
      "health",
      "insurance",
      "clinic",
      "hospital",
      "resident",
    ],
  },
  {
    title: "Monthly Cost of Living in Japan (Real Numbers)",
    description:
      "Rent, food, transport, and utilities in yen for life in Japan, plus realistic monthly totals for Tokyo and how the bill changes outside the capital.",
    href: "/residents/japan-living-cost",
    category: "Residents",
    section: RESIDENT_SLUG_SECTION["japan-living-cost"] ?? "Daily Life",
    keywords: [
      "cost",
      "living",
      "budget",
      "rent",
      "tokyo",
      "yen",
      "monthly",
      "resident",
    ],
  },
  {
    title: "How to Open a Bank Account in Japan (What Actually Works)",
    description:
      "Open a bank account in Japan as a foreign resident: Japan Post Bank, documents, residence card, address, phone, common rejections, and what usually works.",
    href: "/residents/open-bank-account-japan",
    category: "Residents",
    section: RESIDENT_SLUG_SECTION["open-bank-account-japan"] ?? "Start Here",
    keywords: [
      "bank",
      "account",
      "japan post",
      "residence card",
      "foreigner",
      "resident",
    ],
  },
  {
    title: "Best Part-Time Jobs in Japan for Foreigners",
    description:
      "Part-time work in Japan for foreigners: konbini, restaurants, English teaching, typical hourly pay bands, visa limits, and what employers actually check.",
    href: "/residents/part-time-jobs-japan",
    category: "Residents",
    section: RESIDENT_SLUG_SECTION["part-time-jobs-japan"] ?? "Work and Systems",
    keywords: [
      "part-time",
      "job",
      "work",
      "konbini",
      "english",
      "visa",
      "hourly",
      "resident",
    ],
  },
  {
    title: "How to Pay Bills in Japan (Electricity, Gas, Water, Internet)",
    description:
      "Pay utility and internet bills in Japan: konbini barcodes, payment slips, bank auto-debit, deadlines, and what usually goes wrong for residents.",
    href: "/residents/pay-bills-japan",
    category: "Residents",
    section: RESIDENT_SLUG_SECTION["pay-bills-japan"] ?? "Daily Life",
    keywords: [
      "bill",
      "utility",
      "electricity",
      "gas",
      "water",
      "internet",
      "konbini",
      "payment",
      "resident",
    ],
  },
  {
    title: "Renting an Apartment in Japan (What Foreigners Need to Know)",
    description:
      "Rent a place in Japan as a foreigner: deposit, key money, agency fees, guarantors, paperwork, landlord bias, and what actually works.",
    href: "/residents/renting-apartment-japan",
    category: "Residents",
    section: RESIDENT_SLUG_SECTION["renting-apartment-japan"] ?? "Work and Systems",
    keywords: [
      "rent",
      "apartment",
      "housing",
      "deposit",
      "guarantor",
      "lease",
      "foreigner",
      "resident",
    ],
  },
  {
    title: "Best SIM Card for Residents in Japan (Long-Term Options)",
    description:
      "SIM and mobile plans for people living in Japan: carriers vs MVNO, contracts, data, cancellation, and why tourist SIM advice does not apply long term.",
    href: "/residents/sim-card-japan-residents",
    category: "Residents",
    section: RESIDENT_SLUG_SECTION["sim-card-japan-residents"] ?? "Start Here",
    keywords: [
      "sim",
      "esim",
      "phone",
      "data",
      "mvno",
      "contract",
      "resident",
      "long-term",
    ],
  },
];
