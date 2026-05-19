export type GuideContentErrorCode = "NOT_FOUND" | "INVALID_FRONTMATTER";

export class GuideContentError extends Error {
  readonly code: GuideContentErrorCode;
  readonly slug: string;

  constructor(
    code: GuideContentErrorCode,
    slug: string,
    message: string,
  ) {
    super(message);
    this.name = "GuideContentError";
    this.code = code;
    this.slug = slug;
  }
}
