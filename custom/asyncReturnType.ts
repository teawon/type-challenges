/* _____________ 비동기 함수의 리턴 타입을 추론하기 _____________ */
type MyAsyncFunction = () => Promise<any>;

type MyAsyncReturnType<Target extends MyAsyncFunction> = Awaited<
  ReturnType<Target>
>;
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

import { Simplify } from "../utils";

type debug = Simplify<Promise<string>>;

type cases = [
  Expect<Equal<string, MyAsyncReturnType<() => Promise<string>>>>,
  Expect<Equal<boolean, MyAsyncReturnType<() => Promise<boolean>>>>
];

/** study */

type MyAsyncReturnType1<Target extends MyAsyncFunction> = Target extends (
  ...args
) => Promise<infer U>
  ? U
  : never;
// Awaited을 활용하자

type MyAsyncReturnType2<Target extends MyAsyncFunction> = Awaited<
  Target extends (...args) => infer U ? U : never
>;
// ReturnType을 활용하자

type MyAsyncReturnType3<Target extends MyAsyncFunction> = Awaited<
  ReturnType<Target>
>;
