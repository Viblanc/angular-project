import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

const divisionByZeroValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const operand2 = control.get('operand2');
  const operator = control.get('operator');

  return operand2 && operator && operand2.value === 0 && operator.value === '/'
    ? { divisionByZero: true }
    : null;
};

@Component({
  selector: 'app-exercise2',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './exercise2.html',
  styleUrl: './exercise2.css',
})
export class Exercise2 {
  form = new FormGroup(
    {
      operand1: new FormControl<number>(0, [Validators.required]),
      operand2: new FormControl<number>(0, [Validators.required]),
      operator: new FormControl<operator>('+', [Validators.required]),
    },
    { validators: divisionByZeroValidator }
  );

  // operand1 = signal<number>(0);
  // operand2 = signal<number>(0);
  // operator = signal<'+' | '-' | '*' | '/'>('+');
  result = signal<Operation | undefined>(undefined);
  history = signal<Operation[]>([]);

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    // if result is undefined, we do not add it to the history
    if (this.result() !== undefined) {
      this.history.update((old) => {
        return [this.result()!, ...old];
      });
    }

    const op1 = this.form.controls.operand1.value!;
    const op2 = this.form.controls.operand2.value!;
    const operator = this.form.controls.operator.value;

    const tmpRes = {
      time: Date.now(),
      operator: operator!,
    };

    switch (operator) {
      case '+':
        this.result.set({
          result: op1 + op2,
          ...tmpRes,
        });
        break;
      case '-':
        this.result.set({
          result: op1 - op2,
          ...tmpRes,
        });
        break;
      case '*':
        this.result.set({
          result: op1 * op2,
          ...tmpRes,
        });
        break;
      case '/':
        this.result.set({
          result: op1 / op2,
          ...tmpRes,
        });
        break;
    }
  }

  removeResult(time: number) {
    this.history.update((prevHistory) => {
      return prevHistory.filter((res) => res.time != time);
    });
  }
}
