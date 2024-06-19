/*
  18 - Length of Tuple
  -------
  by sinoon (@sinoon) #쉬움 #tuple

  ### 질문

  배열(튜플)을 받아 길이를 반환하는 제네릭 `Length<T>`를 구현하세요.

  예시:

  ```ts
  type tesla = ['tesla', 'model 3', 'model X', 'model Y']
  type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

  type teslaLength = Length<tesla>  // expected 4
  type spaceXLength = Length<spaceX> // expected 5
  ```

  > GitHub에서 보기: https://tsch.js.org/18/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type Length<T extends readonly any[]> = T["length"];

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

const tesla = ["tesla", "model 3", "model X", "model Y"] as const;
const spaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT",
] as const;

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<"hello world">
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/18/answer/ko
  > 정답 보기: https://tsch.js.org/18/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/

/* _____________ 개인 Study _____________ */

/**
 * 1. readonly를 왜 붙여야하는가?
 *   -  readonly 키워드는 배열이나 튜플이 변경되지 않음을 나타냄
 *   -  readonly 배열은 수정 가능한 배열의 서브타입으로 간주된다. TypeScript에서는 readonly 배열을 수정 가능한 배열과 호환되도록 설계되어 있음
 */

// Q. 만약 수정 가능한 배열에 대해서만 뭔가 처리하고싶다면..? -> extends를 사용해 직접 분기처리

type IsMutableArray<T> = T extends readonly any[] ? never : T;

type Length_<T extends any[]> = IsMutableArray<T> extends never
  ? never
  : T["length"];
