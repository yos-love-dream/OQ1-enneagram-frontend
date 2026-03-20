"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, Clock, TrendingUp } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-lg mx-auto">

          {/* Header */}
          <div className="text-center mb-12 space-y-6">
            <motion.div
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as const }}
            >
              <Image
                src="/svgviewer-output.svg"
                alt="Bible Character Test Logo"
                width={120}
                height={120}
                priority
              />
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100"
              {...fadeUp(0.2)}
            >
              나에게 맞는 성경인물
            </motion.h1>
            <motion.p
              className="text-base text-gray-600 dark:text-gray-400"
              {...fadeUp(0.3)}
            >
              나의 성격 유형을 발견하고<br />더 깊이 있는 자기 이해의 여정을 시작하세요
            </motion.p>
          </div>

          {/* Main Card */}
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 mb-6"
            {...fadeUp(0.4)}
          >
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
                {[
                  { Icon: Brain, value: "36개", label: "문항", color: "text-indigo-600 dark:text-indigo-400", delay: 0.5 },
                  { Icon: Clock, value: "5~10분", label: "소요시간", color: "text-purple-600 dark:text-purple-400", delay: 0.6 },
                  { Icon: TrendingUp, value: "5점", label: "척도", color: "text-pink-600 dark:text-pink-400", delay: 0.7 },
                ].map(({ Icon, value, label, color, delay }) => (
                  <motion.div
                    key={label}
                    className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay, duration: 0.45, ease: "easeOut" }}
                  >
                    <Icon className={`w-5 h-5 ${color} mx-auto mb-2`} />
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{value}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Instructions */}
              <motion.div className="space-y-3 pt-2" {...fadeUp(0.75)}>
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
              </motion.div>

              {/* CTA Button */}
              <motion.div {...fadeUp(0.9)}>
                <Link href="/test" className="block pt-2">
                  <Button
                    size="lg"
                    className="w-full h-14 text-base bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl"
                  >
                    테스트 시작하기
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            className="text-center text-xs text-gray-500 dark:text-gray-400"
            {...fadeUp(1.0)}
          >
            이 테스트는 자기 이해를 돕기 위한 도구입니다. 결과는 참고용으로 활용해주세요.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
