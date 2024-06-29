/*
  9 - Deep Readonly
  -------
  by Anthony Fu (@antfu) #보통 #readonly #object-keys #deep

  ### 질문

  객체의 프로퍼티와 모든 하위 객체를 재귀적으로 읽기 전용으로 설정하는 제네릭 `DeepReadonly<T>`를 구현하세요.

  이 챌린지에서는 타입 파라미터 `T`를 객체 타입으로 제한하고 있습니다. 객체뿐만 아니라 배열, 함수, 클래스 등 가능한 다양한 형태의 타입 파라미터를 사용하도록 도전해 보세요.

  예시:

  ```ts
  type X = {
    x: {
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }

  type Expected = {
    readonly x: {
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey'
  }

  type Todo = DeepReadonly<X> // should be same as `Expected`
  ```

  > GitHub에서 보기: https://tsch.js.org/9/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type DeepReadonly<T> = {
  readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>;
};
/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>
];

type X1 = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "string";
        };
        k: "hello";
      };
      l: [
        "hi",
        {
          m: ["hey"];
        }
      ];
    };
  };
};

type X2 = { a: string } | { b: number };

type Expected1 = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "string";
        };
        readonly k: "hello";
      };
      readonly l: readonly [
        "hi",
        {
          readonly m: readonly ["hey"];
        }
      ];
    };
  };
};

type Expected2 = { readonly a: string } | { readonly b: number };

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/9/answer/ko
  > 정답 보기: https://tsch.js.org/9/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/

/* _____________ 개인 Study _____________ */

/**
 *  1.  keyof T extends never
 *     - T 타입이 키를 가지고 있지 않은지를 확인하는 조건
 */

type CheckIsObject<T> = keyof T extends never ? true : false;
type EX1 = CheckIsObject<{ a: string }>; // false, "a" is a known key
type EX2 = CheckIsObject<{}>; // true, there are no known keys
type EX3 = CheckIsObject<object>; // true, there are no known keys
type EX4 = CheckIsObject<string>; // false, there are keys like "toUpperCase"
type Ex5 = CheckIsObject<{ a: string } | { b: string }>; // true, unions with no common keys have no known keys

/**
 *  2. 아래의 코드는 재귀적으로 속성을 검사하고, ReadOnly타입으로 수정한다.
 *  그러나 반례가 있다.
 *   - 특정 유니온 타입의 경우 keyof를 사용했을 때 나오는 교집합(공통키) 가 없을 때 객체임을 판별하지 못한다.
 */

type _DeepReadonly<T> = keyof T extends never
  ? T
  : { readonly [k in keyof T]: DeepReadonly<T[k]> };

type NotDeepReadonly = _DeepReadonly<{ a: string } | { b: string }>;

// https://stackoverflow.com/questions/68693054/what-is-extends-never-used-for/68693367
