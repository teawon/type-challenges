/**
 * 질문
 특정 타입의 키들만 뽑아내는 타입 만들기
 */

type PickSpecificType<T extends object, U> = {
  [key in keyof T as T[key] extends U ? key : never]: T[key];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

interface User {
  name: string;
  age: number;
  isDeleted: boolean;
  isUpdated: boolean;
}

type cases = [
  Expect<
    Equal<
      PickSpecificType<User, boolean>,
      { isDeleted: boolean; isUpdated: boolean }
    >
  >,
  Expect<Equal<PickSpecificType<User, number>, { age: number }>>,
  Expect<Equal<PickSpecificType<User, string>, { name: string }>>
];

/**
 * 사례 Date타입의 모든 타입 뽑아내기
 */
interface User {
  name: string;
  age: number;
  createdAt: Date;
  deletedAt: Date;
}

const userDateInfo: PickSpecificType<User, Date> = {
  createdAt: new Date(),
  deletedAt: new Date(),
};
