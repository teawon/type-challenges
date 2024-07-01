/*
  11 - Tuple to Object
  -------
  by sinoon (@sinoon) #쉬움 #object-keys

  ### 질문

  배열(튜플)을 받아, 각 원소의 값을 key/value로 갖는 오브젝트 타입을 반환하는 타입을 구현하세요.

  예시:

  ```ts
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

  type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
  ```

  > GitHub에서 보기: https://tsch.js.org/11/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type TupleToObject<T extends readonly PropertyKey[]> = {
  [P in T[number]]: P;
};

//  type TupleToObject<T extends readonly any[]>  <-- any는 안됨!!
// PropertyKey = string | number | symbol

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
const tupleNumber = [1, 2, 3, 4] as const;
const sym1 = Symbol(1);
const sym2 = Symbol(2);
const tupleSymbol = [sym1, sym2] as const;
const tupleMix = [1, "2", 3, "4", sym1] as const;

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: "tesla";
        "model 3": "model 3";
        "model X": "model X";
        "model Y": "model Y";
      }
    >
  >,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<
    Equal<
      TupleToObject<typeof tupleSymbol>,
      { [sym1]: typeof sym1; [sym2]: typeof sym2 }
    >
  >,
  Expect<
    Equal<
      TupleToObject<typeof tupleMix>,
      { 1: 1; "2": "2"; 3: 3; "4": "4"; [sym1]: typeof sym1 }
    >
  >
];

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>;

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/11/answer/ko
  > 정답 보기: https://tsch.js.org/11/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/

/* _____________ 개인 Study _____________ */

/**
 *  1. 튜플에서 값을 어떻게 빼야할까..? 특정 변수에 값을 분리하고 처리하고 싶다. 결과물은 결국 A: A 형태로 표현되어야 하니까
 *     - P라는 변수 + in 연산자를 사용해 튜플의 값을 추출한다.
 *     - 튜플의 경우 T[number]를 사용해 Array 요소의 원소를 추출할 수 있음 (아래와 같은 응용도 가능)
 *        (정확히 말하면 Union타입으로 추출되고, P in [유니온] 형태를 통해 유니온 타입의 각 구성요소를 개별로 처리한다.)

                const MyArray = [
                    { name: "Alice", age: 15 },
                    { name: "Bob", age: 23 },
                    { name: "Eve", age: 38 },
                ];
                
                type Person = typeof MyArray[number];
                    
                type Person = {
                    name: string;
                    age: number;
                }
                type Age = typeof MyArray[number]["age"];
                    
                type Age = number
                // Or
                type Age2 = Person["age"];
                    
                type Age2 = number

    2. PropertyKey[]를 왜 사용해야하는가?
       - 문제에서는 배열(튜플)의 값을 key/value로 가지도록 처리해야한다.
       - 문제는 값을 "키"로 사용하는 부분인데, 객체의 키로 사용할 수 있는 타입을 제한해야하기때문이다.
       - 즉 튜플의 요소가 객체의 키로 사용될 수 있는지 보장하고자 PropertyKey[]를 사용 (혹은 동일하게 string | number | symbol[]를 사용하기)


    3. 참고 사이트
      - Mapped Types
        - https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
      - Indexed Types 
        - https://www.typescriptlang.org/docs/handbook/2/mapped-types.html


 */
