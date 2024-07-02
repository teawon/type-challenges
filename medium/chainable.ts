/*
  12 - Chainable Options
  -------
  by Anthony Fu (@antfu) #보통 #application

  ### 질문

  체인 가능 옵션은 일반적으로 Javascript에서 사용됩니다. 하지만 TypeScript로 전환하면 제대로 구현할 수 있나요?

  이 챌린지에서는 `option(key, value)`과 `get()` 두가지 함수를 제공하는 객체(또는 클래스) 타입을 구현해야 합니다. 현재 타입을 `option`으로 지정된 키와 값으로 확장할 수 있고 `get`으로 최종 결과를 가져올 수 있어야 합니다.

  예시

  ```ts
  declare const config: Chainable

  const result = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()

  // 결과는 다음과 같습니다:
  interface Result {
    foo: number
    name: string
    bar: {
      value: string
    }
  }
  ```

  문제를 해결하기 위해 js/ts 로직을 작성할 필요는 없습니다. 단지 타입 수준입니다.

  `key`는 `string`만 허용하고 `value`는 무엇이든 될 수 있다고 가정합니다. 같은 `key`는 두 번 전달되지 않습니다.

  > GitHub에서 보기: https://tsch.js.org/12/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type Chainable<R = object> = {
  option<K extends string, V>(
    key: K extends keyof R ? never : K,
    value: V
  ): Chainable<Omit<R, K> & Record<K, V>>;
  get(): R;
};

/* _____________ 테스트 케이스 _____________ */
import type { Alike, Expect } from "@type-challenges/utils";

declare const a: Chainable;

const result1 = a
  .option("foo", 123)
  .option("bar", { value: "Hello World" })
  .option("name", "type-challenges")
  .get();

const result2 = a
  .option("name", "another name")
  // @ts-expect-error
  .option("name", "last name")
  .get();

const result3 = a
  .option("name", "another name")
  // @ts-expect-error
  .option("name", 123)
  .get();

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>
];

type Expected1 = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};

type Expected2 = {
  name: string;
};

type Expected3 = {
  name: number;
};

/* _____________ 다음 단계 _____________ */
/*
    > 정답 공유하기: https://tsch.js.org/12/answer/ko
    > 정답 보기: https://tsch.js.org/12/solutions
    > 다른 문제들: https://tsch.js.org/ko
  */

/* _____________ 개인 Study _____________ */

// 1. get의 반환 타입을 정의한다. (객체 형태이므로 R = object로 정의)

type Chainable_1<R = object> = {
  option(key: string, value: any): any;
  get(): R;
};

// 2. Chainable 가능하도록 option을 재귀로 정의
// 체이닝의 경우 자신을 반환하도록 설계하며 연속적으로 호출할 수 있는 방법.
type Chainable_2<R = object> = {
  option(key: string, value: any): Chainable_2;
  get(): R;
};

// 3. 구체적인 타입을 명시한다.
type Chainable_3<R = object> = {
  option<K extends string, V>(key: K, value: V): Chainable_3<R & Record<K, V>>;
  get(): R;
};

// 4. 키가 반복되는 경우 무시
type Chainable_4<R = object> = {
  option<K extends string, V>(
    key: K extends keyof R ? never : K,
    value: V
  ): Chainable_4<R & Record<K, V>>;
  get(): R;
};

// 5. 키가 덮어씌워지지 않도록 처리 (4번에서 처리되는게 아닌가 싶긴한데 흠.. 타입스크립트가 이해하지 못하는걸까)
// 아니다. 일단 4번 작업을 하지 않아도, 결과적으로 Omit을 통해 타입이 걸러지면서 타입은 완성된다.
// 그런데 "개발자" 에게, 애초에 "동일한 키 값을 넣지말라"는 의미를 전달하기 위해 4번에서 키에대한 타입을 처리한다.
// never 조건이 발생하는 경우 (=동일한 키를 넣었음), 바로 에러를 발생시킬 수 있도록!!

// 거꾸로 5번이 아닌 4번만 처리한다면, 개발자가 오류가 발생한 타입을 무시하면 결국 안되니까, 하나의 안전장치로..결과값을 보장하기 위해 사용

type Chainable_5<R = object> = {
  option<K extends string, V>(
    key: K extends keyof R ? never : K,
    value: V
  ): Chainable_5<Omit<R, K> & Record<K, V>>;
  get(): R;
};

// 체이닝 예시 - 객체는 자기 자신을 호출한다.
class Calculator {
  private value: number;

  constructor(value = 0) {
    this.value = value;
  }

  add(number) {
    this.value += number;
    return this;
  }

  subtract(number) {
    this.value -= number;
    return this;
  }
  getResult() {
    return this.value;
  }
}

// 사용 예제
const result = new Calculator(10).add(5).subtract(3).getResult();

console.log(result); // 24
