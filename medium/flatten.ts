/*
  459 - Flatten
  -------
  by zhouyiming (@chbro) #보통 #array

  ### 질문

  주어진 배열을 플랫한 배열 타입으로 바꾸는 Flatten 타입을 구현하세요.

  예시:

  ```ts
  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
  ```

  > GitHub에서 보기: https://tsch.js.org/459/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends any[]
    ? [...Flatten<First>, ...Flatten<Rest>]
    : [First, ...Flatten<Rest>]
  : [];

// 배열은 순회하면서 배열이면 Flatten에 넣고 아니면, 반환?
// 배열 순회는 어떻게 할까?

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<
    Equal<
      Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>,
      [{ foo: "bar"; 2: 10 }, "foobar"]
    >
  >
];

// @ts-expect-error
type error = Flatten<"1">;

/* _____________ study _____________ */

// 결국 타입 자체에서 반복문을 사용할 수 없으니, 각 원소를 하나씩 체크하며 재귀적으로 반복분을 순회한다.

/**
 * unknown vs any?
 * - unknown: any와 같이 모든 타입을 허용하지만, 사용 전 타입가드와 같이 실제 타입을 확인해야함 (더 엄격하다는데 사실 와닿지는 않음)
 *    - 특정 프로퍼티, 메소드, 인스턴스 생성과 같은 동작을 수행 시 타입에러가 발생해 타입을 보다 좁혀서 써야한다.
 */

/**
 * 실수했던 점
 *  - 스프레드 연산자ㅜㅜ [...Flatten<First>] -> 여기서 여러 개 인자를 충분히 가질 수 있으니, 스프레드로 풀어주자.
 *  - 그리고 스프레드를 안쓰면, 참조값 자체가 들어가서.. 원본 배열 변경에 대해 같이 바뀜
 */

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const mergedArray = [...arr1, ...arr2];

console.log(mergedArray); // [1, 2, 3, 4, 5, 6]

const arr1_ = [1, 2, 3];
const arr2_ = [4, 5, 6];
const nestedArray = [arr1, ...arr2];

console.log(nestedArray); // [[1, 2, 3], 4, 5, 6]
