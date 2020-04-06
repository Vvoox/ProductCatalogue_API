import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product.model';


@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host:string ="http://localhost:8080";
  public host1:string ="http://localhost:4200/new-product";
  constructor(private httpClient:HttpClient) { }

  public getProduct(page:number,size:number){
    return this.httpClient.get(this.host+"/produits?page="+page+"&size="+size);

  }
  public getOneProduct(id:number):Observable<Product>{
    // @ts-ignore
    return this.httpClient.get(this.host+"/produits/"+id);

  }

  public getProductbyPages(page:number ,size:number){
    return this.httpClient.get(this.host+"/pageProduct?");

  }
  public getProductByKeyWord(key:string,page:number,size:number){

    return this.httpClient.get(this.host+"/produits/search/byDesignationPage?key="+key+"&page="+page+"&size="+size);
  }

  public deleteProduct(url){
    return this.httpClient.delete(url);
  }

  public changeProduct(Designation:string,price:number,quantitie:number){
    return this.httpClient.get(this.host+"?Designation"+Designation+"&price="+price+"&quantitie="+quantitie);
  }

  public addProduct(url,data):Observable<Product>{
    // @ts-ignore
    return this.httpClient.post(url,data);
  }
  public updateProduct(url,data){
    return this.httpClient.put(url,data);
  }
  public onlogin(username:string,password:string){
    const headers = new HttpHeaders({Authorization :'Basic'+btoa(username+":"+password)});

    return this.httpClient.post(this.host+"/login",{headers});
  }




}
