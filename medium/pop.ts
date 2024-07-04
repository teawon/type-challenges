/*
  16 - Pop
  -------
  by Anthony Fu (@antfu) #medium #array

  ### Question

  > TypeScript 4.0 is recommended in this challenge

  Implement a generic `Pop<T>` that takes an Array `T` and returns an Array without it's last element.

  For example

  ```ts
  type arr1 = ['a', 'b', 'c', 'd']
  type arr2 = [3, 2, 1]

  type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
  type re2 = Pop<arr2> // expected to be [3, 2]
  ```

  **Extra**: Similarly, can you implement `Shift`, `Push` and `Unshift` as well?

  > View on GitHub: https://tsch.js.org/16
*/

/* _____________ Your Code Here _____________ */

type Pop<T extends any[]> = T extends []
  ? []
  : T extends [...infer U, any]
  ? U
  : never;
// type Pop<T extends any[]> = T extends [...infer U, any] ? U : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<["a", "b", "c", "d"]>, ["a", "b", "c"]>>,
  Expect<Equal<Pop<[]>, []>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/16/answer
  > View solutions: https://tsch.js.org/16/solutions
  > More Challenges: https://tsch.js.org
*/

/* _____________ 개인 Study _____________ */

/**
 * 1. 초기 풀이 : type Pop<T extends any[]> = T extends [...infer U, any] ? U : never;
 * 
 * - T가 빈 배열인 경우를 고려하지 않았다.

   2. 빈 배열에 대한 예외처리 로직 작성 -> type Pop<T extends any[]> = T extends [] ? [] : T extends [...infer U, any] ? U : never;

   3. 다른 답 참고) never가 나오는 상황(빈 배열)에서 []를 반환하도록 처리 -> type Pop<T extends any[]> = T extends [...infer U, any] ? U : [];
 */
