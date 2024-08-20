/**
 * readonly가 아닌, 변경 가능한 키들의 유니언을 구하기

  힌트: Equal 유틸을 사용해도 됨
 */

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type AllEditableKeys<T> = {
    [P in keyof T as Equal<ReadOnly<T[P]>, T[P] extends true ? P : never] : any
}

type cases = [
  Expect<Equal<AllEditableKeys<{ test1: never }>, 'test1'>>,
  Expect<Equal<AllEditableKeys<{ test1: number, readonly test2: string }>, 'test1'>>,
  Expect<Equal<AllEditableKeys<{ test1: object, readonly test2?: undefined, test3: null, test4: string }>, 'test1' | 'test3' | 'test4'>>,
  Expect<Equal<AllEditableKeys<{}>, never>>,
]

/**
 *  사용 사례 - 변경 가능한 키를 확인 
 */

interface User {
    id: string;             // 불변 (immutable)
    name: string;           // 변경 가능 (mutable)
    readonly createdAt: Date; // 불변
  }
  
  type UserMutableKeys = AllEditableKeys<User>; // 'name'