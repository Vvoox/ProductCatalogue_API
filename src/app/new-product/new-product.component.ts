import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {Router} from '@angular/router';
import {Product} from '../model/product.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public product:Product;
  mode:number=1;
  alert:number=0;
  constructor(private catalogueService:CatalogueService , private router:Router) { }

  public currentProduct:Product;
  ngOnInit(): void {
  }

  addProduct(value:any) {
    this.product=value
    this.product.date=new Date();
    this.product.lastUpdate=new Date();
    this.catalogueService.addProduct("http://localhost:8080/listProduit",value).subscribe(data=>{
      console.log(data);
      // this.router.navigateByUrl("/product");
      this.catalogueService.getProductbyPages(0,10);
      this.currentProduct=data;
      this.mode=2;
      this.alert=0;
    },error => {
      console.log(error);
    })

  }
  confirmProduct() {
    this.mode=1;
    this.alert=1;
  }

  goHome(){
    this.router.navigateByUrl("/new-product");
    this.mode=1;
  }
}
