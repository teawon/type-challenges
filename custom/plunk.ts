/*
  ### 질문
  임의의 객체에서 지정된 키에 해당하는 값을 추출하는 유틸을 정의하세요.

  const pluck = ...

  각 객체 타입에 대해 유효한 키만을 이용하여 값을 안전하게 추출할 수 있도록 유틸 타입을 설정하세요.
*/

/* _____________ 여기에 코드 입력 _____________ */

const pluck =
  <T, K extends keyof T>(key: K) =>
  (obj: T): T[K] =>
    obj[key];

/* _____________ 테스트 케이스 _____________ */

type Person = {
  name: string;
  age: number;
  address: string;
};

const dataArray: Person[] = [
  {
    name: "user1",
    age: 10,
    address: "address",
  },
  {
    name: "user2",
    age: 10,
    address: "address",
  },
];

const dataIds = dataArray.map(pluck("address"));

// @ts-expect-error
const notExistField = dataArray.map(pluck("WrongField"));

/**
 * 사용 사례
 */

// api.get.then(pluck('data'));
