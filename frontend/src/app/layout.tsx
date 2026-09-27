import type { Metadata } from "next";
import { Merriweather, Source_Sans_3 } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteContent } from "@/lib/api";
import "./globals.css";

// Every page reads its content from Django on each request. This also keeps
// `next build` from calling the API, which isn't reachable during a Vercel build.
export const dynamic = "force-dynamic";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Oak Wellness",
    template: "%s | The Oak Wellness",
  },
  description:
    "The Oak Wellness is a private social work practice dedicated to strengthening individuals, families, children, adolescents, parents and employees through professional counselling, coaching and psychosocial support.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const content = await getSiteContent();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${merriweather.variable} ${sourceSans.variable} h-full scroll-pt-20 antialiased motion-safe:scroll-smooth`}
    >
      {/* Browser extensions (e.g. ColorZilla) add attributes to <body> before
          React loads; this ignores those attribute differences on <body> only. */}
      <body suppressHydrationWarning className="flex min-h-full flex-col font-sans">
        <MotionProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter content={content} />
        </MotionProvider>
      </body>
    </html>
  );
}
