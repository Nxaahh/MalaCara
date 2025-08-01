import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ContactService } from '../../services/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.css'],
  imports: [
    ReactiveFormsModule
  ]
})
export class ContactFormComponent {
  contactoForm: FormGroup;
  enviado = false;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactoForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  enviar() {
    if (this.contactoForm.invalid) return;

    this.contactService.crearContacto(this.contactoForm.value).then(() => {
      this.enviado = true;
      this.contactoForm.reset();
    });
  }
}
