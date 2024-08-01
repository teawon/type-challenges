/*
  
  -------

  ### 질문
  객체 유형에서 객체의 엔트리(키-값 쌍)를 나타내는 튜플 타입을 정의하는 유틸리티 타입
  
  예시:

  ```ts
  type User = {
    id: number;
    name: string;
  };

  type UserValue = ObjectEntry<User>; // expected ['name', string] | ['age', number] 
  ```
*/

/* _____________ 여기에 코드 입력 _____________ */

type ObjectEntry<T> = {
  [P in keyof T]: [P, T[P]];
}[keyof T];

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type User = {
  id: number;
  name: string;
};

type UserObjectEntry = ["id", number] | ["name", string];

type Config = {
  apiKey: string;
  timeout: number;
  retry: boolean;
};

type ConfigObjectEntry =
  | ["apiKey", string]
  | ["timeout", number]
  | ["retry", boolean];

type cases = [
  Expect<Equal<ObjectEntry<User>, UserObjectEntry>>,
  Expect<Equal<ObjectEntry<Config>, ConfigObjectEntry>>
];

/* _____________ 사용 사례 _____________ */

const apiKeyEntry: ConfigObjectEntry = ["apiKey", "123123"];

const logPersonEntry = (entry: ObjectEntry<Config>) => {
  const [key, value] = entry;
  // 객체의 키-값 쌍을 처리할 때
};
