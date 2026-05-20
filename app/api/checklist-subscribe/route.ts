import { NextResponse } from "next/server";
import { processChecklistCaptureRequest } from "@/lib/email-capture";

type SubscribeBody = {
  email?: string;
  downloadId?: string;
};

export async function POST(request: Request) {
  let body: SubscribeBody;
  try {
    body = (await request.json()) as SubscribeBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const result = await processChecklistCaptureRequest({
    downloadId: body.downloadId ?? "",
    email: body.email,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? "Request failed." },
      { status: 400 },
    );
  }

  return NextResponse.json(result);
}
