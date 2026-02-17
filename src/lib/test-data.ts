export interface Question {
  id: number;
  text: string;
  type: number; // 1-9 (에니어그램 타입)
}

export interface Response {
  questionId: number;
  score: number; // 1-5
}

export interface TestResult {
  scores: { [key: number]: number }; // type: total score
  mainType: number;
  wing: number;
}

// Reduced to 36 questions (4 per type) - most representative questions selected
export const QUESTIONS: Question[] = [
  // Type 1 - 개혁가 (Perfectionist, Principled)
  { id: 1, text: "나는 완벽해지기 위해서 많은 대가를 치른다고 느낀다.", type: 1 },
  { id: 2, text: "나는 실수하는 것 아주 싫어한다. 그래서 모든 것이 제대로 되게 하기 위해서 아주 철저하게 일을 하려고 한다.", type: 1 },
  { id: 3, text: "대체로 나는 옳은 것은 옳은 것이고 틀린 것은 틀린 것이라고 믿는다.", type: 1 },
  { id: 4, text: "내 머릿속에는 심판관이 있어서 나는 그와 함께 살고 있는 것 같다.", type: 1 },

  // Type 2 - 조력가 (Helper, Caring)
  { id: 5, text: "나는 사람에 대해서 순수한 관심을 갖기 때문에 남들의 희망, 꿈, 필요를 잘 이해하고 있다.", type: 2 },
  { id: 6, text: "나는 자신보다 다른 사람을 위해 더 많은 일을 한다.", type: 2 },
  { id: 7, text: "나는 사람들을 위해 많은 일을 한 것에 대해서 공치사하기를 좋아하지 않는다. 그러나 사람들이 그것을 알아차리지 못하고 무신경할 때 나는 큰 실망을 느낀다.", type: 2 },
  { id: 8, text: "나는 다른 사람들을 돌보느라고 기진맥진했을 때가 있다.", type: 2 },

  // Type 3 - 성취자 (Achiever, Success-oriented)
  { id: 9, text: "나는 스스로를 자신감 있는 사람이라고 여긴다. 어떤 일을 효율적으로 하지 못했을 때 나는 마음이 불편하다.", type: 3 },
  { id: 10, text: "나는 다른 사람들에게 나의 가장 좋은 모습을 보이려고 노력한다.", type: 3 },
  { id: 11, text: "다른 사람들이 내가 이룬 일을 인정하지 않을 때 마음이 아주 불편하다.", type: 3 },
  { id: 12, text: "나는 일 중독에 빠지는 경향이 있다. 어떤 일을 성취하고 있지 않으면 마음이 불안하다.", type: 3 },

  // Type 4 - 개인주의자 (Individualist, Unique)
  { id: 13, text: "많은 사람이 나를 알기 어렵고 모순된 면을 갖고 있는 사람이라고 생각한다. 그리고 나는 나의 그런 면이 좋다.", type: 4 },
  { id: 14, text: "나는 자신이 혼자이며 외롭다고 느낄 때가 많다. 가까운 사람과 함께 있을 때도 그렇다.", type: 4 },
  { id: 15, text: "나는 감정의 변화가 많다.", type: 4 },
  { id: 16, text: "나는 자신에게 집중하며 자신의 감정적 필요를 충족시키는 것을 아주 중요하게 생각한다.", type: 4 },

  // Type 5 - 탐구자 (Investigator, Observer)
  { id: 17, text: "나는 어떤 문제에 대해서 깊이 파고들기를 좋아한다. 그래서 가능한 완전히 그것에 대해 알아낸다.", type: 5 },
  { id: 18, text: "나는 많은 사람들이 나의 세계로 들어오는 것을 허용하지 않는 극단적으로 사적인 사람이다.", type: 5 },
  { id: 19, text: "나는 문제를 해결해야 할 상황에서는 혼자 일하는 것을 더 좋아한다.", type: 5 },
  { id: 20, text: "나는 호기심이 많으며 어떤 일이든 왜 그런 방식으로 이루어지는지 탐구하기를 좋아한다.", type: 5 },

  // Type 6 - 충실한 사람 (Loyalist, Anxious)
  { id: 21, text: "내가 실수했을 때 모든 사람이 나를 공격할까 봐 두렵다.", type: 6 },
  { id: 22, text: "나는 사람들을 신뢰하고 싶다. 그러나 다른 사람들의 동기가 의심스러울 때가 많다.", type: 6 },
  { id: 23, text: "나는 결정을 내리는 것을 좋아하지 않는다. 그러나 다른 사람이 내 일을 결정해 주는 것도 좋아하지 않는다.", type: 6 },
  { id: 24, text: "나는 불안해 할 때가 아주 많다.", type: 6 },

  // Type 7 - 열정적인 사람 (Enthusiast, Adventurous)
  { id: 25, text: "나는 여행하는 것, 여러 가지 음식을 맛보는 것, 사람들을 만나는 경험을 좋아한다. 그런 것을 할 때 나는 삶이 아주 근사하게 느껴진다.", type: 7 },
  { id: 26, text: "나에게 중요한 것은 편안함과 안전함보다는 흥미진진함과 다양성이다.", type: 7 },
  { id: 27, text: "내가 가장 견딜 수 없는 것은 지루함이다. 나는 결코 지루한 적이 없다.", type: 7 },
  { id: 28, text: "나는 호기심과 모험심이 많다. 그래서 무엇이든지 흥미롭고 새로운 것을 시도하기를 좋아한다.", type: 7 },

  // Type 8 - 도전하는 사람 (Challenger, Powerful)
  { id: 29, text: "나는 아주 독립적이다. 나는 남에게 의존하는 것을 좋아하지 않는다.", type: 8 },
  { id: 30, text: "난 약하고 우유부단한 사람들에 대한 동정심이 별로 없다. 약하면 문제를 일으킬 뿐이다.", type: 8 },
  { id: 31, text: "나는 의지가 강한 사람이다. 그래서 쉽게 포기하거나 주저앉지 않는다.", type: 8 },
  { id: 32, text: "나를 아는 사람들은 내가 직선적으로 마음을 표현하는 것을 좋아한다.", type: 8 },

  // Type 9 - 평화주의자 (Peacemaker, Harmonious)
  { id: 33, text: "나와 있으면 안전하다고 느끼기 때문에 사람들이 나를 좋아하는 것 같다.", type: 9 },
  { id: 34, text: "나는 내 뜻대로 조작하기보다는 일이 흘러가는 대로 내버려 두는 편이다.", type: 9 },
  { id: 35, text: "나는 다른 사람의 관점을 쉽게 이해할 수 있다. 나는 사람들에게 동의하지 않을 때보다는 동의할 때가 더 많다.", type: 9 },
  { id: 36, text: "대부분의 사람들은 쉽게 흥분한다. 그러나 나는 안정되고 침착한 편이다.", type: 9 },
];

// Shuffle questions using Fisher-Yates algorithm
export function shuffleQuestions(questions: Question[]): Question[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const TYPE_NAMES: { [key: number]: string } = {
  1: "개혁가",
  2: "조력가",
  3: "성취자",
  4: "개인주의자",
  5: "탐구자",
  6: "충실한 사람",
  7: "열정적인 사람",
  8: "도전하는 사람",
  9: "평화주의자",
};

export const TYPE_DESCRIPTIONS: { [key: number]: string } = {
  1: "원칙을 중시하고 완벽을 추구하는 당신은 높은 기준과 이상을 가진 사람입니다.",
  2: "따뜻하고 배려심 많은 당신은 다른 사람들을 돕고 지원하는 데서 기쁨을 찾습니다.",
  3: "성공 지향적이고 효율적인 당신은 목표를 달성하고 인정받는 것을 중요하게 여깁니다.",
  4: "창의적이고 감수성이 풍부한 당신은 자신만의 독특함과 깊이 있는 감정을 소중히 여깁니다.",
  5: "지적 호기심이 많고 분석적인 당신은 지식을 쌓고 이해하는 것을 좋아합니다.",
  6: "충성스럽고 책임감 있는 당신은 안정과 신뢰를 중요하게 생각합니다.",
  7: "낙천적이고 모험을 즐기는 당신은 다양한 경험과 즐거움을 추구합니다.",
  8: "강하고 결단력 있는 당신은 통제력과 정의를 중시하며 주도적으로 행동합니다.",
  9: "평화롭고 조화를 사랑하는 당신은 갈등을 피하고 편안한 환경을 만들어갑니다.",
};

export function calculateResult(responses: Response[]): TestResult {
  const scores: { [key: number]: number } = {};
  
  // Initialize scores
  for (let i = 1; i <= 9; i++) {
    scores[i] = 0;
  }
  
  // Calculate total scores for each type
  responses.forEach((response) => {
    const question = QUESTIONS.find((q) => q.id === response.questionId);
    if (question) {
      scores[question.type] += response.score;
    }
  });
  
  // Find main type (highest score)
  let mainType = 1;
  let maxScore = scores[1];
  
  for (let i = 2; i <= 9; i++) {
    if (scores[i] > maxScore) {
      maxScore = scores[i];
      mainType = i;
    }
  }
  
  // Calculate wing (neighbor with higher score)
  const getNeighbors = (type: number): [number, number] => {
    if (type === 1) return [9, 2];
    if (type === 9) return [8, 1];
    return [type - 1, type + 1];
  };
  
  const [left, right] = getNeighbors(mainType);
  const wing = scores[left] >= scores[right] ? left : right;
  
  return {
    scores,
    mainType,
    wing,
  };
}
