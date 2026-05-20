"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Callout } from "@/components/editorial/Callout";
import {
  type JapaneseAddressForm,
  JAPANESE_ADDRESS_DEFAULTS,
  formatDeliveryLabelAddress,
  formatEnglishFriendlyAddress,
  formatJapaneseAddress,
  japaneseAddressFormEqual,
  normalizeJapaneseAddressQueryString,
  parseJapaneseAddressSearchParams,
  serializeJapaneseAddressQuery,
} from "@/lib/japanese-address-formatter";
import { siteUrl } from "@/lib/site";

const controlLabel =
  "mb-2 block font-sans text-xs font-bold uppercase tracking-widest text-rust";

const textInputClass =
  "w-full min-h-[2.75rem] rounded-md border border-paper-edge bg-paper px-3 py-2.5 font-sans text-sm text-dark placeholder:text-muted/80 focus:border-maroon/40 focus:outline-none focus:ring-1 focus:ring-maroon/25";

const actionBtn =
  "inline-flex min-h-[2.5rem] flex-1 items-center justify-center rounded-md border border-paper-edge bg-paper-elevated/90 px-3 py-2 font-sans text-xs font-bold uppercase tracking-widest text-dark transition-colors duration-150 hover:border-rust/45 hover:bg-paper sm:text-[0.7rem]";

const outputBoxClass =
  "min-h-[6rem] w-full whitespace-pre-wrap rounded-md border border-paper-edge bg-paper/90 px-3 py-3 font-sans text-sm leading-relaxed text-dark shadow-inner";

function JapaneseAddressFormatterClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [form, setForm] = useState<JapaneseAddressForm>(() => ({
    ...JAPANESE_ADDRESS_DEFAULTS,
  }));

  const serialized = useMemo(
    () => serializeJapaneseAddressQuery(form),
    [form],
  );

  useLayoutEffect(() => {
    const next = parseJapaneseAddressSearchParams(searchParams);
    setForm((prev) => (japaneseAddressFormEqual(prev, next) ? prev : next));
  }, [searchParams]);

  useEffect(() => {
    const urlNorm = normalizeJapaneseAddressQueryString(
      searchParams.toString(),
    );
    if (serialized === urlNorm) return;
    router.replace(
      serialized ? `${pathname}?${serialized}` : pathname,
      { scroll: false },
    );
  }, [serialized, searchParams, pathname, router]);

  const jaOut = useMemo(() => formatJapaneseAddress(form), [form]);
  const enOut = useMemo(() => formatEnglishFriendlyAddress(form), [form]);
  const deliveryOut = useMemo(
    () => formatDeliveryLabelAddress(form),
    [form],
  );

  const shareUrl = useMemo(() => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : siteUrl();
    const base = `${origin}${pathname}`;
    return serialized ? `${base}?${serialized}` : base;
  }, [pathname, serialized]);

  const updateField = useCallback(
    (key: keyof JapaneseAddressForm, value: string) => {
      setForm((f) => ({ ...f, [key]: value }));
    },
    [],
  );

  const clearForm = useCallback(() => {
    setForm({ ...JAPANESE_ADDRESS_DEFAULTS });
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const [copied, setCopied] = useState<
    "ja" | "en" | "delivery" | "link" | null
  >(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCopiedSoon = useCallback(() => {
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => {
      setCopied(null);
      copiedTimer.current = null;
    }, 2200);
  }, []);

  const copyText = useCallback(
    async (text: string, kind: "ja" | "en" | "delivery" | "link") => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(kind);
        clearCopiedSoon();
      } catch {
        setCopied(null);
      }
    },
    [clearCopiedSoon],
  );

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_min(100%,22rem)] lg:items-start lg:gap-10 xl:gap-12">
        <div className="min-w-0 space-y-10">
          <section
            className="rounded-lg border border-paper-edge bg-paper-card/80 p-5 shadow-editorial sm:p-7"
            aria-labelledby="addr-inputs-heading"
          >
            <h2
              id="addr-inputs-heading"
              className="editorial-heading mb-6 text-2xl sm:text-3xl"
            >
              Address fields
            </h2>
            <p className="article-body-sm mb-6 text-muted">
              Type in Japanese or romaji as needed. The tool trims spaces and
              builds three copy-ready layouts. Nothing is sent to a server.
            </p>

            <div className="space-y-6">
              <div>
                <label className={controlLabel} htmlFor="addr-postal">
                  Postal code
                </label>
                <input
                  id="addr-postal"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  className={textInputClass}
                  placeholder="e.g. 1600022 or 160-0022"
                  value={form.postalCode}
                  onChange={(e) =>
                    updateField("postalCode", e.target.value)
                  }
                />
              </div>
              <div>
                <label className={controlLabel} htmlFor="addr-pref">
                  Prefecture
                </label>
                <input
                  id="addr-pref"
                  type="text"
                  className={textInputClass}
                  placeholder="e.g. 東京都"
                  value={form.prefecture}
                  onChange={(e) =>
                    updateField("prefecture", e.target.value)
                  }
                />
              </div>
              <div>
                <label className={controlLabel} htmlFor="addr-city">
                  City / ward
                </label>
                <input
                  id="addr-city"
                  type="text"
                  className={textInputClass}
                  placeholder="e.g. 新宿区"
                  value={form.cityWard}
                  onChange={(e) => updateField("cityWard", e.target.value)}
                />
              </div>
              <div>
                <label className={controlLabel} htmlFor="addr-district">
                  District / town
                </label>
                <input
                  id="addr-district"
                  type="text"
                  className={textInputClass}
                  placeholder="e.g. 新宿"
                  value={form.districtTown}
                  onChange={(e) =>
                    updateField("districtTown", e.target.value)
                  }
                />
              </div>

              <fieldset className="min-w-0 rounded-md border border-paper-edge/80 bg-paper-elevated/40 p-4 sm:p-5">
                <legend className={controlLabel}>Chome / ban / go</legend>
                <p className="article-body-sm mb-4 text-muted">
                  Block numbers in Japanese addresses. Digits become
                  丁目番号 style in the Japanese line when all three are numeric.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label
                      className="mb-1.5 block font-sans text-xs font-semibold text-muted"
                      htmlFor="addr-chome"
                    >
                      Chome
                    </label>
                    <input
                      id="addr-chome"
                      type="text"
                      className={textInputClass}
                      inputMode="numeric"
                      value={form.chome}
                      onChange={(e) => updateField("chome", e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="mb-1.5 block font-sans text-xs font-semibold text-muted"
                      htmlFor="addr-ban"
                    >
                      Ban
                    </label>
                    <input
                      id="addr-ban"
                      type="text"
                      className={textInputClass}
                      inputMode="numeric"
                      value={form.ban}
                      onChange={(e) => updateField("ban", e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="mb-1.5 block font-sans text-xs font-semibold text-muted"
                      htmlFor="addr-go"
                    >
                      Go
                    </label>
                    <input
                      id="addr-go"
                      type="text"
                      className={textInputClass}
                      inputMode="numeric"
                      value={form.go}
                      onChange={(e) => updateField("go", e.target.value)}
                    />
                  </div>
                </div>
              </fieldset>

              <div>
                <label className={controlLabel} htmlFor="addr-bldg">
                  Building name
                </label>
                <input
                  id="addr-bldg"
                  type="text"
                  className={textInputClass}
                  placeholder="マンション or building name"
                  value={form.buildingName}
                  onChange={(e) =>
                    updateField("buildingName", e.target.value)
                  }
                />
              </div>
              <div>
                <label className={controlLabel} htmlFor="addr-room">
                  Room number
                </label>
                <input
                  id="addr-room"
                  type="text"
                  className={textInputClass}
                  placeholder="e.g. 101 or 101号室"
                  value={form.roomNumber}
                  onChange={(e) =>
                    updateField("roomNumber", e.target.value)
                  }
                />
              </div>
              <div>
                <label className={controlLabel} htmlFor="addr-name">
                  Recipient name
                </label>
                <input
                  id="addr-name"
                  type="text"
                  className={textInputClass}
                  autoComplete="name"
                  placeholder="Name as it should appear on the label"
                  value={form.recipientName}
                  onChange={(e) =>
                    updateField("recipientName", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" className={actionBtn} onClick={clearForm}>
                Clear form
              </button>
              <button
                type="button"
                className={actionBtn}
                onClick={() => copyText(shareUrl, "link")}
              >
                {copied === "link" ? "Link copied" : "Copy share link"}
              </button>
            </div>
          </section>

          <div className="max-w-2xl space-y-5">
            <Callout variant="mistake" title="Common address mistakes in Japan">
              <p>
                Mixing Western line order on a domestic Japanese form, skipping
                the chome/ban/go block, or guessing kanji for a building name you
                have not confirmed. Apartment names and room numbers often carry
                official spellings you should match exactly.
              </p>
            </Callout>
            <Callout
              variant="tip"
              title="When to use Japanese order vs English order"
            >
              <p>
                Use Japanese large-to-small order for domestic deliveries,
                hotel domestic address fields, and many government-style forms.
                Use English-friendly blocks when an international courier,
                airline, or bank abroad asks for a familiar top-down layout, or
                when you need your name on the first line for overseas labels.
              </p>
            </Callout>
          </div>
        </div>

        <aside className="min-w-0 space-y-6 lg:sticky lg:top-6">
          <section
            className="rounded-lg border border-paper-edge bg-paper-card/80 p-5 shadow-editorial sm:p-6"
            aria-labelledby="addr-outputs-heading"
          >
            <h2
              id="addr-outputs-heading"
              className="editorial-heading mb-4 text-xl text-dark sm:text-2xl"
            >
              Formatted output
            </h2>

            <div className="space-y-8">
              <div>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
                    Japanese format
                  </h3>
                  <button
                    type="button"
                    className="font-sans text-xs font-bold uppercase tracking-widest text-maroon underline decoration-maroon/35 underline-offset-2 hover:text-rust disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={!jaOut}
                    onClick={() => copyText(jaOut, "ja")}
                  >
                    {copied === "ja" ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className={outputBoxClass}>
                  {jaOut || "Add fields to preview the Japanese order layout."}
                </pre>
              </div>

              <div>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
                    English-friendly format
                  </h3>
                  <button
                    type="button"
                    className="font-sans text-xs font-bold uppercase tracking-widest text-maroon underline decoration-maroon/35 underline-offset-2 hover:text-rust disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={!enOut}
                    onClick={() => copyText(enOut, "en")}
                  >
                    {copied === "en" ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className={outputBoxClass}>
                  {enOut ||
                    "Add fields to preview the English-friendly block layout."}
                </pre>
              </div>

              <div>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
                    Delivery label format
                  </h3>
                  <button
                    type="button"
                    className="font-sans text-xs font-bold uppercase tracking-widest text-maroon underline decoration-maroon/35 underline-offset-2 hover:text-rust disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={!deliveryOut}
                    onClick={() => copyText(deliveryOut, "delivery")}
                  >
                    {copied === "delivery" ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className={outputBoxClass}>
                  {deliveryOut ||
                    "Add fields to preview a compact label-style stack."}
                </pre>
              </div>
            </div>

            <p className="article-body-sm mt-6 text-muted">
              This formatter only rearranges text you provide. It does not
              validate addresses against Japan Post data.
            </p>
          </section>

          <div className="rounded-lg border border-paper-edge bg-paper-elevated/80 p-5 shadow-inner sm:p-6">
            <h3 className="font-display text-lg font-bold text-dark">
              Quick links
            </h3>
            <ul className="mt-4 flex flex-col gap-2 font-sans text-sm font-semibold">
              <li>
                <Link
                  href="/tools"
                  className="text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  All tools →
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/start-here-japan"
                  className="text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Start here: Japan trip checklist →
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function FormatterFallback() {
  return (
    <div
      className="rounded-lg border border-paper-edge bg-paper-card/80 p-8 text-center shadow-editorial"
      aria-busy="true"
    >
      <p className="font-serif text-muted">Loading formatter…</p>
    </div>
  );
}

export function JapaneseAddressFormatter() {
  return (
    <Suspense fallback={<FormatterFallback />}>
      <JapaneseAddressFormatterClient />
    </Suspense>
  );
}
