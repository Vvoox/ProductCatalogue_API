import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CatalogueService} from '../services/catalogue.service';
import {Config} from 'codelyzer';
import {promptGlobalAnalytics} from '@angular/cli/models/analytics';
import {Product} from '../model/product.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ProduitsComponent implements OnInit {

  public currentProduct:Product;
  produits:any;
  // pageproduits:any;
  public size:number=10;
  public currentPage:number=0;
  public totalPages:number;
  public pages:Array<number>;
  public keyword:string='';
  public mode:number=1;
  public alert:number =0;
  public test:string;

  constructor(private catService:CatalogueService,  public router:Router ) { }

  ngOnInit(): void {
    this.onGetProducts();
  }

  onGetProducts() {
    this.alert=0;

    this.catService.getProduct(this.currentPage,this.size).subscribe(data=>{
        this.totalPages=data["page"].totalPages;
        this.pages=new Array<number>(this.totalPages);
        this.produits=data;
      }
      ,error => {
        console.log(error);
      }
    )

  }

  onGetPageProduct(i: number) {
    this.alert=0;

    this.currentPage=i;
    this.keyword='';
    this.onSearchProduct();
  }

  onSearch(value:any){
    this.alert=0;
    this.currentPage=0;
    this.keyword=value.product;
    this.onSearchProduct();
  }

  onSearchProduct() {
    this.alert=0;

    this.catService.getProductByKeyWord(this.keyword,this.currentPage,this.size).subscribe(data=>{
        this.totalPages=data["page"].totalPages;
        this.pages=new Array<number>(this.totalPages);
        this.produits=data;
      }
      ,error => {
        console.log(error);
      }
    )

  }
  public onDeleteProduct(p:any){
    this.alert=0;

    this.catService.deleteProduct(p.id);
    let conf = confirm("Are you Sure ?");
    if(conf) {
      console.log(p._links.self.href);
      var url = p._links.self.href;
      this.catService.deleteProduct(url).subscribe(data=>{
        this.onSearchProduct();
      },error => {
        console.log(error);
      });
    }
  }
  onModifyProduct(p:any){
    this.mode=2;
    this.catService.getOneProduct(p.id).subscribe(data=>{
      this.currentProduct=data;
      this.test=this.currentProduct.designation;
      console.log(this.currentProduct.designation);
    },error =>{
      console.log(error);
    })

  }

  addProduct(value:any) {
    this.catService.addProduct("http://localhost:8080/listProduit",value).subscribe(data=>{
      console.log(data);
      this.catService.getProductbyPages(0,10);
      this.currentProduct=data;
      this.mode=1;
      this.alert=1;
    },error => {
      console.log(error);
    })

  }

  goInfo(p) {
    return this.router.navigateByUrl("/info-product/"+p.id);
  }

  public onModifyProd(p) {
    this.router.navigateByUrl("/modify-product/"+p.id);

  }
}
