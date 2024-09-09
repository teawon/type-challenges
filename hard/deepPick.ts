/**
 * Pick을 2depth이상의 object에서 수행할 수 있도록 고도화된 Pick을 작성하세요.
 *   > View on GitHub: https://tsch.js.org/956
 */
type UnionToIntersection<U> = (
  U extends any ? (arg: U) => any : never
) extends (arg: infer I) => void
  ? I
  : never;

type GetProps<T, K> = K extends `${infer F}.${infer L}`
  ? { [K in F]: GetProps<T[F & keyof T], L> }
  : K extends keyof T
  ? { [P in K]: T[P] }
  : never;

type DeepPick<T, P> = UnionToIntersection<GetProps<T, P>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type TestObjectType = {
  a: number;
  b: string;
  c: boolean;
  obj: {
    ß;
    d: number;
    e: string;
    f: boolean;
    obj2: {
      g: number;
      h: string;
      i: boolean;
    };
  };
  obj3: {
    j: number;
    k: string;
    l: boolean;
  };
};

type cases = [
  Expect<Equal<DeepPick<TestObjectType, "">, unknown>>,
  Expect<Equal<DeepPick<TestObjectType, "a">, { a: number }>>,
  Expect<Equal<DeepPick<TestObjectType, "a" | "">, { a: number } & unknown>>,
  Expect<
    Equal<
      DeepPick<TestObjectType, "a" | "obj.e">,
      { a: number } & { obj: { e: string } }
    >
  >,
  Expect<
    Equal<
      DeepPick<TestObjectType, "a" | "obj.e" | "obj.obj2.i">,
      { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }
    >
  >
];

/**
 *  study
 */
type UnionToIntersection_1<U> = (
  U extends any ? (arg: U) => any : never
) extends (arg: infer I) => void
  ? I
  : never;

type Union = { a: string } | { b: number };
type Intersected = UnionToIntersection<Union>; // Intersected는 { a: string } & { b: number }

// 1.  각각의 U 타입 매개변수에 유니언 타입을 교집합으로 변환하는 타입
// ((arg: { a: string }) => any) & ((arg: { b: number }) => any)
// 2. infer I: (arg: infer I) => void
//  이 과정에서 인자 타입 I는 각각의 유니언 멤버 타입이 인터섹션(&)으로 통합

/*----------*/

type GetProps_2<T, K> = K extends `${infer F}.${infer L}`
  ? { [K in F]: GetProps<T[F & keyof T], L> }
  : K extends keyof T
  ? { [P in K]: T[P] }
  : never;

type Example3 = GetProps<TestObjectType, "obj.obj2.i">;
// Result: { obj: { obj2: { i: boolean } } }

// 1. 특정 키를 분리 A.B형태인지 아닌지를 확인한다.
// 1.1) A.B 형태라면 -> { [K in F]: GetProps<T[F & keyof T], L> }
// 1.2) [K in F] -> 이 구문은 F의 각 요소(여기에서는 하나의 요소)에 대해 타입을 정의

type Test = "a" | "b";
type Example = { [K in Test]: K }; // { a: 'a'; b: 'b' }

// 1.3) T[F & keyof T] : F가 실제로 T에 존재하는지 확인
/**
     * 타입을 GetProps<TestObject, 'obj.obj2.i'>라고 대입하면:
    처음에는 F는 'obj', L은 'obj2.i'로 추론됩니다.
    T['obj']를 사용하여 객체 내부로 이동하고, 그에 대한 새로운 GetProps 호출은 'obj2.i'로 이어집니다.
    다시 F는 'obj2', L은 'i'로 변경되며, 같은 패턴으로 진행됩니다.
    이후 최종적으로 T['obj']['obj2']['i']의 타입 boolean으로 결론이 나며 그를 감싸는 객체로 최종 타입이 결정
 * 
 */

/*----------*/

/**
 * 정리 -> GetProps을 통해 특정 키에 속한 키를 객체 형태로 추출한다(재귀)
 *     -> 추출한 결과의 union을 하나로 합친다 (UnionToIntersection)
 */
