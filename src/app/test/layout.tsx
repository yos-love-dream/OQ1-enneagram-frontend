import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "테스트 진행 중",
  description:
    "36문항에 답하며 나의 에니어그램 성격 유형을 알아보세요. 각 문항을 솔직하게 답변할수록 정확한 결과를 얻을 수 있습니다.",
  openGraph: {
    title: "에니어그램 테스트 진행 중 | OQ1",
    description:
      "36문항에 답하며 나의 에니어그램 성격 유형을 알아보세요.",
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
    title: "에니어그램 테스트 진행 중 | OQ1",
    description: "36문항에 답하며 나의 에니어그램 성격 유형을 알아보세요.",
    images: ["/opengraph.png"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
