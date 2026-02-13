"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QUESTIONS, calculateResult, Response } from "@/lib/test-data";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;
  const currentResponse = responses.find((r) => r.questionId === currentQuestion.id);

  const handleScoreSelect = (score: number) => {
    const newResponses = responses.filter((r) => r.questionId !== currentQuestion.id);
    newResponses.push({ questionId: currentQuestion.id, score });
    setResponses(newResponses);
  };

  const canGoNext = currentResponse !== undefined;
  const canGoPrev = currentIndex > 0;

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate result and navigate to result page
      const result = calculateResult(responses);
      const params = new URLSearchParams({
        main: result.mainType.toString(),
        wing: result.wing.toString(),
        scores: JSON.stringify(result.scores),
      });
      router.push(`/result?${params.toString()}`);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Number keys 1-5 for score selection
      if (e.key >= "1" && e.key <= "5") {
        const score = parseInt(e.key);
        handleScoreSelect(score);
      }
      // Enter key to go to next question
      else if (e.key === "Enter" && canGoNext) {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, currentResponse, responses]);

  const scaleLabels = [
    "전혀 그렇지 않다",
    "거의 그렇지 않다",
    "어느 정도는 그렇다",
    "대체로 그렇다",
    "매우 그렇다",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>진행률</span>
              <span className="font-medium">
                {currentIndex + 1} / {QUESTIONS.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="shadow-xl border-2">
            <CardContent className="p-8 md:p-12 space-y-8">
              {/* Question Number & Text */}
              <div className="space-y-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-sm font-semibold">
                  질문 {currentIndex + 1}
                </div>
                <h2 className="text-xl md:text-2xl font-medium leading-relaxed">
                  {currentQuestion.text}
                </h2>
              </div>

              {/* Scale Selection */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-sm font-semibold text-muted-foreground text-center">
                    이 문장이 나에게 얼마나 적용되나요?
                  </h3>
                  <span className="text-xs text-muted-foreground/60">
                    (키보드 1-5)
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => handleScoreSelect(score)}
                      className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                        currentResponse?.score === score
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 shadow-lg scale-105"
                          : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl font-bold mb-2 ${
                          currentResponse?.score === score
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {score}
                      </div>
                      <span className="text-xs text-center text-muted-foreground leading-tight">
                        {scaleLabels[score - 1]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrev}
              disabled={!canGoPrev}
              className="min-w-28"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              이전
            </Button>
            <div className="text-sm text-muted-foreground">
              {responses.length} / {QUESTIONS.length} 답변 완료
            </div>
            <Button
              size="lg"
              onClick={handleNext}
              disabled={!canGoNext}
              className="min-w-28 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              {currentIndex < QUESTIONS.length - 1 ? (
                <>
                  다음
                  <ChevronRight className="w-4 h-4 ml-2" />
                  <span className="text-xs opacity-60 ml-1">(Enter)</span>
                </>
              ) : (
                <>
                  결과 보기
                  <span className="text-xs opacity-60 ml-1">(Enter)</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
