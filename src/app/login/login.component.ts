import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private catalogueService:CatalogueService) { }
  private username:string;
  private password:string;

  ngOnInit(): void {
  }

  onConnect(info){
    console.log(info.username+ " "+ info.password);
    var data =
      {
        "username": this.username,
        "password": this.password
      };

    this.catalogueService.login(data);
  }

}
