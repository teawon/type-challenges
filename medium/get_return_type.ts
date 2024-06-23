/*
  2 - Get Return Type
  -------
  by Anthony Fu (@antfu) #보통 #infer #built-in

  ### 질문

  내장 제네릭 `ReturnType<T>`을 이를 사용하지 않고 구현하세요.

  예시:

  ```ts
  const fn = (v: boolean) => {
    if (v)
      return 1
    else
      return 2
  }

  type a = MyReturnType<typeof fn> // should be "1 | 2"
  ```

  > GitHub에서 보기: https://tsch.js.org/2/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type MyReturnType<T extends (...args: never[]) => any> = T extends (
  ...args: never[]
) => infer R
  ? R
  : never;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<string, MyReturnType<() => string>>>,
  Expect<Equal<123, MyReturnType<() => 123>>>,
  Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
  Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
  Expect<Equal<() => "foo", MyReturnType<() => () => "foo">>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>
];

type ComplexObject = {
  a: [12, "foo"];
  bar: "hello";
  prev(): number;
};

const fn = (v: boolean) => (v ? 1 : 2);
const fn1 = (v: boolean, w: any) => (v ? 1 : 2);

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/2/answer/ko
  > 정답 보기: https://tsch.js.org/2/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/

/* _____________ 개인 Study _____________ */

type MyReturnTypeFirstAnswer<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer U
  ? U
  : never;

/**
 *  1. never[] ?
 *    - never의 경우 모든 타입의 서브 타입이기 때문에 모든 타입에 할당 가능 (any와 같이 모든 타입을 받을 수 있다)
 *    - 위 문제와 같이 "인자를 전혀 신경 쓰지 않는다는 것을 명확하게 표현하는데 never를 사용"
 *    - 즉, 타입 체커에게 인자를 전혀 고려하지 않겠다는 의도를 명확히 전달할 수 있다.
 *
 *    https://github.com/type-challenges/type-challenges/issues/2
 */

type MyReturnType2<T extends Function> = T extends (...args: any) => infer U
  ? U
  : never;

/**
 *   2. T extends Function
 *    - Function의 경우 클래스도 허용하게 되므로, 아래의 케이스에서 오류가 발생하지 않는다
 *    - 즉, "함수" 데이터를 명확히 표현하기 위해 (...args : any) => <T extends (...args: never[]) => unknown> 이렇게 직접 명시하는 것.
 */

class MyClass {
  constructor() {}
}

// type Test = MyReturnType<typeof MyClass>; => 여기서 컴파일 오류가 안뜬다.
