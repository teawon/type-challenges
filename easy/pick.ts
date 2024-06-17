/*
  4 - Pick
  -------
  by Anthony Fu (@antfu) #쉬움 #union #built-in

  ### 질문

  `T`에서 `K` 프로퍼티만 선택해 새로운 오브젝트 타입을 만드는 내장 제네릭 `Pick<T, K>`을 이를 사용하지 않고 구현하세요.

  예시:

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyPick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  ```

  > GitHub에서 보기: https://tsch.js.org/4/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type MyPick<T, K extends keyof T> = Omit<T, Exclude<keyof T, K>>;

// Exclude<keyof T, K>: T의 키들에서, K에 해당하는 문자열을 제외
// Omit <T, K>: T에서 K에 해당하는 문자열을 제외한 타입을 반환

type MyPick2<T, K extends keyof T> = {
  [P in K]: T[P];
};
// 다른 사람 풀이 (P의 경우 Property 이름을 나타내는 변수명으로 자주 사용되는 듯)

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, "title">>>,
  Expect<Equal<Expected2, MyPick<Todo, "title" | "completed">>>,
  // @ts-expect-error
  MyPick<Todo, "title" | "completed" | "invalid">
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/4/answer/ko
  > 정답 보기: https://tsch.js.org/4/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/

/* _____________ 개인 Study _____________ */
/**
 *  1. Pick<T,K> 타입
 *    - T 타입에서 K 프로퍼티만 선택해 새로운 오브젝트 타입을 만드는 내장 제네릭
 *   
        interface User {
            id: number;
            name: string;
            email: string;
            age: number;
            address: string;
        }
        type UserContactInfo = Pick<User, 'name' | 'email'>;

        const userContact: UserContactInfo = {
            name: 'test',
            email: 'test@email.com'
        };


    2. 어디에 활용할 수 있을까?
     
    - API 응답 데이터 정제
       - API 응답 데이터 중 필요한 데이터만 추출하여 사용할 때 (ex. 사용자 정보, 상품 정보 등)

    - styled-components를 사용할 때, 특정 스타일이 여러 컴포넌트에서 중복되거나, 특정 속성들만을 사용하고 싶은 경우




    interface ButtonProps {
        color: string;
        backgroundColor: string;
        padding: string;
        border: string;
        borderRadius: string;
        fontSize: string;
        margin: string;
    }

    type StyledButtonProps = Pick<ButtonProps, 'color' | 'backgroundColor' | 'padding' | 'borderRadius'>;

    const StyledButton = styled.button<StyledButtonProps>`
        color: ${(props) => props.color};
        background-color: ${(props) => props.backgroundColor};
        padding: ${(props) => props.padding};
        border-radius: ${(props) => props.borderRadius};
    `;

    const Button: React.FC<StyledButtonProps & { onClick: () => void }> = (props) => {
        return <StyledButton {...props}>{props.children}</StyledButton>;
    };

 *          
 */
