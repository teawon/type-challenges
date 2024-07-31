/*
  
  -------

  ### 질문
  객체 유형에서 T의 모든 값들의 타입을 가져오는 ValueOf<T>를 구현하세요
  
  예시:

  ```ts
  type User = {
    id: number;
    name: string;
    age: number;
  };

  type UserValue = ValueOf<User>; // expected number | string
  ```
*/

/* _____________ 여기에 코드 입력 _____________ */

type ValueOf<T> = 
/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type User = {
  id: number;
  name: string;
  age: number;
};

type Config = {
  apiKey: string;
  timeout: number;
  retry: boolean;
};

type cases = [
  Expect<Equal<ValueOf<User>, number | string>>,
  Expect<Equal<ValueOf<Config>, string | number | boolean>>
];

/* _____________ 사용 사례 _____________ */