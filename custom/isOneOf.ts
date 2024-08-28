/**
 * 질문
  주어진 배열의 아이템 중 하나인지 확인하는 타입 가드 함수 isOneOf를 구현하세요. 
  이 함수는 입력한 값이 배열에 포함되어 있는지를 확인하여, 포함되어 있으면 타입 가드를 사용하여
  그 값의 타입을 배열의 요소 타입으로 변환할 수 있도록 합니다.

 */

/* _ 여기에 코드 입력 _ */

export const ERRORS = {
    INVALID_ERROR1: 'E_1',
    INVALID_ERROR2: 'E_2',
    INVALID_ERROR3 : 'E_3'
  } as const;
  
  
  const isOneOf =<T>(items : T[]) => (target : unknown) : target is T=> {
    return items.some(item => item === target);
  };
  
  /* _ 테스트 케이스 _ */
  
  const code : unknown = "E_3";
  
  if (code === ERRORS.INVALID_ERROR1) {
     console.log("INVALID_ERROR1이 발생했을때 처리할 예외처리 로직")
  } else if (isOneOf(Object.values(ERRORS))(code)) {
    console.log("INVALID_ERROR1이 아닌, 다른 어떠한 에러중 하나라면 처리할 로직");
    // code의 범위가 ERRORS임을 추론하지 못하고 있다. 
    // code의 타입이  "E_1" | "E_2" | "E_3"가 될 수 있도록 코드를 수정하기
    code.charAt(1);
  }

  /**
   * Study
   * - Curring 함수형 프로그래밍 패턴이 사용된 코드
   *    - 여러 인자를 한꺼번에 받지 않고 하나씩 나누어 받도록 호출하는 방식
   */

  onst isOneOfNumber = isOneOf<number>([1, 2, 3]);
console.log(isOneOfNumber(2)); // true
console.log(isOneOfNumber(4)); // false

const isOneOfString = isOneOf<string>(["apple", "banana"]);
console.log(isOneOfString("apple")); // true
console.log(isOneOfString("orange")); // false