/*
  
  -------

  ### 질문
  주어진 두 객체 타입 `T`와 `U`에서 `U`의 키와 값을 `T`의 동일한 키에 덮어쓰는 `OverWrite<T, U>` 타입을 구현하세요.
  결과로 새로운 객체 타입을 반환해야 하며, `U`의 키와 값이 `T`에 우선합니다.
  ```
*/

/* _____________ 여기에 코드 입력 _____________ */

type OverWrite<T, U> = Omit<T, keyof U> & U;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";
import { Simplify } from "../utils";

type User = {
  id: number;
  name: string;
  age: number;
};

type UpdateInfo = {
  name: string;
  age?: number;
  email?: string;
};

type UpdatedUser = {
  id: number;
  name: string; // 덮어 씌워짐
  age?: number; // 덮어 씌워짐
  email?: string; // 추가된 필드
};

type cases = [
  Expect<Equal<Simplify<OverWrite<User, UpdateInfo>>, UpdatedUser>>
];

/* _____________ 사용 사례 _____________ */
