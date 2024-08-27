const user = {
  name: "Joy",
  age: 25,
};

const entries = Object.entries(user);
entries.forEach(([key, value]) => {
  if (key === "age") {
    console.log(value.toFixed(2));
  }
});

// d.ts에서 entries에 대한 기본 타입을 덮어씌워 타입을 추론하는 예제
