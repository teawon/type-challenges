/**
 * entries의 타입을 구체화 (custom/objectEntries.ts 참고)
 */
interface ObjectConstructor {
  entries<T>(o: T): { [K in keyof T]: [K, T[K]] }[keyof T][];
}

// ObjectConstructor : TS의 내장 인터페이스. Object에 존재하는 메서드 및 속성의 타입을 재정의/확장 할 수 있음
