import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Clock, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              에니어그램 테스트
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              나의 성격 유형을 발견하고 더 깊이 있는 자기 이해의 여정을 시작하세요
            </p>
          </div>

          {/* Main Card */}
          <Card className="mb-8 border-2 shadow-2xl">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">RHETI 에니어그램 검사</CardTitle>
              <CardDescription className="text-base">
                9가지 성격 유형 중 당신의 주 유형을 정밀하게 파악합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Info Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-indigo-50 dark:bg-indigo-950/30">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">135개 문항</h3>
                    <p className="text-sm text-muted-foreground">9개 유형별 15문항</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">20~30분</h3>
                    <p className="text-sm text-muted-foreground">예상 소요 시간</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-pink-50 dark:bg-pink-950/30">
                  <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">5점 척도</h3>
                    <p className="text-sm text-muted-foreground">리커트 척도 방식</p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-3 pt-4">
                <h3 className="font-semibold text-lg">테스트 방법</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    <span>각 문항을 읽고 자신에게 얼마나 적용되는지 1점(전혀 그렇지 않다)부터 5점(매우 그렇다)까지 선택하세요</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    <span>정답은 없으니 평소 자신의 모습을 떠올리며 솔직하게 답변해주세요</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    <span>모든 문항에 답변하시면 자동으로 주 유형과 날개 유형이 계산됩니다</span>
                  </li>
                </ul>
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <Link href="/test" className="block">
                  <Button size="lg" className="w-full text-lg h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    테스트 시작하기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <p className="text-center text-sm text-muted-foreground">
            이 테스트는 자기 이해를 돕기 위한 도구입니다. 결과는 참고용으로 활용해주세요.
          </p>
        </div>
      </div>
    </div>
  );
}

