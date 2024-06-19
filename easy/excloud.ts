/*
  43 - Exclude
  -------
  by Zheeeng (@zheeeng) #쉬움 #built-in #union

  ### 질문

  `T`에서 `U`에 할당할 수 있는 타입을 제외하는 내장 제네릭 `Exclude<T, U>`를 이를 사용하지 않고 구현하세요.

  예시:

  ```ts
  type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
  ```

  > GitHub에서 보기: https://tsch.js.org/43/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type MyExclude<T, U> = T extends U ? never : T;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<MyExclude<"a" | "b" | "c", "a">, "b" | "c">>,
  Expect<Equal<MyExclude<"a" | "b" | "c", "a" | "b">, "c">>,
  Expect<
    Equal<MyExclude<string | number | (() => void), Function>, string | number>
  >
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/43/answer/ko
  > 정답 보기: https://tsch.js.org/43/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/

/* _____________ 개인 Study _____________ */

/**
 * 1. T가 유니온일 때 T extends U 형태를 사용한다면, T를 순회하며 U에 대한 조건을 적용한다 (마치 반복문)
      - Distributive Conditional Types 
         - https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
 */

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

// 'ArrOfStrOrNum' is no longer a union.
type ArrOfStrOrNum1 = ToArrayNonDist<string | number>;

type ArrOfStrOrNum = (string | number)[];

// 위 형태처럼 []로 묶으면 union처럼 동작하지 않는다.
