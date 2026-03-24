import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://oq-1-enneagram-frontend.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "나에게 맞는 성경인물 - 에니어그램 성격 유형 검사",
    template: "%s | 에니어그램 성경인물 테스트",
  },
  description:
    "36문항으로 나의 에니어그램 성격 유형을 발견하고, 나와 닮은 성경 인물을 확인해보세요. RHETI 기반 5단계 척도 테스트.",
  keywords: [
    "에니어그램",
    "성격유형검사",
    "RHETI",
    "성경인물",
    "성격테스트",
    "enneagram",
    "OQ1",
    "자기이해",
    "심리검사",
  ],
  authors: [{ name: "OQ1" }],
  creator: "OQ1",
  publisher: "OQ1",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "에니어그램 성경인물 테스트",
    title: "나에게 맞는 성경인물 - 에니어그램 성격 유형 검사",
    description:
      "36문항으로 나의 에니어그램 성격 유형을 발견하고, 나와 닮은 성경 인물을 확인해보세요.",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "에니어그램 성경인물 테스트 - OQ1",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "나에게 맞는 성경인물 - 에니어그램 성격 유형 검사",
    description:
      "36문항으로 나의 에니어그램 성격 유형을 발견하고, 나와 닮은 성경 인물을 확인해보세요.",
    images: ["/opengraph.png"],
    creator: "@OQ1",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
