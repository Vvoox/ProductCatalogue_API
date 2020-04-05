import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogueService} from '../services/catalogue.service';
import {Product} from '../model/product.model';
import {url} from 'inspector';
import {stat} from 'fs';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.css']
})
export class ModifyProductComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private catalogueService:CatalogueService,private router:Router) { }
  // @ts-ignore
  public id:number = this.activatedRoute.snapshot.params.id;
  public product:Product;
  public url:string="http://localhost:8080/produits/" ;
  public status:number=0;

  ngOnInit(): void {
    this.onModifyProduct();
  }


  onModifyProduct(){
    this.catalogueService.getOneProduct(this.id).subscribe(data=>{
      this.product=data;
      this.url = this.url+this.id
      console.log(this.product);
      console.log(this.url);
    },error =>{
      console.log(error);
    })
  }


  goHome() {

  }
  //
  onUpdateProduct(data) {
    data.lastUpdate=new Date();
    this.catalogueService.updateProduct(this.url,data).subscribe(data=>{
      console.log(data);
      this.status=1;
      this.router.navigateByUrl("/product")
    },error => {
      console.log(error);
    })
  }
}
