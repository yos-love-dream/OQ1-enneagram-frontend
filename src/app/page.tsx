import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Clock, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
              에니어그램 테스트
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400">
              나의 성격 유형을 발견하고<br />더 깊이 있는 자기 이해의 여정을 시작하세요
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 mb-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  RHETI 에니어그램 검사
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  9가지 성격 유형 중 당신의 주 유형을 파악합니다
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">36개</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">문항</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">5~10분</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">소요시간</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <TrendingUp className="w-5 h-5 text-pink-600 dark:text-pink-400 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">5점</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">척도</div>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-3 pt-2">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">테스트 방법</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 mt-0.5">•</span>
                    <span>각 문항을 읽고 자신에게 얼마나 적용되는지 5단계로 선택하세요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 mt-0.5">•</span>
                    <span>정답은 없으니 평소 자신의 모습을 떠올리며 솔직하게 답변해주세요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 mt-0.5">•</span>
                    <span>모든 문항에 답변하시면 자동으로 주 유형과 날개 유형이 계산됩니다</span>
                  </li>
                </ul>
              </div>

              {/* CTA Button */}
              <Link href="/test" className="block pt-2">
                <Button 
                  size="lg" 
                  className="w-full h-14 text-base bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl"
                >
                  테스트 시작하기
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            이 테스트는 자기 이해를 돕기 위한 도구입니다. 결과는 참고용으로 활용해주세요.
          </p>
        </div>
      </div>
    </div>
  );
}

