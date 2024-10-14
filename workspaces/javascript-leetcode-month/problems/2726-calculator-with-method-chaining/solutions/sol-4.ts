class Calculator {
  constructor(private value: number) {}

  private updateValue(newValue: number): this {
    this.value = newValue;
    return this;
  }

  add(value: number): this {
    return this.updateValue(this.value + value);
  }

  subtract(value: number): this {
    return this.updateValue(this.value - value);
  }

  multiply(value: number): this {
    return this.updateValue(this.value * value);
  }

  divide(value: number): this {
    if (value === 0) {
      throw new Error("Division by zero is not allowed");
    }

    return this.updateValue(this.value / value);
  }

  power(value: number): this {
    return this.updateValue(this.value ** value);
  }

  getResult(): number {
    return this.value;
  }
}
