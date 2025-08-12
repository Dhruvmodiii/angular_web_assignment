import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  template: `
    <h2>Quick Quiz</h2>

    <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
      <div *ngFor="let q of questions; let i = index" class="question">
        <p><strong>Q{{ i + 1 }}:</strong> {{ q.text }}</p>
        <div *ngFor="let opt of q.options">
          <label>
            <input
              type="radio"
              [formControlName]="i.toString()"
              [value]="opt"
            />
            {{ opt }}
          </label>
        </div>
        <small class="err" *ngIf="showError(i.toString())">Please select an answer</small>
      </div>

      <button type="submit">Submit Quiz</button>

      <p class="ok" *ngIf="score() !== null">
        You scored {{ score() }}/{{ questions.length }}!
      </p>
    </form>
  `,
  styles: [`
    form { display: grid; gap: 1.5rem; max-width: 600px; }
    .question { border-bottom: 1px solid #ddd; padding-bottom: .5rem; }
    label { display: block; margin-left: 1rem; }
    .err { color:#b00020; font-size: .85rem; }
    .ok { color: #0a7a13; font-weight: bold; }
    button { width: max-content; padding: .6rem 1rem; border:0; border-radius: 8px; background:#1976d2; color:#fff; }
  `]
})
export class QuizFormComponent {
  private fb = new FormBuilder();
  submitted = signal(false);
  score = signal<number | null>(null);

  
  questions = [
    { text: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Madrid'], answer: 'Paris' },
    { text: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Venus'], answer: 'Mars' },
    { text: 'What is 5 + 3?', options: ['6', '8', '10'], answer: '8' }
  ];

 
  form = this.fb.group(
    this.questions.reduce((acc, _, i) => {
      acc[i.toString()] = ['', Validators.required];
      return acc;
    }, {} as Record<string, any>)
  );

  showError(index: string) {
    const control = this.form.get(index);
    return control?.errors?.['required'] && (control.touched || this.submitted());
  }

  onSubmit() {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    
    let s = 0;
    this.questions.forEach((q, i) => {
      if (this.form.value[i.toString()] === q.answer) s++;
    });

    this.score.set(s);

    
    const all = JSON.parse(localStorage.getItem('quizResults') ?? '[]');
    all.push({ date: new Date().toISOString(), score: s });
    localStorage.setItem('quizResults', JSON.stringify(all));

    this.submitted.set(false);
    this.form.reset();
  }
}
