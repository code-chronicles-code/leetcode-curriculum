interface Calculator {
  new (value: number): this;
  add(value: number): this;
  subtract(value: number): this;
  multiply(value: number): this;
  divide(value: number): this;
  power(value: number): this;
  getResult(): number;

  value: number;
}

function Calculator(this: Calculator, value: number) {
  this.value = value;
}

Calculator.prototype.add = function (
  this: Calculator,
  value: number,
): Calculator {
  this.value += value;
  return this;
};

Calculator.prototype.subtract = function (
  this: Calculator,
  value: number,
): Calculator {
  this.value -= value;
  return this;
};

Calculator.prototype.multiply = function (
  this: Calculator,
  value: number,
): Calculator {
  this.value *= value;
  return this;
};

Calculator.prototype.divide = function (
  this: Calculator,
  value: number,
): Calculator {
  if (value === 0) {
    throw new Error("Division by zero is not allowed");
  }

  this.value /= value;
  return this;
};

Calculator.prototype.power = function (
  this: Calculator,
  value: number,
): Calculator {
  this.value **= value;
  return this;
};

Calculator.prototype.getResult = function (): number {
  return this.value;
};
