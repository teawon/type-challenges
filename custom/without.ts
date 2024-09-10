/*
  -------

  ### 질문
  주어진 배열에서 특정 값들을 제외한 새로운 배열을 제공하는 `without` 함수를 구현하세요.
  이 함수는 원본 배열을 수정하지 않고도, 주어진 값들을 제거한 새로운 배열을 반환해야 합니다.

  **사용 예시**

  ```typescript
  const nums = [1, 2, 1, 0, 3, 1, 4];

  // 1과 3을 제거한 새로운 배열을 얻습니다.
  const filteredNums = without(nums, 1, 3);
  // 예상 결과: [2, 0, 4]

  const letters = ['a', 'b', 'c', 'a'];

  // 'a'를 제거한 새로운 배열을 얻습니다.
  const filteredLetters = without(letters, 'a');
  // 예상 결과: ['b', 'c']

 */

/* _____________ 여기에 코드 입력 _____________ */

export function without<T>(array: T[], ...values: T[]): T[] {
  const valueSet = new Set(values);
  return array.filter((item) => valueSet.has(item));
}

import { Equal, Expect } from "@type-challenges/utils";

const array = [1, 2, 3, 4];
const array3 = without(array, 1, 2, 3);

// @ts-expect-error
const errorCase = without(array, "1", "2");

type cases = [Expect<Equal<typeof array3, number[]>>];
