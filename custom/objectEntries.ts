/*
  
  -------

  ### 질문
  객체의 키와 값 타입을 추론하는 유틸 함수 만들기
  ```
*/

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

/* _____________ 여기에 코드 입력 _____________ */
const objectEntries = <T extends object>(obj: T) => {
  return Object.entries(obj) as Entries<T>;
};

const user = {
  name: "Joy",
  age: 25,
};

// js에서 Object.entries() 사용 시
const entries = Object.entries(user);
entries.forEach(([key, value]) => {
  if (key === "age") {
    // value는 string | number로 인식
    // @ts-expect-error
    console.log(value.toFixed(2)); // 여기서 에러 발생
  }
});

// 타입스크립트에서 objectEntries() 사용 시
const typedEntries = objectEntries(user);
typedEntries.forEach(([key, value]) => {
  if (key === "age") {
    // value는 number로 정확히 인식
    console.log(value.toFixed(2)); // 여기서 타입 에러가 나지 않도록 objectEntries작성
  }
});

/**
 * study
 *
 *
 */

type User = {
  id: number;
  name: string;
};

type UserEntries = Entries<User>; // [ ['id', number], ['name', string] ][]

/**
 * [K in keyof T]: [K, T[K]]
 *  - 각 타입에 대해 [K, T[K]] 형태의 튜플 타입을 생성한다. 즉 키-값을 튜플로 처리
 *
 * keyof T
 *   - 객체 타입 T에 대한 키의 집합을 나타내는 유니언
 *       - 여기서는 'id' | 'name'을 의미
 *
 *  { ... }[keyof T]
 *     - 매핑된 튜플 타입에서, 각 튜플의 값을 단일 유니언 타입으로 추출
 *        - 여기서는 number | string을 의미
 *
 *
 * { ... }[keyof T][]
 *     - 그 타입을 배열형태로 만듬.
 *        - [K, T[K]][] ->  [ ['id', number], ['name', string] ][]
 */

// 결론 Entries<T> 타입은 객체 T의 각 속성을 [key, value] 형식으로 추출하여 모두 배열로 반환한다..
