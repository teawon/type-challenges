/*
  
  -------

  ### 질문
  하나 이상의 요소를 포함하는 배열을 의미하는 타입을 정의하기

  type StringArray = NonEmptyArray<string>;   // expected notEmpty String Array
  ```
*/

/* _____________ 여기에 코드 입력 _____________ */

type NonEmptyArray<T> = [T, ...T[]];

/* _____________ 테스트 케이스 _____________ */

// @ts-expect-error
const emptyNumberArray: NonEmptyArray<number> = [];

/* _____________ 사용 사례 _____________ */

const isNotEmptyArr = <T>(arr: any[]): arr is NonEmptyArray<T> => {
  return arr.length > 0;
};

const testArray: number[] = [1, 2, 3];

if (isNotEmptyArr(testArray)) {
  console.log(testArray[1]); // 배열이 비어 있지 않으므로 안전하게 접근
} else {
  // ~~
}

/*
## 관련 개념

- 타입 가드
    - 반환 타입이 `타입 명제` 인 함수(`A is B`)를 사용하여 반환 타입을 명제로 지정해 타입가드 함수를 만들 수 있다.
    - ex) 값이 존재하는지 확인하는 타입가드
    
    ```jsx
    
    // 값이 존재하는지 확인하는 타입가드 예시
    export const isDefined = <T>(value: T | undefined): value is T => {
      return value !== undefined;
    };
    
    ```
    
    Q. 그냥 boolean으로 처리하면 왜 컴파일러에서는 타입을 추론할 수 없을까?
    
    > 타입스크립트는 is문 스코프의 타입을 좁히지 못하고 string으로만 추론한다. (…생략)
    반환 값의 타입을 x is Type로 알려줌으로써 타입스크립트는 if문 스코프 내부의 타입을 추론할 수 있게된다(우아한 타스 139P)
    > 
    
    >> 즉 `is` 키워드를 사용해 조건부 블록 내에서 변수의 타입을 더 구체적으로 추론할 수 있도록 처리해야함

*/
