/*
  
  -------

  ### 질문
  T의 일부 필드를 필수로 만드는 RequiredSome<T, K>를 구현하기
  ```
*/

/* _____________ 여기에 코드 입력 _____________ */

type MyRequired<T, K extends keyof T> = {
  [P in K]-?: T[P];
};

type RequiredSome<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";
import { Simplify } from "../utils";

type User = {
  id: number;
  name?: string;
  age?: number;
};

type RequiredUser = {
  id: number;
  name: string;
  age?: number;
};

type cases = [
  Expect<Equal<Simplify<RequiredSome<User, "name">>, RequiredUser>>
];

/* _____________ 사용 사례 _____________ */

/**
 * Study
 */

type RequiredSome1<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: T[P];
};

//  -?매핑된 타입에서 선택적 속성을 필수 속성으로 변환하는데 사용되는 문법

type RequiredSome2<T, K extends keyof T> = Omit<T, K> &
  Required<{
    [P in K]: T[P];
  }>;

type RequiredSome3<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
