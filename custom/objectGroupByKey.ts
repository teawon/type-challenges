/* _____________ Your Code Here _____________ */
// lodash의 groupBy 복 붙 함. import의 수고를 덜어주는 착한 출제자

function groupBy(collection, iteratee) {
  //@ts-ignore
  return reduce(
    collection,
    (result, value, key) => {
      key = iteratee(value);
      //@ts-ignore
      if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
      } else {
        //@ts-ignore
        baseAssignValue(result, key, [value]);
      }
      return result;
    },
    {}
  );
}

type KeyType = string | number | symbol;

/**

객체의 키를 기준으로 그룹화하는 함수입니다. */ export const objectGroupByKey = <
  T extends object,
  U extends keyof T
>(
  collection: T[],
  key: U
) =>
  groupBy(collection, key) as Record<T[U] extends KeyType ? T[U] : never, T[]>;
type DataType = {
  age: number;
  name: string;
  birth: Date;
};
const testData: DataType[] = [
  {
    age: 10,
    name: "gorani",
    birth: new Date("2000-10-12"),
  },
  {
    age: 10,
    name: "ranikim",
    birth: new Date("2000-10-12"),
  },
  {
    age: 11,
    name: "rani",
    birth: new Date("2000-10-12"),
  },
  {
    age: 11,
    name: "joy",
    birth: new Date("2000-10-12"),
  },
  {
    age: 12,
    name: "taewon",
    birth: new Date("2000-10-12"),
  },
];

const obj = groupBy(testData, "age"); // any 타입으로 추론됩니다
const obj2 = objectGroupByKey(testData, "age");

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [Expect<Equal<typeof obj2, Record<number, DataType[]>>>];

/**
 * `keyof any`는 TypeScript의 내장 타입으로, 객체의 모든 키 타입을 나타냄.

 이는 `string | number | symbol`과 같은 의미
 */
