/*
  599 - Merge
  -------
  by ZYSzys (@ZYSzys) #보통 #object

  ### 질문

  두개의 타입을 새로운 타입으로 병합하세요.
  두번째 타입의 Key가 첫번째 타입을 덮어씁니다(재정의합니다)

  예시:

  ```ts
  type foo = {
    name: string
    age: string
  }
  type coo = {
    age: number
    sex: string
  }

  type Result = Merge<foo, coo> // expected to be {name: string, age: number, sex: string}
  ```

  > GitHub에서 보기: https://tsch.js.org/599/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type Merge<F, S> = Omit<F, keyof S> & S;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";
import { Simplify } from "../utils";

type Foo = {
  a: number;
  b: string;
};
type Bar = {
  b: number;
  c: boolean;
};
type debug1 = Merge<Foo, Bar>;
type debug = Simplify<Merge<Foo, Bar>>;

const A: debug1 = {
  a: 1,
  b: 1,
  c: true,
};

const B: debug = {
  a: 1,
  b: 1,
  c: true,
};

/* _____________ study _____________ */
/*
  왜 Simplify를 사용해야하지..??
*/
