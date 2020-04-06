import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {Router} from '@angular/router';
import {HttpHeaders} from '@angular/common/http';
import {constants} from 'http2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private catalogueService:CatalogueService , private router:Router) { }
  private username:string;
  private password:string;

  ngOnInit(): void {
  }

  doLogin(info){

    this.catalogueService.onlogin(info.username,info.password).subscribe(data=>{
      console.log("gkky"+data);
    },error => {
      console.log(error);
      this.router.navigateByUrl("/product");

    })
  }



}
