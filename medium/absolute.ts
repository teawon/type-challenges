/*
  529 - Absolute
  -------
  by Andrey Krasovsky (@bre30kra69cs) #보통 #math #template-literal

  ### 질문

  number, string, 혹은 bigint을 받는 `Absolute` 타입을 만드세요.
  출력은 양수 문자열이어야 합니다.

  예시:

  ```ts
  type Test = -100
  type Result = Absolute<Test> // expected to be "100"
  ```

  > GitHub에서 보기: https://tsch.js.org/529/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer U}`
  ? `${U}`
  : `${T}`;

// U를 그대로 반환하면 이는 타입스크립트의 문자열 리터럴 타입 시스템 내에서 해당 부분이 문자열로 간주
//  즉, U는 문자열 타입으로 추론되므로 ${U}와 같은 형식이 필요없고 그냥 U를 반환해도 된다.
// type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer U extends number}`
// 단 위 방식대로하면 number추출 가능

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Absolute<0>, "0">>,
  Expect<Equal<Absolute<-0>, "0">>,
  Expect<Equal<Absolute<10>, "10">>,
  Expect<Equal<Absolute<-5>, "5">>,
  Expect<Equal<Absolute<"0">, "0">>,
  Expect<Equal<Absolute<"-0">, "0">>,
  Expect<Equal<Absolute<"10">, "10">>,
  Expect<Equal<Absolute<"-5">, "5">>,
  Expect<Equal<Absolute<-1_000_000n>, "1000000">>,
  Expect<Equal<Absolute<9_999n>, "9999">>
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/529/answer/ko
  > 정답 보기: https://tsch.js.org/529/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
