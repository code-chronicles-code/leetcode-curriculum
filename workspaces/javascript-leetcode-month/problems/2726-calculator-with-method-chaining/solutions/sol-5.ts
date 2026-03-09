class Calculator {
  constructor(private readonly value: number) {}

  add(value: number): Calculator {
    return new Calculator(this.value + value);
  }

  subtract(value: number): Calculator {
    return new Calculator(this.value - value);
  }

  multiply(value: number): Calculator {
    return new Calculator(this.value * value);
  }

  divide(value: number): Calculator {
    if (value === 0) {
      throw new Error("Division by zero is not allowed");
    }

    return new Calculator(this.value / value);
  }

  power(value: number): Calculator {
    return new Calculator(this.value ** value);
  }

  getResult(): number {
    return this.value;
  }
}
