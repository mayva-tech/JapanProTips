export type JapaneseAddressForm = {
  postalCode: string;
  prefecture: string;
  cityWard: string;
  districtTown: string;
  chome: string;
  ban: string;
  go: string;
  buildingName: string;
  roomNumber: string;
  recipientName: string;
};

export const JAPANESE_ADDRESS_DEFAULTS: JapaneseAddressForm = {
  postalCode: "",
  prefecture: "",
  cityWard: "",
  districtTown: "",
  chome: "",
  ban: "",
  go: "",
  buildingName: "",
  roomNumber: "",
  recipientName: "",
};

const PARAM_BY_FIELD: Record<keyof JapaneseAddressForm, string> = {
  postalCode: "postal",
  prefecture: "pref",
  cityWard: "city",
  districtTown: "district",
  chome: "chome",
  ban: "ban",
  go: "go",
  buildingName: "bldg",
  roomNumber: "room",
  recipientName: "name",
};

function trimField(value: string): string {
  return value.trim();
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/** Display 7 digit postal as 123-4567; otherwise return trimmed original if non-empty. */
export function formatPostalHyphen(postalCode: string): string | null {
  const raw = trimField(postalCode);
  if (!raw) return null;
  const d = digitsOnly(raw);
  if (d.length === 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return raw;
}

function isAllDigits(value: string): boolean {
  return value.length > 0 && /^\d+$/.test(value);
}

/** Chome / ban / go line: use 丁目番号 when all numeric, else hyphen join. */
export function formatChomeBanGoBlock(form: JapaneseAddressForm): string {
  const ch = trimField(form.chome);
  const bn = trimField(form.ban);
  const g = trimField(form.go);
  if (!ch && !bn && !g) return "";
  if (isAllDigits(ch) && isAllDigits(bn) && isAllDigits(g)) {
    return `${ch}丁目${bn}番${g}号`;
  }
  return [ch, bn, g].filter(Boolean).join("-");
}

function formatBuildingRoomLine(form: JapaneseAddressForm): string {
  const b = trimField(form.buildingName);
  const r = trimField(form.roomNumber);
  if (b && r) {
    const roomSuffix = r.includes("号室") ? r : `${r}号室`;
    return `${b} ${roomSuffix}`.trim();
  }
  if (b) return b;
  if (r) return r.includes("号室") ? r : `${r}号室`;
  return "";
}

export function formatJapaneseAddress(form: JapaneseAddressForm): string {
  const f = {
    postalCode: trimField(form.postalCode),
    prefecture: trimField(form.prefecture),
    cityWard: trimField(form.cityWard),
    districtTown: trimField(form.districtTown),
    chome: trimField(form.chome),
    ban: trimField(form.ban),
    go: trimField(form.go),
    buildingName: trimField(form.buildingName),
    roomNumber: trimField(form.roomNumber),
    recipientName: trimField(form.recipientName),
  };

  const lines: string[] = [];
  const zip = formatPostalHyphen(f.postalCode);
  if (zip) lines.push(`〒${zip}`);

  const prefCity = `${f.prefecture}${f.cityWard}`;
  if (prefCity) lines.push(prefCity);

  const cbg = formatChomeBanGoBlock(form);
  const townLine = [f.districtTown, cbg].filter(Boolean).join("");
  if (townLine) lines.push(townLine);

  const buildingLine = formatBuildingRoomLine(form);
  if (buildingLine) lines.push(buildingLine);

  if (f.recipientName) lines.push(`${f.recipientName}様`);

  return lines.join("\n").trim();
}

export function formatEnglishFriendlyAddress(form: JapaneseAddressForm): string {
  const f = {
    postalCode: trimField(form.postalCode),
    prefecture: trimField(form.prefecture),
    cityWard: trimField(form.cityWard),
    districtTown: trimField(form.districtTown),
    chome: trimField(form.chome),
    ban: trimField(form.ban),
    go: trimField(form.go),
    buildingName: trimField(form.buildingName),
    roomNumber: trimField(form.roomNumber),
    recipientName: trimField(form.recipientName),
  };

  const lines: string[] = [];
  if (f.recipientName) lines.push(f.recipientName);

  const roomPart = f.roomNumber ? `Room ${f.roomNumber.replace(/\s*号室\s*$/u, "").trim()}` : "";
  const buildingParts = [roomPart, f.buildingName].filter(Boolean);
  if (buildingParts.length) lines.push(buildingParts.join(", "));

  const cbg = [f.chome, f.ban, f.go].filter(Boolean).join("-");
  const districtBlock = [f.districtTown, cbg].filter(Boolean).join(", ");
  if (districtBlock) lines.push(districtBlock);

  const cityLine = [f.cityWard, f.prefecture].filter(Boolean).join(", ");
  if (cityLine) lines.push(cityLine);

  const zip = formatPostalHyphen(f.postalCode);
  if (zip) lines.push(zip);
  if (lines.length > 0) lines.push("Japan");

  return lines.join("\n").trim();
}

export function formatDeliveryLabelAddress(form: JapaneseAddressForm): string {
  const f = {
    postalCode: trimField(form.postalCode),
    prefecture: trimField(form.prefecture),
    cityWard: trimField(form.cityWard),
    districtTown: trimField(form.districtTown),
    chome: trimField(form.chome),
    ban: trimField(form.ban),
    go: trimField(form.go),
    buildingName: trimField(form.buildingName),
    roomNumber: trimField(form.roomNumber),
    recipientName: trimField(form.recipientName),
  };

  const lines: string[] = [];
  if (f.recipientName) lines.push(f.recipientName);

  const zip = formatPostalHyphen(f.postalCode);
  if (zip) lines.push(`〒${zip}`);

  const prefCity = [f.prefecture, f.cityWard].filter(Boolean).join(" ");
  if (prefCity) lines.push(prefCity);

  const cbg = formatChomeBanGoBlock(form);
  const mid = [f.districtTown, cbg].filter(Boolean).join(" ");
  if (mid) lines.push(mid);

  const buildingLine = formatBuildingRoomLine(form);
  if (buildingLine) lines.push(buildingLine);

  return lines.join("\n").trim();
}

export function parseJapaneseAddressSearchParams(
  searchParams: Pick<URLSearchParams, "get">,
): JapaneseAddressForm {
  const read = (param: string) => searchParams.get(param) ?? "";
  const out: JapaneseAddressForm = { ...JAPANESE_ADDRESS_DEFAULTS };
  (Object.keys(PARAM_BY_FIELD) as (keyof JapaneseAddressForm)[]).forEach((key) => {
    out[key] = read(PARAM_BY_FIELD[key]);
  });
  return out;
}

export function serializeJapaneseAddressQuery(form: JapaneseAddressForm): string {
  const p = new URLSearchParams();
  (Object.keys(PARAM_BY_FIELD) as (keyof JapaneseAddressForm)[]).forEach((key) => {
    const v = trimField(form[key]);
    if (v) p.set(PARAM_BY_FIELD[key], v);
  });
  return p.toString();
}

export function normalizeJapaneseAddressQueryString(query: string): string {
  const parsed = parseJapaneseAddressSearchParams(new URLSearchParams(query));
  return serializeJapaneseAddressQuery(parsed);
}

export function japaneseAddressFormEqual(
  a: JapaneseAddressForm,
  b: JapaneseAddressForm,
): boolean {
  return (Object.keys(PARAM_BY_FIELD) as (keyof JapaneseAddressForm)[]).every(
    (key) => trimField(a[key]) === trimField(b[key]),
  );
}
