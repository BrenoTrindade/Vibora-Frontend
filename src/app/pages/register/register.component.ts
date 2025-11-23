import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  registerForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const registerData = this.registerForm.value;

    this.authService.register(registerData).subscribe({
      next: (response) => {
        this.toastr.success('Registro realizado com sucesso!', 'Bem-vindo!');
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        console.error('Erro no registro:', err);
        this.toastr.error('Verifique os dados informados.', 'Erro no Registro');
      }
    });
  }
}
