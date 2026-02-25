"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QUESTIONS, shuffleQuestions, calculateResult, Response } from "@/lib/test-data";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState(QUESTIONS);

  // Shuffle questions on mount
  useEffect(() => {
    setShuffledQuestions(shuffleQuestions(QUESTIONS));
  }, []);

  const currentQuestion = shuffledQuestions[currentIndex];
  const progress = ((currentIndex + 1) / shuffledQuestions.length) * 100;
  const currentResponse = responses.find((r) => r.questionId === currentQuestion.id);

  const handleScoreSelect = (score: number) => {
    const newResponses = responses.filter((r) => r.questionId !== currentQuestion.id);
    newResponses.push({ questionId: currentQuestion.id, score });
    setResponses(newResponses);
  };

  const canGoNext = currentResponse !== undefined;
  const canGoPrev = currentIndex > 0;

  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
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
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-2xl">
        <div className="space-y-6">
          {/* Progress Bar - Minimal Design */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{currentIndex + 1} / {shuffledQuestions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card - Clean & Minimal */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            {/* Question Text */}
            <div className="mb-8">
              <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                Q{currentIndex + 1}
              </div>
              <h2 className="text-lg md:text-xl font-normal leading-relaxed text-gray-900 dark:text-gray-100">
                {currentQuestion.text}
              </h2>
            </div>

            {/* MBTI-Style 5-Level Selection */}
            <div className="space-y-6">
              {/* Labels */}
              <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 px-1">
                <span>그렇다</span>
                <span>그렇지 않다</span>
              </div>

              {/* Horizontal Scale with Connection Line */}
              <div className="relative">
                {/* Connection Line */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700" />
                
                {/* Circles */}
                <div className="relative flex justify-between">
                  {[5, 4, 3, 2, 1].map((score) => {
                    // Define colors for each level
                    const getColorClasses = (score: number, isSelected: boolean) => {
                      if (isSelected) {
                        switch (score) {
                          case 5: return "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/50";
                          case 4: return "bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/50";
                          case 3: return "bg-gradient-to-br from-gray-500 to-slate-600 text-white shadow-lg shadow-gray-500/50";
                          case 2: return "bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/50";
                          case 1: return "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/50";
                        }
                      } else {
                        switch (score) {
                          case 5: return "bg-white dark:bg-gray-800 border-2 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 group-hover:border-green-400 group-hover:bg-green-50 dark:group-hover:bg-green-950/30";
                          case 4: return "bg-white dark:bg-gray-800 border-2 border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-300 group-hover:border-teal-400 group-hover:bg-teal-50 dark:group-hover:bg-teal-950/30";
                          case 3: return "bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 group-hover:border-gray-400 group-hover:bg-gray-50 dark:group-hover:bg-gray-900";
                          case 2: return "bg-white dark:bg-gray-800 border-2 border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300 group-hover:border-orange-400 group-hover:bg-orange-50 dark:group-hover:bg-orange-950/30";
                          case 1: return "bg-white dark:bg-gray-800 border-2 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 group-hover:border-red-400 group-hover:bg-red-50 dark:group-hover:bg-red-950/30";
                        }
                      }
                      return "";
                    };

                    return (
                    <button
                      key={score}
                      onClick={() => handleScoreSelect(score)}
                      className="flex flex-col items-center gap-3 group"
                    >
                      {/* Circle */}
                      <div
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-semibold text-base md:text-lg transition-all duration-200 relative z-10 ${
                          getColorClasses(score, currentResponse?.score === score)
                        } ${currentResponse?.score === score ? "scale-110" : "group-hover:scale-105"}`}
                      >
                        {currentResponse?.score === score && (
                          <Check className="w-6 h-6 md:w-7 md:h-7 stroke-[3]" />
                        )}
                      </div>
                      
                      {/* Label Below */}
                      {/* <span className={`text-xs text-center leading-tight max-w-[60px] transition-colors ${
                        currentResponse?.score === score
                          ? "text-indigo-600 dark:text-indigo-400 font-medium"
                          : "text-gray-500 dark:text-gray-400"
                      }`}>
                        {scaleLabels[score - 1]}
                      </span> */}
                    </button>
                  );
                  })}
                </div>
              </div>

              {/* Keyboard Hint - Mobile Hidden */}
              {/* <div className="text-center text-xs text-gray-400 dark:text-gray-500 hidden md:block">
                키보드 1-5로 빠르게 선택할 수 있습니다
              </div> */}
            </div>
          </div>

          {/* Navigation - Mobile Optimized */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrev}
              disabled={!canGoPrev}
              className="flex-1 max-w-[120px] h-12 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              이전
            </Button>
            
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
              <span className="font-medium text-indigo-600 dark:text-indigo-400">{responses.length}</span>
              <span className="mx-1">/</span>
              <span>{shuffledQuestions.length}</span>
            </div>
            
            <Button
              size="lg"
              onClick={handleNext}
              disabled={!canGoNext}
              className="flex-1 max-w-[120px] h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium"
            >
              {currentIndex < shuffledQuestions.length - 1 ? (
                <>
                  다음
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              ) : (
                "결과 보기"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
