/*
  20 - Promise.all
  -------
  by Anthony Fu (@antfu) #medium #array #promise

  ### Question

  Type the function `PromiseAll` that accepts an array of PromiseLike objects, the returning value should be `Promise<T>` where `T` is the resolved result array.

  ```ts
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });

  // expected to be `Promise<[number, 42, string]>`
  const p = PromiseAll([promise1, promise2, promise3] as const)
  ```

  > View on GitHub: https://tsch.js.org/20
*/

/* _____________ Your Code Here _____________ */

declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<{
  [K in keyof T]: Awaited<T[K]>;
}>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3]);

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/20/answer
  > View solutions: https://tsch.js.org/20/solutions
  > More Challenges: https://tsch.js.org
*/

/* _____________ 개인 Study _____________ */

// 1. declear?

// getUserName 함수가 외부 라이브러리에서 제공됨
declare function getUserName(userId: number): string;

// 실제 사용 코드
const userId = 1;
const userName = getUserName(userId);
console.log(`User name is: ${userName}`);

/**
 * 함수가 실제 존재하나, 타입이 정의되지 않았을 때 (외부 라이브러리 등등) 정보를 타입스크립트에게 제공(실제 구현은 X)
 */

/**
 * 2. any[] + in keyof
 * - 배열에 적용 시 해당 인덱스에 해당하는 키들을 반복하는 타입을 생성함
 */
// 배열 타입 정의
type MyArray = [string, number, boolean];

// 배열의 각 인덱스를 키로, 해당 요소 타입을 값으로 하는 타입 정의
type ElementTypes = {
  [K in keyof MyArray]: MyArray[K];
};

// 결과 타입
// type ElementTypes = {
//   0: string;
//   1: number;
//   2: boolean;
// }

/**
 *  3. readonly 까먹지 말기..
 * /**
 *  readonly를 왜 붙여야하는가?
 *   -  readonly 키워드는 배열이나 튜플이 변경되지 않음을 나타냄
 *   -  readonly 배열은 수정 가능한 배열의 서브타입으로 간주된다. TypeScript에서는 readonly 배열을 수정 가능한 배열과 호환되도록 설계되어 있음
 */

/**
 * 4. Awaited
 * - Awaited는 Promise를 제거한 타입을 반환하는 유틸리티 타입
 */
