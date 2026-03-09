interface Calculator {
  new (value: number): this;
  add(value: number): this;
  subtract(value: number): this;
  multiply(value: number): this;
  divide(value: number): this;
  power(value: number): this;
  getResult(): number;
}

class Calculator {
  constructor(private value: number) {}

  divide(value: number): this {
    if (value === 0) {
      throw new Error("Division by zero is not allowed");
    }
    this.value /= value;
    return this;
  }

  getResult(): number {
    return this.value;
  }
}

const METHOD_OPERATORS = {
  add: "+",
  subtract: "-",
  multiply: "*",
  power: "**",
} as const;

for (const [name, operator] of Object.entries(METHOD_OPERATORS) as [
  keyof typeof METHOD_OPERATORS,
  string,
][]) {
  Calculator.prototype[name] = function (
    this: Calculator,
    value: number,
  ): Calculator {
    eval(`this.value ${operator}= value`);
    return this;
  };
}
