import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {Router} from '@angular/router';
import {HttpHeaders} from '@angular/common/http';
import {constants} from 'http2';
import {TokenModel} from '../model/TokenModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private catalogueService:CatalogueService , private router:Router) { }
  private username:string;
  private password:string;
  public TOKEN:TokenModel;

  ngOnInit(): void {
  }

  doLogin(info){

    this.catalogueService.onlogin(info.username,info.password).subscribe(data=>{
       let token = JSON.stringify(data).replace("{","")
         .replace("}","")
         .replace('"token":"','')
         .replace('"','');
       TokenModel.token=token;

       console.log(TokenModel.token);
       this.router.navigateByUrl("/product");


    },error => {
      console.log(error);

    })
  }



}
