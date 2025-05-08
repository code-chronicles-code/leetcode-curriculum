interface Calculator {
  new (value: number): this;
  add(value: number): this;
  subtract(value: number): this;
  multiply(value: number): this;
  divide(value: number): this;
  power(value: number): this;
  getResult(): number;

  _value: number;
  _updateValue(this: Calculator, value: number): this;
}

function Calculator(this: Calculator, value: number) {
  this._value = value;
}

Calculator.prototype._updateValue = function (
  this: Calculator,
  newValue: number,
): Calculator {
  this._value = newValue;
  return this;
};

Calculator.prototype.add = function (
  this: Calculator,
  value: number,
): Calculator {
  return this._updateValue(this._value + value);
};

Calculator.prototype.subtract = function (
  this: Calculator,
  value: number,
): Calculator {
  return this._updateValue(this._value - value);
};

Calculator.prototype.multiply = function (
  this: Calculator,
  value: number,
): Calculator {
  return this._updateValue(this._value * value);
};

Calculator.prototype.divide = function (
  this: Calculator,
  value: number,
): Calculator {
  if (value === 0) {
    throw new Error("Division by zero is not allowed");
  }

  return this._updateValue(this._value / value);
};

Calculator.prototype.power = function (
  this: Calculator,
  value: number,
): Calculator {
  return this._updateValue(this._value ** value);
};

Calculator.prototype.getResult = function (this: Calculator): number {
  return this._value;
};
