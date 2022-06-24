import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.email, Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  async login() {
    try {
      const dataLogin = this.form.value
      const token = await axios.post('http://localhost:3000/api/v1/progipix/users/auth/login', dataLogin)
      this.toastr.success('Inicio de sesión correcto', 'Inicio de sesión', {
        timeOut: 1100,
      })
      localStorage.setItem('token', token.data.access_token);
      localStorage.setItem('validation', "true")
      this.router.navigate(['home']);
    } catch (error) {
      this.toastr.error('Crendenciales incorrectas!', 'Inicio de sesión', {
        timeOut: 1100,
      });
      this.form.reset()
    }
    
  }

}
