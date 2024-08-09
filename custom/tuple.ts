/*
  ### 질문
  Tuple<T, N>으로, 타입 T의 길이 N만큼의 튜플(고정된 길이의 배열)을 생성하는 유틸리티 타입 만들기
*/

/* _____________ 여기에 코드 입력 _____________ */

type Tuple<
  T extends any,
  N extends number,
  R extends any[] = []
> = R["length"] extends N ? R : Tuple<T, N, [T, ...R]>;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

// @ts-expect-error
type errorCase1 = Tuple<string, "str">;

type cases = [
  Expect<Equal<Tuple<string, 0>, []>>,
  Expect<Equal<Tuple<number, 3>, [number, number, number]>>,
  Expect<Equal<Tuple<boolean, 2>, [boolean, boolean]>>,
  Expect<Equal<Tuple<any, 5>, [any, any, any, any, any]>>
];

/* _____________ 사용 사례 _____________ */
