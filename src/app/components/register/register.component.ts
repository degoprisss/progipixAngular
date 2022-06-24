import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup

  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router) {
    this.form = this.fb.group({
      names: ['', Validators.required],
      lastnames: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      photos: [''],
      state: [true],
    })
  }

  ngOnInit(): void {
  }

  async register() {
    try {
      const dataRegister = this.form.value
      const newUser = await axios.post('http://localhost:3000/api/v1/progipix/users/register', dataRegister)
      console.log(newUser)
      this.toastr.success('Registro exitoso!', 'Registro', {
        timeOut: 1100,
      })
      this.router.navigate(['login']);
    } catch (error) {
      this.toastr.error('Algo saio mal!', 'Registro', {
        timeOut: 1100,
      })
      console.log(error) 
    }
  }

}
