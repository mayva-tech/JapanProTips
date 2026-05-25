/**
 * Tool form selection chips.
 * Unselected: cream bg (#F9F9F5), dark text, light border.
 * Selected: beige bg (#EBE0DA), mahogany text and border (#6D2E1E).
 */

const off =
  "rounded-md border border-tool-border-off bg-tool-off text-dark transition-colors duration-150 hover:border-tool-border-off/80";

const on =
  "rounded-md border border-tool-ink bg-tool-on text-tool-ink transition-colors duration-150";

/** Shared chip label type (Japan trip budget calculator baseline). */
export const toolChipTypography = "font-sans text-sm font-semibold";

export function toolSegmentClass(selected: boolean, layout: string): string {
  return `${selected ? on : off} ${layout}`.trim();
}

export function toolCheckboxClass(selected: boolean, layout: string): string {
  return `${selected ? on : off} ${layout}`.trim();
}

/** Label wrapping a native checkbox; selected via :has(:checked). */
export const toolCheckboxLabelClass = [
  off,
  toolChipTypography,
  "has-[:checked]:border-tool-ink",
  "has-[:checked]:bg-tool-on",
  "has-[:checked]:text-tool-ink",
  "[&:has(:checked)_input]:accent-tool-ink",
].join(" ");

export const toolSegmentLayout = `px-3 py-2.5 text-left ${toolChipTypography} sm:min-w-0 sm:flex-1`;

/** Horizontal chip row (all breakpoints); avoids a fixed two-column grid on desktop. */
export const toolSegmentScrollWrap =
  "flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [-webkit-overflow-scrolling:touch]";

export const toolScrollSegmentLayout = `shrink-0 min-h-[44px] whitespace-nowrap px-3 py-2.5 text-left ${toolChipTypography}`;

/** @deprecated Use toolScrollSegmentLayout */
export const toolPlannerSegmentLayout = toolScrollSegmentLayout;

export const toolCheckboxRowLayout = `flex cursor-pointer items-center gap-2 ${toolChipTypography}`;

export const toolCheckboxRowLayoutSm = `flex cursor-pointer items-center gap-2 px-2.5 py-2 sm:px-3 sm:py-2.5 ${toolChipTypography}`;

export const toolCheckboxRowLayoutMd = `flex cursor-pointer items-center gap-3 px-3 py-2.5 ${toolChipTypography}`;

export const toolCheckboxAddonLayout = "flex cursor-pointer items-start gap-3";

export function toolCardPickerClass(selected: boolean): string {
  return [
    "flex w-full flex-col rounded-lg border p-4 text-left shadow-editorial transition-colors duration-150",
    toolChipTypography,
    selected
      ? "border-tool-ink bg-tool-on text-tool-ink"
      : "border-tool-border-off bg-tool-off text-dark hover:border-tool-border-off/80",
  ].join(" ");
}
