/*
  -------

  ### 질문
  배열에서 `falsy`한 값 (`false`, `null`, `0`, `''`, `undefined`, `NaN`)을 제거하는 유틸리티 함수 `compact`를 구현하세요.
  `NotFalsey<T>` 타입을 활용하여 타입스크립트가 반환형을 추론하도록 하며, 타입 안전성을 유지합니다.

  **조건**:  
  - 입력된 배열은 원본 변경 없이, 모든 `falsy` 값을 제거한 새로운 배열을 반환해야 합니다.
  - 각 요소의 타입은 `NotFalsey<T>` 타입을 통해 보장되어야 합니다.

  **사용 예시**

  ```typescript
  const filtered = compact([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
  // expected output: [1, 2, 3, 4, 5]
*/

type NotFalsey<T> = Exclude<T, false | null | 0 | "" | undefined>;

export function compact<T>(arr: T[]): NotFalsey<T>[] {
  const result: NotFalsey<T>[] = [];

  for (const item of arr) {
    if (item) {
      result.push(item as NotFalsey<T>);
    }
  }

  return result;
}

/* _____________ Test Cases _____________ */
const userInput: (string | null | undefined)[] = [
  "0",
  "hello",
  "",
  "world",
  null,
  "typescript",
  undefined,
  "!",
  "",
];

const cleanUserInput = compact(userInput);

const result = cleanUserInput.map(
  // 사용자로부터 의미 있는 값만 뽑아서 문자열에 대한 특정 로직을 처리하고 싶다.
  // 각 str요소가 falsy하지 않은 값임을 보장하도록 유틸 함수를 구현하기
  (str) => str.charAt(0).toUpperCase() + str.slice(1)
);

// 출처 - https://github.com/toss/es-toolkit/blob/main/src/array/compact.ts

/**
 * study
 * - **falsy**인 값이란 Boolean 문맥에서 `false`로 평가되는 값
- `null`,`undefined`,`false`, `NaN`, `0`, `-0` , `0n`,`“”`
 */
