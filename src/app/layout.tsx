import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "에니어그램 테스트 - 성격 유형 검사",
  description: "9가지 성격 유형을 발견하세요. RHETI 에니어그램 135문항 테스트로 자신의 주 유형과 날개를 파악할 수 있습니다.",
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
      </body>
    </html>
  );
}
