import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})
export class BiddingComponent implements OnInit {

  cars: any = []
  token: any = localStorage.getItem('token');
  user: any = {};

  form: FormGroup

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private route: ActivatedRoute) {
    this.form = this.fb.group({
      proposed_price: ['', [Validators.email, Validators.required]],
      price_total: [""]
    })
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const cars = await axios.get(`http://localhost:3000/api/v1/progipix/users/cars/${id}`)
    this.cars = cars.data
    console.log(this.cars)
  }

  async bidding() {
    try {
      const id = this.route.snapshot.paramMap.get('id');
      const userData = await axios.get('http://localhost:3000/api/v1/progipix/users/user/information', {
        headers: {"authorization" : `Bearer ${this.token}`}
      });
      this.user = userData.data
      const newBidding = {
        proposed_price: this.form.value.proposed_price,
        cars_fk_id: id,
        bidding_fk_id: this.user.userId
      }
      const cars = await axios.post(`http://localhost:3000/api/v1/progipix/users/create/bidding`, newBidding)
      this.toastr.success('Licitación creada con exito', 'Licitación')
      this.router.navigate(['home']);
    } catch (error) {
      this.toastr.error('Algo salio mal.', 'Licitación', {
        timeOut: 1100,
      });
    }
  }

  simulator() {
    const dataLogin = this.form.value
    const commission = parseInt(dataLogin.proposed_price)*2/100
    console.log(commission)
    this.form = this.fb.group({
      proposed_price: [dataLogin.proposed_price],
      price_total: [parseInt(dataLogin.proposed_price) + commission]
    })
  }

}
