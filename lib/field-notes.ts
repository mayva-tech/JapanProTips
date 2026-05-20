/**
 * Field Note editorial system: stable tone ids, default labels, and data
 * attributes for retrieval, snippets, or future tooling.
 *
 * Copy here and in UI defaults must avoid em dashes and en dashes.
 */

export const FIELD_NOTE_DATA_ATTR = "data-field-note" as const;
export const FIELD_NOTE_KIND_ATTR = "data-field-note-kind" as const;

export type FieldNoteTone =
  | "field"
  | "reality-check"
  | "local-habit"
  | "what-people-miss"
  | "operational-warning"
  | "seasonal"
  | "tourist-mistake"
  | "resident-learned";

export type FieldNoteToneMeta = {
  tone: FieldNoteTone;
  /** Default kicker shown when `label` prop is omitted */
  defaultLabel: string;
  /** BEM-style suffix for `field-note--*` classes */
  classSuffix: string;
};

export const FIELD_NOTE_TONE_ORDER: FieldNoteTone[] = [
  "field",
  "reality-check",
  "local-habit",
  "what-people-miss",
  "operational-warning",
  "seasonal",
  "tourist-mistake",
  "resident-learned",
];

export const FIELD_NOTE_TONES: Record<FieldNoteTone, FieldNoteToneMeta> = {
  field: {
    tone: "field",
    defaultLabel: "Field note",
    classSuffix: "field",
  },
  "reality-check": {
    tone: "reality-check",
    defaultLabel: "Reality check",
    classSuffix: "reality-check",
  },
  "local-habit": {
    tone: "local-habit",
    defaultLabel: "Local habit",
    classSuffix: "local-habit",
  },
  "what-people-miss": {
    tone: "what-people-miss",
    defaultLabel: "What people miss",
    classSuffix: "what-people-miss",
  },
  "operational-warning": {
    tone: "operational-warning",
    defaultLabel: "Operational warning",
    classSuffix: "operational-warning",
  },
  seasonal: {
    tone: "seasonal",
    defaultLabel: "Seasonal note",
    classSuffix: "seasonal",
  },
  "tourist-mistake": {
    tone: "tourist-mistake",
    defaultLabel: "Common tourist mistake",
    classSuffix: "tourist-mistake",
  },
  "resident-learned": {
    tone: "resident-learned",
    defaultLabel: "What residents learn",
    classSuffix: "resident-learned",
  },
};

export function isFieldNoteTone(value: string): value is FieldNoteTone {
  return (FIELD_NOTE_TONE_ORDER as readonly string[]).includes(value);
}
