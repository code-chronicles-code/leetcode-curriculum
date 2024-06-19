import "./iteratorPrototypeMap";

function* testGen() {
  yield 3;
  yield 1;
  yield 4;
}

// Should output 9, 1, 16.
for (const square of testGen().map((x) => x ** 2)) {
  console.log(square);
}
