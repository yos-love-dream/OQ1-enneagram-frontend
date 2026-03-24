"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TYPE_NAMES } from "@/lib/test-data";
import { Target, TrendingUp, Home, Share2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const BIBLE_CHARACTERS: { [key: number]: { name: string; image: string } } = {
  1: { name: "모세", image: "/모세.png" },
  2: { name: "룻", image: "/룻.png" },
  3: { name: "사무엘", image: "/사무엘.png" },
  4: { name: "세례 요한", image: "/세례요한.png" },
  5: { name: "요셉", image: "/요셉.png" },
  6: { name: "이삭", image: "/이삭.png" },
  7: { name: "솔로몬", image: "/솔로몬.png" },
  8: { name: "다윗", image: "/다윗.png" },
  9: { name: "아브라함", image: "/아브라함.png" },
};

// ──────────────────────────────────────────────────────────
// Simple Markdown Renderer
// ──────────────────────────────────────────────────────────
function renderInline(text: string): React.ReactNode[] {
  // Handle bold+italic, bold, italic
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|_(.+?)_|\*(.+?)\*)/g;
  let last = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    if (match[2]) {
      parts.push(<strong key={key++}><em>{match[2]}</em></strong>);
    } else if (match[3]) {
      parts.push(<strong key={key++}>{match[3]}</strong>);
    } else if (match[4]) {
      parts.push(<em key={key++}>{match[4]}</em>);
    } else if (match[5]) {
      parts.push(<em key={key++}>{match[5]}</em>);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    parts.push(text.slice(last));
  }
  return parts;
}

function MarkdownContent({ markdown }: { markdown: string }) {
  const lines = markdown.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip the main H1 title (first line)
    if (line.startsWith("# ")) {
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      elements.push(
        <h2
          key={key++}
          className="text-xl font-bold mt-8 mb-3 text-indigo-700 dark:text-indigo-300 border-b border-indigo-100 dark:border-indigo-800 pb-1"
        >
          {renderInline(text)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      const text = line.slice(4).trim();
      elements.push(
        <h3
          key={key++}
          className="text-lg font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-200"
        >
          {renderInline(text)}
        </h3>
      );
      i++;
      continue;
    }

    // H4
    if (line.startsWith("#### ")) {
      const text = line.slice(5).trim();
      elements.push(
        <h4
          key={key++}
          className="text-base font-semibold mt-4 mb-1 text-gray-700 dark:text-gray-300"
        >
          {renderInline(text)}
        </h4>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote
          key={key++}
          className="border-l-4 border-indigo-400 dark:border-indigo-500 pl-4 py-1 my-4 italic text-gray-600 dark:text-gray-300 bg-indigo-50 dark:bg-indigo-950/30 rounded-r-lg"
        >
          {quoteLines.map((ql, qi) => (
            <p key={qi} className="mb-1 last:mb-0 leading-relaxed">
              {renderInline(ql)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="list-none space-y-2 my-4 pl-0">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 dark:bg-indigo-500 flex-shrink-0" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={key++} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div className="prose-custom">{elements}</div>;
}

// ──────────────────────────────────────────────────────────
// Radar Chart Component
// ──────────────────────────────────────────────────────────
interface RadarChartProps {
  scores: { [key: string]: number };
  mainType: number;
  wing: number;
}

function RadarChart({ scores, mainType, wing }: RadarChartProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = 110;
  const levels = 5; // concentric rings
  const maxScore = 20; // 4 questions × 5pt

  const types = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const n = types.length;

  // angle for each axis (start at top, clockwise)
  const angleFor = (i: number) => (2 * Math.PI * i) / n - Math.PI / 2;

  const polarToXY = (angle: number, r: number) => ({
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  });

  // grid polygon points for a given level (0..levels)
  const gridPolygon = (level: number) => {
    const r = (maxRadius * level) / levels;
    return types
      .map((_, i) => {
        const p = polarToXY(angleFor(i), r);
        return `${p.x},${p.y}`;
      })
      .join(" ");
  };

  // data polygon
  const dataPoints = types.map((type) => {
    const score = (scores[type.toString()] as number) ?? 0;
    const r = (Math.min(score, maxScore) / maxScore) * maxRadius;
    const p = polarToXY(angleFor(types.indexOf(type)), r);
    return p;
  });

  const dataPolygon = animated
    ? dataPoints.map((p) => `${p.x},${p.y}`).join(" ")
    : types
        .map((_, i) => {
          const p = polarToXY(angleFor(i), 0);
          return `${p.x},${p.y}`;
        })
        .join(" ");

  const labelOffset = 22;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      style={{  display: "block", margin: "0 auto", overflow: "auto" }}
    >
      {/* Grid rings */}
      {Array.from({ length: levels }).map((_, lvl) => (
        <polygon
          key={lvl}
          points={gridPolygon(lvl + 1)}
          fill={lvl % 2 === 0 ? "rgba(99,102,241,0.04)" : "rgba(99,102,241,0.08)"}
          stroke="rgba(99,102,241,0.2)"
          strokeWidth={0.8}
        />
      ))}

      {/* Grid spokes */}
      {types.map((_, i) => {
        const outer = polarToXY(angleFor(i), maxRadius);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={outer.x}
            y2={outer.y}
            stroke="rgba(99,102,241,0.2)"
            strokeWidth={0.8}
          />
        );
      })}

      {/* Score level labels (inner ring only) */}
      {[20, 40, 60, 80, 100].map((pct, i) => {
        const r = (maxRadius * (i + 1)) / levels;
        return (
          <text
            key={pct}
            x={cx + 3}
            y={cy - r + 4}
            fontSize={7}
            fill="rgba(99,102,241,0.5)"
          >
            {Math.round((maxScore * (i + 1)) / levels)}
          </text>
        );
      })}

      {/* Data polygon – animated */}
      <polygon
        points={dataPolygon}
        fill="rgba(99,102,241,0.25)"
        stroke="url(#radarGrad)"
        strokeWidth={2}
        style={{ transition: "points 0.9s cubic-bezier(0.34,1.56,0.64,1)" }}
      />

      {/* Data dots */}
      {dataPoints.map((p, i) => {
        const type = types[i];
        const isMain = type === mainType;
        const isWing = type === wing;
        return (
          <circle
            key={i}
            cx={animated ? p.x : cx}
            cy={animated ? p.y : cy}
            r={isMain ? 5 : isWing ? 4 : 3}
            fill={isMain ? "#6366f1" : isWing ? "#a855f7" : "#818cf8"}
            stroke="white"
            strokeWidth={1.5}
            style={{ transition: `cx 0.9s ease ${i * 0.04}s, cy 0.9s ease ${i * 0.04}s` }}
          />
        );
      })}

      {/* Axis labels */}
      {types.map((type, i) => {
        const angle = angleFor(i);
        const lp = polarToXY(angle, maxRadius + labelOffset);
        const name = BIBLE_CHARACTERS[type]?.name ?? TYPE_NAMES[type];
        const isMain = type === mainType;
        return (
          <text
            key={type}
            x={lp.x}
            y={lp.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={isMain ? 10 : 8.5}
            fontWeight={isMain ? "700" : "500"}
            fill={isMain ? "#6366f1" : "#64748b"}
          >
            {name}
          </text>
        );
      })}

      {/* Gradient def */}
      <defs>
        <linearGradient id="radarGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ──────────────────────────────────────────────────────────
// Animation helpers
// ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// ──────────────────────────────────────────────────────────
// Main result content
// ──────────────────────────────────────────────────────────
function ResultContent() {
  const searchParams = useSearchParams();
  const mainType = parseInt(searchParams.get("main") || "1");
  const wing = parseInt(searchParams.get("wing") || "2");
  const scoresString = searchParams.get("scores") || "{}";
  const scores = JSON.parse(scoresString) as { [key: string]: number };

  const mainTypeName = TYPE_NAMES[mainType];
  const wingTypeName = TYPE_NAMES[wing];
  const character = BIBLE_CHARACTERS[mainType];

  const [mdContent, setMdContent] = useState<string>("");
  const [mdLoading, setMdLoading] = useState(true);

  useEffect(() => {
    setMdLoading(true);
    fetch(`/result/type_${mainType}.md`)
      .then((res) => res.text())
      .then((text) => {
        setMdContent(text);
        setMdLoading(false);
      })
      .catch(() => {
        setMdLoading(false);
      });
  }, [mainType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* ── Bible Character Hero ── */}
          <motion.div
            className="text-center space-y-4"
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
          >
            <motion.div
              className="relative inline-block"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as const }}
            >
              <div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-indigo-300 dark:ring-indigo-600">
                <Image
                  src={character.image}
                  alt={character.name}
                  width={256}
                  height={256}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest">
                당신의 성경 속 인물
              </p>
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                {character.name}
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                {mainType}번 유형 · {mainTypeName}
              </p>
            </div>
          </motion.div>

          {/* ── Main Result Card with MD Content ── */}
          <motion.div
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
          >
            <Card className="shadow-2xl border-2 dark:border-gray-700 dark:bg-gray-900">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-xl">
                <div className="space-y-2">
                  <CardDescription className="text-indigo-100">
                    당신의 주 유형은
                  </CardDescription>
                  <CardTitle className="text-4xl md:text-5xl font-bold text-white">
                    {mainType}번 유형 - {character.name}
                  </CardTitle>
                  <CardDescription className="text-indigo-100 text-base">
                    날개 유형: {mainType}w{wing} ({wingTypeName})
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
                    <Target className="w-5 h-5" />
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">유형 설명</h3>
                  </div>
                  {mdLoading ? (
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
                    </div>
                  ) : (
                    <MarkdownContent markdown={mdContent} />
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ── Radar Chart Card ── */}
          <motion.div
            initial="hidden"
            animate="show"
            custom={2}
            variants={fadeUp}
          >
            <Card className="shadow-xl border-2 dark:border-gray-700 dark:bg-gray-900">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-gray-900 dark:text-gray-100">유형별 점수</CardTitle>
                </div>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  각 유형별로 받은 점수를 레이더 차트로 보여줍니다
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <RadarChart scores={scores} mainType={mainType} wing={wing} />

                {/* Legend */}
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">주유형</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">날개</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-indigo-300 inline-block" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">기타</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ── Scores Bar List ── */}
          <motion.div
            initial="hidden"
            animate="show"
            custom={3}
            variants={fadeUp}
          >
            <Card className="shadow-xl border-2 dark:border-gray-700 dark:bg-gray-900">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-gray-900 dark:text-gray-100">점수 상세</CardTitle>
                </div>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  각 유형별로 받은 점수입니다 (최소 4점 ~ 최대 20점)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(scores)
                    .sort(([, a], [, b]) => (b as number) - (a as number))
                    .map(([type, score], idx) => {
                      const typeNum = parseInt(type);
                      const percentage = ((score as number) / 20) * 100;
                      const isMain = typeNum === mainType;
                      const isWing = typeNum === wing;

                      return (
                        <motion.div
                          key={type}
                          className="space-y-2"
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.06, duration: 0.4, ease: "easeOut" }}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-800 dark:text-gray-100">
                                {type}번 - {BIBLE_CHARACTERS[typeNum]?.name ?? TYPE_NAMES[typeNum]}
                              </span>
                              {isMain && (
                                <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                                  주유형
                                </span>
                              )}
                              {isWing && (
                                <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-semibold">
                                  날개
                                </span>
                              )}
                            </div>
                            <span className="font-bold text-lg text-gray-900 dark:text-gray-100">{score}점</span>
                          </div>
                          <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                isMain
                                  ? "bg-gradient-to-r from-indigo-500 to-purple-600"
                                  : isWing
                                  ? "bg-gradient-to-r from-purple-400 to-pink-500"
                                  : "bg-gray-300 dark:bg-gray-600"
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ delay: 0.6 + idx * 0.06, duration: 0.6, ease: "easeOut" }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ── OQ-1 Signup CTA ── */}
          <motion.div
            initial="hidden"
            animate="show"
            custom={4}
            variants={fadeUp}
          >
            <Link
              href={`https://oq-1-sns-frontend.vercel.app/signup?enneagram-type=${mainType}w${wing}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                size="lg"
                className="w-full h-14 text-base bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                오큐완 앱 가입하러 가기
              </Button>
            </Link>
          </motion.div>

          {/* ── Actions ── */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial="hidden"
            animate="show"
            custom={5}
            variants={fadeUp}
          >
            <Link href="/" className="flex-1">
              <Button variant="outline" size="lg" className="w-full border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Home className="w-4 h-4 mr-2" />
                처음으로
              </Button>
            </Link>
            <Button
              size="lg"
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 py-2 text-white hover:from-indigo-700 hover:to-purple-700"
              onClick={() => {
                const url = window.location.href;
                navigator.clipboard.writeText(url);
                alert("결과 URL이 복사되었습니다!");
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              결과 공유하기
            </Button>
          </motion.div>

          {/* ── Footer Note ── */}
          <motion.p
            className="text-center text-sm text-gray-500 dark:text-gray-400"
            initial="hidden"
            animate="show"
            custom={6}
            variants={fadeUp}
          >
            에니어그램은 자기 이해와 성장을 위한 도구입니다. 이 결과를 바탕으로 자신을 더 깊이 탐구해보세요.
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}
