"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TYPE_NAMES, TYPE_DESCRIPTIONS } from "@/lib/test-data";
import { Award, Target, TrendingUp, Home, Share2 } from "lucide-react";

function ResultContent() {
  const searchParams = useSearchParams();
  const mainType = parseInt(searchParams.get("main") || "1");
  const wing = parseInt(searchParams.get("wing") || "2");
  const scoresString = searchParams.get("scores") || "{}";
  const scores = JSON.parse(scoresString);

  const mainTypeName = TYPE_NAMES[mainType];
  const wingTypeName = TYPE_NAMES[wing];
  const description = TYPE_DESCRIPTIONS[mainType];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              테스트 완료!
            </h1>
            <p className="text-xl text-muted-foreground">
              당신의 에니어그램 성격 유형을 확인하세요
            </p>
          </div>

          {/* Main Result Card */}
          <Card className="shadow-2xl border-2">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-xl">
              <div className="space-y-2">
                <CardDescription className="text-indigo-100">
                  당신의 주 유형은
                </CardDescription>
                <CardTitle className="text-4xl md:text-5xl font-bold">
                  {mainType}번 유형 - {mainTypeName}
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
                  <h3 className="font-semibold text-lg">유형 설명</h3>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Scores Grid */}
          <Card className="shadow-xl border-2">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <CardTitle>유형별 점수</CardTitle>
              </div>
              <CardDescription>
                각 유형별로 받은 점수입니다 (최소 15점 ~ 최대 75점)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(scores)
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .map(([type, score]) => {
                    const typeNum = parseInt(type);
                    const percentage = ((score as number) / 75) * 100;
                    const isMain = typeNum === mainType;
                    const isWing = typeNum === wing;

                    return (
                      <div key={type} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">
                              {type}번 - {TYPE_NAMES[typeNum]}
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
                          <span className="font-bold text-lg">{score}점</span>
                        </div>
                        <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all rounded-full ${
                              isMain
                                ? "bg-gradient-to-r from-indigo-500 to-purple-600"
                                : isWing
                                ? "bg-gradient-to-r from-purple-400 to-pink-500"
                                : "bg-gray-300 dark:bg-gray-600"
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="flex-1">
              <Button variant="outline" size="lg" className="w-full">
                <Home className="w-4 h-4 mr-2" />
                처음으로
              </Button>
            </Link>
            <Button
              size="lg"
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              onClick={() => {
                const url = window.location.href;
                navigator.clipboard.writeText(url);
                alert("결과 URL이 복사되었습니다!");
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              결과 공유하기
            </Button>
          </div>

          {/* Footer Note */}
          <p className="text-center text-sm text-muted-foreground">
            에니어그램은 자기 이해와 성장을 위한 도구입니다. 이 결과를 바탕으로 자신을 더 깊이 탐구해보세요.
          </p>
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
