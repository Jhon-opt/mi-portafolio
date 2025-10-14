import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
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


  private serviceId = 'default_service'; // Tu Service ID de EmailJS
  private templateId = 'template_i585c08'; // Tu Template ID de EmailJS
  private publicKey = 'k2Gp1i1QePiJPxYQo'; // Tu Public Key de EmailJS

  // reactive form con validators
  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });
  ngOnInit() {
    // Inicializa EmailJS con tu Public Key
    emailjs.init({ publicKey: this.publicKey });
  }
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
      // Limpia el error después de 5 segundos
      setTimeout(() => this.hasError.set(false), 5000);
      return;
    }

    this.isPosting.set(true);
    this.hasError.set(false);

    // Envía el formulario con EmailJS
    emailjs
      .sendForm(this.serviceId, this.templateId, '#contact-form', {
        publicKey: this.publicKey
      })
      .then(
        () => {
          console.log('✅ Email enviado exitosamente!');
          this.isSubmitted.set(true);
          this.contactForm.reset();
          // Limpia el mensaje de éxito después de 4 segundos
          setTimeout(() => this.isSubmitted.set(false), 4000);
        },
        (error: EmailJSResponseStatus) => {
          console.error('❌ Error al enviar email:', error.text);
          this.hasError.set(true);
          setTimeout(() => this.hasError.set(false), 5000);
        }
      )
      .finally(() => {
        this.isPosting.set(false);
      });
  }
 }
