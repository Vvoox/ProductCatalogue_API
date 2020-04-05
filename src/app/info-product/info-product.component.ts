import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {CatalogueService} from '../services/catalogue.service';
import {Product} from '../model/product.model';
import {ProduitsComponent} from '../produits/produits.component';

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.css']
})

export class InfoProductComponent implements OnInit {

  public product:Product;
  private id:number=this.activatedRoute.snapshot.params.id;


  constructor(private activatedRoute:ActivatedRoute , private catalogueService:CatalogueService ,private router:Router, private produitComponent:ProduitsComponent) { }
  private produitComponent1;any;
  ngOnInit(): void {
    produitComponent1:ProduitsComponent;
    this.catalogueService.getOneProduct(this.id).subscribe(data =>{
      this.product =data;

    },error => {
      console.log(error)
    });
  }

  onModify(product){
    this.router.navigateByUrl("/modify-product/"+product.id);
  }

  onDelete(product: Product) {
      this.produitComponent.onDeleteProduct(product);
      this.router.navigateByUrl("/product");
    }

}
