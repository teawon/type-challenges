export type Expect<T extends true> = T;
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;

import { Simplify } from "../utils";

// --------------- 문제 ---------------
/**
 * 배열을 특정 키를 기준으로 객체로 변환하는 유틸 함수 만들기
 *
 * ex)
 * pivot(['a', 'b', 'ab'], (key) => key.length) = { a: 1, b: 1, ab: 2 }
 */

type KeyType = symbol | string | number;
export const pivot = <T extends KeyType, U>(
  array: readonly T[],
  callback: (key: T) => U
): Record<T, U> => {
  return array.reduce((acc, key) => {
    const result = callback(key);
    return { ...acc, [key]: result };
  }, {} as Record<T, U>);
};

// --------------- 테스트 케이스 ---------------
const array = ["a", "b", "ab"] as const;

const result = pivot(array, (key) => key.length);
type debug = Simplify<typeof result>;

type cases = [
  Expect<Equal<typeof result, { a: number; b: number; ab: number }>>
];
// ------------- 사례 ---------------
/**
 * 토큰 타입별로 Jwt Strategy 생성
 * export const jwtOrganizationStrategies = pivot(
 *     ORGANIZATION_TOKEN_TYPES,
 *     (key) => new Strategy(jwtOptions, jwtOrganizationVerify(key)),
 * );
 */

/**
 * Study

 */
