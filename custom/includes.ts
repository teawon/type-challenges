/*
  -------

  ### 질문
  배열에 특정 값이 포함되어 있는지 확인

 
/* _____________ 여기에 코드 입력 _____________ */

const includes = <T>(arr: T[], target: T): target is T => {
  return arr.includes(target);
};

const SUBJECT = {
  ENGLISH: "english",
  MATH: "math",
  SCIENCE: "science",
} as const;

type SubjectType = (typeof SUBJECT)[keyof typeof SUBJECT];
const SUBJECTS: SubjectType[] = Object.values(SUBJECT);

console.log(includes(SUBJECTS, SUBJECT.ENGLISH)); // true
console.log(includes(SUBJECTS, "physics")); // false
