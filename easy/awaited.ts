/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #쉬움 #promise #built-in

  ### 질문

  Promise와 같은 타입에 감싸인 타입이 있을 때, 안에 감싸인 타입이 무엇인지 어떻게 알 수 있을까요?

  예시: 들어 `Promise<ExampleType>`이 있을 때, `ExampleType`을 어떻게 얻을 수 있을까요?

  ```ts
  type ExampleType = Promise<string>

  type Result = MyAwaited<ExampleType> // string
  ```

  > 출처: [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)

  > GitHub에서 보기: https://tsch.js.org/189/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer U>
  ? U extends PromiseLike<any>
    ? MyAwaited<U>
    : U
  : never;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any }; // 이 부분 때문에 PromiseLike를 사용해야 한다.

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/189/answer/ko
  > 정답 보기: https://tsch.js.org/189/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/

/* _____________ 개인 Study _____________ */

/**
 * 1. PromiseLike?
 *   - PromiseLike는 ArrayLike와 마찬가지로 넓은 범위의 타입을 포함시키기 위해 만들어진 타입
 *   - Promise의 경우 초기 then만 있었으나, 향후 finally, catch 등이 추가
 *      - PromiseLike는 then만 있으며, 과거 라이브러리 호환성에 맞춰 then만 지원하는 타입도 포함할 수 있도록 정의되었음
 *      - 즉 then만 있어도 된다 -> PromiseLike (더 호환성이 높음)
 *      - then, catch, finally가 있어야 한다 -> Promise
 *
 *
 * 2. ArrayLike
 *    - Array의 경우 fill, find 등 다양한 메서드가 포함되어있음
 *    - ArrayLike는 배열와 인덱스 기반 접근만 가능하도록 정의된 타입
 *      - 유사 배열 객체도 포함하는 더 넓은 범위의 타입을 사용하고자 만들어짐
 */

interface ArrayLike<T> {
  readonly length: number;
  readonly [n: number]: T;
}

// 유사 배열 객체 예시1 - arguments 객체
function func1(a, b, c) {
  console.log(arguments[0]);
  // Expected output: 1

  console.log(arguments[1]);
  // Expected output: 2

  console.log(arguments[2]);
  // Expected output: 3
}
