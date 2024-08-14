import type { Equal, Expect } from "@type-challenges/utils";

// 1개 이상의 Promise를 자유롭게 인수로 나열하여 받고, Promise.all을 반환하는 함수를 작성하기

export const myPromiseAll = <T extends readonly any[]>(promises: [...T]) => {
  promises.push(Promise.resolve(42) as T[number]); // 임의의 Promise 추가
  return Promise.all(promises);
};

// Q. 여기서 readonly쓰나 마나 튜플 받아짐...

// Test cases
type cases = [
  // Test case 1: Array of number promises
  Expect<
    Equal<
      ReturnType<
        typeof myPromiseAll<[Promise<number>, Promise<number>, Promise<number>]>
      >,
      Promise<[number, number, number]>
    >
  >,

  // Test case 2: Array of string promises
  Expect<
    Equal<
      ReturnType<
        typeof myPromiseAll<[Promise<string>, Promise<string>, Promise<string>]>
      >,
      Promise<[string, string, string]>
    >
  >,

  // Test case 3: Mixed array of number and string promises
  Expect<
    Equal<
      ReturnType<
        typeof myPromiseAll<[Promise<number>, Promise<string>, Promise<number>]>
      >,
      Promise<[number, string, number]>
    >
  >,

  Expect<
    Equal<
      ReturnType<
        typeof myPromiseAll<[number, Promise<string>, Promise<number>]>
      >,
      Promise<[number, string, number]>
    >
  >
];

/* study */

/**
 * - [...T]
 *    - 전달된 인수의 타입을 가변 길이 튜플로 사용
 *    - 즉 각 인수의 타입을 "순서"대로 튜플에 저장해 타입스크립트가 추론할 수 있도록 함
 */

const numbers = [1, 2, 3] as const;

function foo(nums: readonly number[]) {
  // nums.push(4); // 오류 발생: readonly 매개변수는 변경할 수 없음
  return nums.reduce((sum, num) => sum + num, 0);
}

console.log(foo(numbers)); //

// 이전에도 언급했지만 readonly를 통해 튜플값도 받을 수 있게 처리할 수 있다.
// 또한 내부의 수정을 방지해 코드의 안정성을 높일 수 있음
