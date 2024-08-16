/*
  ### 질문
  주어진 배열이 정해진 길이인 경우 해당 배열을 확정적인 튜플 타입으로 알아볼 수 있는 checkLength<T, L> 타입 가드를 구현하세요.

  이 함수는 배열의 길이를 확인하여, 길이가 특정 값일 때 해당 배열의 타입을 Tuple로 변환합니다.
*/

/* _____________ 여기에 코드 입력 _____________ */

type Tuple<T, N extends number, R extends any[] = []> = R["length"] extends N
  ? R
  : Tuple<T, N, [T, ...R]>;

const checkLength = <T, L extends number>(
  array: T[],
  length: L
): array is Tuple<T, L> => {
  return array.length === length;
};

/* _____________ 테스트 케이스 _____________ */

const parseBorderRadius = (borderRadius: string): Tuple<string, 4> => {
  const radiuses = borderRadius
    .split(" ")
    .map((value) => `${parseInt(value) || 0}px`);

  if (checkLength(radiuses, 1)) {
    return [radiuses[0], radiuses[0], radiuses[0], radiuses[0]];
  } else if (checkLength(radiuses, 2)) {
    return [radiuses[0], radiuses[1], radiuses[0], radiuses[1]];
  } else if (checkLength(radiuses, 4)) {
    return radiuses;
  }

  return [`${0}px`, `${0}px`, `${0}px`, `${0}px`];
};

const borderRadius = parseBorderRadius("1");

/**
 * 조건문에서 radiuses를 그냥 반환하는 부분이 있는데, 타입스크립트는 길이가 4임을 인식하지 못한다. (string[])으로 인식
 * -> 타입가드를 통해 해당 조건문을 통과했을때, 길이가 4임을 보장할 수 있도록 처리
 */
