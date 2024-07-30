/*
  2595 - PickByType
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  From `T`, pick a set of properties whose type are assignable to `U`.

  For Example

  ```typescript
  type OnlyBoolean = PickByType<{
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  }, boolean> // { isReadonly: boolean; isEnable: boolean; }
  ```

  > View on GitHub: https://tsch.js.org/2595
*/

/* _____________ Your Code Here _____________ */

import { Simplify } from "../utils";

type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

interface Model {
  name: string;
  count: number;
  isReadonly: boolean;
  isEnable: boolean;
}

type cases = [
  Expect<
    Equal<
      PickByType<Model, boolean>,
      { isReadonly: boolean; isEnable: boolean }
    >
  >,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>
];

/* _____________ study _____________ */

/**
 * 1. 초기 실수했던 코드
 * - 키를 순회하고, 해당 키에 대한 제약조건을 걸기 위해 as를 사용해야한다.
 */

// type Mistake<T, U> = {
//     [P in keyof T extends U ? P : never]: T[P];
//   };

/**
 * 2. Key매핑
 * - https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as
 */
