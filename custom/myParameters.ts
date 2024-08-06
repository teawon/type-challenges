/* _____________ Your Code Here _____________ */

/* 함수의 파라미터 타입 배열을 추론하기 */

type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer U
) => any
  ? U
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type Config = {
  apple: string;
  banana: number;
  carrot: boolean;
};

const testFunc = (
  { apple, banana, carrot }: Config,
  option: string
): void => {};

type cases = [Expect<Equal<MyParameters<typeof testFunc>, [Config, string]>>];
