/**
 * 객체와 함수를 가지고, 함수를 통해 값이 변환된 새 객체 만드는 함수 구현하기
 */

export const mapValues = <
  T extends object,
  K extends keyof T,
  V extends (value: T[K], key: K, object) => any
>(
  obj: T,
  callback: V
) => {
  const result = {} as T;

  const keys = Object.keys(obj) as K[];

  keys.forEach((key) => {
    result[key] = result[key] = callback(obj[key], key, obj);
  });

  return result;
};
const testObj = { a: 1, b: 2, c: 10 };
const newObject = mapValues(testObj, (value) => value * 2);
console.log(newObject); // { a: 2, b: 4, c: 6 }

/**
 * 사용 사례
 */

// const addedPointByMonth = mapValues(
//     expHistoriesGroupedByMonth,
//     (histories) => _.sumBy(histories, 'addedPoint'),
// );

/**
 * study
 *
 * JavaScript의 함수 호출 방식에서는 함수가 기대하는 매개변수보다 적은 인자를 전달해도 오류가 발생하지 않음
 * JavaScript는 전달되지 않은 매개변수를 undefined로 간주 -> 왜 이걸 몰랐지..?
 */

/**
 * export const mapValues = <
  T extends object,
  K extends keyof T,
  V extends (value : T[K], key: K, object) => any
>(
  obj: T,
  callback: V
) => {

    나는 이렇게 짰는데, 답지는 아래와 같았다

    <T extends object, K extends keyof T, V>(
        object: T,
        getNewValue: (value: T[K], key: K, object: T) => V
        ): Record<K, V> => {


            - 타입의 범위는 최대한 좁게설정하고, 콜백과 같은 부분을 정의할때 파라메터를 자유롭게 사용하는게 훨씬 유동적인 처리가 가능할듯
 */
