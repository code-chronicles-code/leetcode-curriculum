# 2726. Calculator with Method Chaining

[View this Write-up on LeetCode TODO](https://leetcode.com/problems/calculator-with-method-chaining/solutions/) | [View Problem on LeetCode](https://leetcode.com/problems/calculator-with-method-chaining/)

> \[!WARNING]\
> This page includes spoilers. For a spoiler-free introduction to the problem, see [the README file](README.md).

## Summary

We should add a field to the class to hold the numeric value given to the constructor. This is the field we return from `.getResult`, as well as the field we update in all the calculator methods. To support method chaining we `return this` from the calculator methods. The methods will all look very similar except for `.divide` which must additionally check for division by zero. Don't forget about `**`, [the exponentiation operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation) when implementing `.power`.

Since a JavaScript class is essentially just a function that can be used as a constructor, we can also write solutions that avoid the `class` syntax.

We can also try to reduce code duplication by programmatically building up the methods from some configuration. Some of the solutions presented below use the dangerous [`eval`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) function for this purpose.

## Background

## Solutions

[View submission on LeetCode](https://leetcode.com/problems/calculator-with-method-chaining/submissions/1382628216/)

```javascript []
class Calculator {
  /**
   * @param {number} value
   */
  constructor(value) {
    this.value = value;
  }

  /**
   * @param {number} value
   * @return {Calculator}
   */
  add(value) {
    this.value += value;
    return this;
  }

  /**
   * @param {number} value
   * @return {Calculator}
   */
  subtract(value) {
    this.value -= value;
    return this;
  }

  /**
   * @param {number} value
   * @return {Calculator}
   */
  multiply(value) {
    this.value *= value;
    return this;
  }

  /**
   * @param {number} value
   * @return {Calculator}
   */
  divide(value) {
    if (value === 0) {
      throw new Error("Division by zero is not allowed");
    }

    this.value /= value;
    return this;
  }

  /**
   * @param {number} value
   * @return {Calculator}
   */
  power(value) {
    this.value **= value;
    return this;
  }

  /**
   * @return {number}
   */
  getResult() {
    return this.value;
  }
}
```

[View submission on LeetCode](https://leetcode.com/problems/calculator-with-method-chaining/submissions/1382628977/)

```typescript []
class Calculator {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  add(value: number): this {
    this.value += value;
    return this;
  }

  subtract(value: number): this {
    this.value -= value;
    return this;
  }

  multiply(value: number): this {
    this.value *= value;
    return this;
  }

  divide(value: number): this {
    if (value === 0) {
      throw new Error("Division by zero is not allowed");
    }

    this.value /= value;
    return this;
  }

  power(value: number): this {
    this.value **= value;
    return this;
  }

  getResult(): number {
    return this.value;
  }
}
```

With more concise field initializer

[View submission on LeetCode](https://leetcode.com/problems/calculator-with-method-chaining/submissions/1382629328/)

```typescript []
class Calculator {
  constructor(private value: number) {}

  add(value: number): this {
    this.value += value;
    return this;
  }

  subtract(value: number): this {
    this.value -= value;
    return this;
  }

  multiply(value: number): this {
    this.value *= value;
    return this;
  }

  divide(value: number): this {
    if (value === 0) {
      throw new Error("Division by zero is not allowed");
    }

    this.value /= value;
    return this;
  }

  power(value: number): this {
    this.value **= value;
    return this;
  }

  getResult(): number {
    return this.value;
  }
}
```

With an `updateValue` helper

[View submission on LeetCode](https://leetcode.com/problems/calculator-with-method-chaining/submissions/1382629491/)

```typescript []
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
```

Immutable objects:

[View submission on LeetCode](https://leetcode.com/problems/calculator-with-method-chaining/submissions/1382630243/)

```typescript []
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
```

Old-style

[View submission on LeetCode](https://leetcode.com/problems/calculator-with-method-chaining/submissions/1382642256/)

```typescript []
interface Calculator {
  new (value: number): this;
  add(value: number): this;
  subtract(value: number): this;
  multiply(value: number): this;
  divide(value: number): this;
  power(value: number): this;
  getResult(): number;
}

function Calculator(this: Calculator, value: number) {
  let result = value;

  this.add = function (this: Calculator, value: number): Calculator {
    result += value;
    return this;
  };

  this.subtract = function (this: Calculator, value: number): Calculator {
    result -= value;
    return this;
  };

  this.multiply = function (this: Calculator, value: number): Calculator {
    result *= value;
    return this;
  };

  this.divide = function (this: Calculator, value: number): Calculator {
    if (value === 0) {
      throw new Error("Division by zero is not allowed");
    }

    result /= value;
    return this;
  };

  this.power = function (this: Calculator, value: number): Calculator {
    result **= value;
    return this;
  };

  this.getResult = function (this: Calculator): number {
    return result;
  };
}
```

Old-style with prototype

[View submission on LeetCode](https://leetcode.com/problems/calculator-with-method-chaining/submissions/1382642481/)

```typescript []
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
```

With private value and \_updateValue helper

[View submission on LeetCode](https://leetcode.com/problems/calculator-with-method-chaining/submissions/1382642652/)

```typescript []
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
```

[View submission on LeetCode](https://leetcode.com/problems/calculator-with-method-chaining/submissions/1382643173/)

```typescript []
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
```

[View submission on LeetCode](https://leetcode.com/problems/calculator-with-method-chaining/submissions/1382644529/)

```typescript []
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

  getResult(): number {
    return this.value;
  }
}

const METHOD_OPERATORS = {
  add: "+",
  subtract: "-",
  multiply: "*",
  divide: "/",
  power: "**",
} as const;

const VALIDATORS: Partial<
  Record<keyof typeof METHOD_OPERATORS, (value: number) => void>
> = {
  divide(value: number) {
    if (value === 0) {
      throw new Error("Division by zero is not allowed");
    }
  },
};

for (const [name, operator] of Object.entries(METHOD_OPERATORS) as [
  keyof typeof METHOD_OPERATORS,
  string,
][]) {
  Calculator.prototype[name] = function (
    this: Calculator,
    value: number,
  ): Calculator {
    VALIDATORS[name]?.(value);
    eval(`this.value ${operator}= value`);
    return this;
  };
}
```

[View submission on LeetCode](https://leetcode.com/problems/calculator-with-method-chaining/submissions/1382645606/)

```typescript []
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

  getResult(): number {
    return this.value;
  }
}

const METHOD_OPERATORS = {
  add: "+",
  subtract: "-",
  multiply: "*",
  divide: "/",
  power: "**",
} as const;

const VALIDATIONS: Partial<
  Record<keyof typeof METHOD_OPERATORS, (value: number) => void>
> = {
  divide(value: number) {
    if (value === 0) {
      throw new Error("Division by zero is not allowed");
    }
  },
};

for (const [name, operator] of Object.entries(METHOD_OPERATORS) as [
  keyof typeof METHOD_OPERATORS,
  string,
][]) {
  Calculator.prototype[name as keyof Calculator] = eval(`
    (function ${name}(value) {
      VALIDATIONS[${JSON.stringify(name)}]?.(value);
      this.value ${operator}= value;
      return this;
    })
  `);
}
```

## Answers to Bonus Questions

> \[!TIP]\
> Thanks for reading! If you enjoyed this write-up, feel free to [up-vote it on LeetCode TODO](https://leetcode.com/problems/calculator-with-method-chaining/solutions/)! 🙏
