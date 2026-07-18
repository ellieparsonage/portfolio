import { NextResponse, type NextRequest } from "next/server";

// Gate the handover guides behind the same login the editor uses.
//
// The editor (Keystatic, in GitHub mode) already requires a GitHub sign-in and
// sets one of these cookies once you're in. We reuse that session so /help is
// protected by exactly the same login, with nothing extra for Ellie to manage.
const SESSION_COOKIES = ["keystatic-gh-access-token", "keystatic-cloud-access-token"];

export function middleware(request: NextRequest) {
  // Local development stays completely open — no login needed to work on the
  // machine. Gating only applies to the deployed site, which runs in GitHub
  // storage mode, so this switches on by itself once the site is live.
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const signedIn = SESSION_COOKIES.some((name) => request.cookies.has(name));
  if (signedIn) {
    return NextResponse.next();
  }

  // Not signed in: send them to the editor, which shows the GitHub sign-in.
  const url = request.nextUrl.clone();
  url.pathname = "/keystatic";
  url.search = "";
  return NextResponse.redirect(url);
}

// Only the guides need this. The editor (/keystatic) gates itself via GitHub and
// must stay reachable so its own sign-in screen can load.
export const config = {
  matcher: ["/help", "/help/:path*"],
};
