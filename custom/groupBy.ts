/*
  -------

  ### 질문
  배열의 요소들을 주어진 키 함수에 따라 그룹화하는 `groupBy` 함수를 구현하세요. 
  결과는 각 그룹 키를 기준으로 배열을 갖는 객체 형태로 반환되어야 합니다.

  **사용 예시**

  ```typescript
  type User = {
    id: number;
    name: string;
    age: number;
  };

  const users: User[] = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 30 },
  ];

  const groupedByAge = groupBy(users, user => user.age);
  // 예상 결과: 
  // {
  //   25: [{ id: 2, name: 'Bob', age: 25 }],
  //   30: [
  //     { id: 1, name: 'Alice', age: 30 },
  //     { id: 3, name: 'Charlie', age: 30 },
  //   ],
  // }


/* _____________ 여기에 코드 입력 _____________ */

const groupBy = <
  T extends unknown[],
  GroupKey extends string | number | symbol
>(
  arr: T,
  key: (item: T[number]) => GroupKey
) => {
  const res = {} as Record<GroupKey, T[number][]>;
  arr.forEach((item) => {
    const groupKey = key(item);
    if (res[groupKey]) {
      res[groupKey].push(item);
    } else {
      res[groupKey] = [item];
    }
  });
  return res;
};

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type User = {
  id: number;
  name: string;
  age: number;
};

const users: User[] = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bob", age: 25 },
  { id: 3, name: "Charlie", age: 30 },
];

const groupedByAge = groupBy(users, (user) => user.age);

type cases = [
  Expect<Equal<(typeof groupedByAge)[25], User[]>>, // 25세 그룹이 배열로 존재
  Expect<Equal<(typeof groupedByAge)[30], User[]>> // 30세 그룹이 배열로 존재
];

/* _____________ 다음 단계 _____________ */
/*
    > 정답 공유하기: https://tsch.js.org/43/answer/ko
    > 정답 보기: https://tsch.js.org/43/solutions
    > 다른 문제들: https://tsch.js.org/ko
  */

/**
 * Study
 *
 *   const res = {} as Record<GroupKey, T[]>;
 *   -> 'unknown[]' 형식은 'T' 형식에 할당할 수 없습니다.
 *      - T는 unknown타입. 실제 들어와야 하는 값은, item의 타입이여야 한다.
 *      - item의 경우 T배열의 요소 타입임을 나타내기 위해 T[number]로 처리해야함
 *
 *
 * 정리 : T[number] - 특정 배열 T에 대해, T 배열의 요소 타입임을 의미
 */
