import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'contac-section',
  imports: [ ReactiveFormsModule],
  templateUrl: './contacSection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContacSectionComponent {
  private fb = inject(FormBuilder);
  // contactService = inject(ContactService); // ejemplo si tuvieras uno

  // signals para estado
  isPosting = signal(false);
  isSubmitted = signal(false);
  hasError = signal(false);

  // reactive form con validators
  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  // helpers
  control(name: string) {
    return this.contactForm.get(name)!;
  }

  hasControlError(name: string, error: string) {
    const ctrl = this.control(name);
    return ctrl.touched && ctrl.hasError(error);
  }

  onSubmit() {
    this.contactForm.markAllAsTouched();

    if (this.contactForm.invalid) {
      this.hasError.set(true);
      return;
    }

    this.isPosting.set(true);
    this.hasError.set(false);

    // 🚧 Simulación de envío
    setTimeout(() => {
      this.isPosting.set(false);
      this.isSubmitted.set(true);
      this.contactForm.reset();

      // ocultar mensaje tras 4 segundos
      setTimeout(() => this.isSubmitted.set(false), 4000);
    }, 1500);
  }
 }
