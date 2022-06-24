import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bidding-list',
  templateUrl: './bidding-list.component.html',
  styleUrls: ['./bidding-list.component.css']
})
export class BiddingListComponent implements OnInit {

  token: any = localStorage.getItem('token');
  user: any = {};

  listCards: any = []

  constructor(private toastr: ToastrService, private router: Router) { }

  async ngOnInit() {
    try {
      this.user = await axios.get('http://localhost:3000/api/v1/progipix/users/user/information', {
        headers: {"authorization" : `Bearer ${this.token}`}
      });
      this.user = this.user.data
      const cars = await axios.get(`http://localhost:3000/api/v1/progipix/users/biddings/${this.user.userId}`)
      this.listCards = cars.data
      console.log( this.listCards)
    } catch (error) {
      console.log('error', error)
    }
  }

  async logout() {
    try {
      console.log(`Bearer ${this.token}`)
      const data = await axios.get('http://localhost:3000/api/v1/progipix/users/auth/logout', {
        headers: {"authorization": `Bearer ${this.token}`}
      });  

      console.log(data)
      localStorage.removeItem("token");
      localStorage.setItem('validation', "false")
      this.router.navigate(['login']);
      this.toastr.success('Cierre de sesión exitoso', 'Cierre de sesión', {
        timeOut: 1100,
      })
    } catch (error) {
      this.toastr.error('Ups, algo salio mal!', 'Cierre de sesión', {
        timeOut: 1100,
      })
    }
  }

}
