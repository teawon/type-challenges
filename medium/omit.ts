/*
  3 - Omit
  -------
  by Anthony Fu (@antfu) #보통 #union #built-in

  ### 질문

  `T`에서 `K` 프로퍼티만 제거해 새로운 오브젝트 타입을 만드는 내장 제네릭 `Omit<T, K>`를 이를 사용하지 않고 구현하세요.

  예시:

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false,
  }
  ```

  > GitHub에서 보기: https://tsch.js.org/3/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>,
  Expect<Equal<Expected3, MyOmit<Todo1, "description" | "completed">>>
];

// @ts-expect-error
type error = MyOmit<Todo, "description" | "invalid">;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Todo1 {
  readonly title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}

interface Expected3 {
  readonly title: string;
}

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/3/answer/ko
  > 정답 보기: https://tsch.js.org/3/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/

/* _____________ 개인 Study _____________ */

//1. 초기 실수했던 코드 분석

type MyOmitMiss<T, K extends keyof T> = {
  [P in T extends K ? never : K]: T[P];
};

// 1. T는 객체이므로, keyof를 사용해 속성을 추출해야한다. (K는 이미 속성의 유니온 값이 와서 햇갈림)

// 2. P in keyof T: T 타입의 각 키 P에 대해 반복

// 3. as P extends K ? never : P: 조건부 타입을 사용하여 P가 K에 포함되는지 확인

// as 키워드를 잘 사용하기.. P를 순회하는데, 이 P에 대한 조건을 추가하기 위해 "조건부 타입"으로써 사용
