import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "나의 에니어그램 결과",
  description:
    "당신의 에니어그램 성격 유형과 나와 닮은 성경 인물 결과를 확인하세요. 주 유형과 날개 유형을 통해 더 깊은 자기 이해를 시작해보세요.",
  openGraph: {
    title: "나의 에니어그램 결과 | OQ1",
    description:
      "당신의 에니어그램 성격 유형과 나와 닮은 성경 인물 결과를 확인하세요.",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "에니어그램 성경인물 테스트 결과 - OQ1",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "나의 에니어그램 결과 | OQ1",
    description:
      "당신의 에니어그램 성격 유형과 나와 닮은 성경 인물 결과를 확인하세요.",
    images: ["/opengraph.png"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
