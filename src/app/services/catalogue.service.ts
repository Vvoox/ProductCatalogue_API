import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product.model';
import {TokenModel} from '../model/TokenModel';


@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host:string ="http://localhost:8080";
  public host1:string ="http://localhost:4200/new-product";
  public token:string;
  public headers:any;

  constructor(private httpClient:HttpClient) {

  }

  public getProduct(page:number,size:number){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " +TokenModel.token);
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    return this.httpClient.get(this.host+"/produits?page="+page+"&size="+size,{headers});

  }
  public getOneProduct(id:number):Observable<Product>{
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " +TokenModel.token);
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    // @ts-ignore
    return this.httpClient.get(this.host+"/produits/"+id,{headers});

  }

  public getProductbyPages(page:number ,size:number){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " +TokenModel.token);
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    return this.httpClient.get(this.host+"/pageProduct?",{headers});

  }
  public getProductByKeyWord(key:string,page:number,size:number){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " +TokenModel.token);
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    return this.httpClient.get(this.host+"/produits/search/byDesignationPage?key="+key+"&page="+page+"&size="+size,{headers});
  }

  public deleteProduct(url){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " +TokenModel.token);
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    return this.httpClient.delete(url,{headers});
  }

  public changeProduct(Designation:string,price:number,quantitie:number){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " +TokenModel.token);
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    return this.httpClient.get(this.host+"?Designation"+Designation+"&price="+price+"&quantitie="+quantitie,{headers});
  }

  public addProduct(url,data):Observable<Product>{
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " +TokenModel.token);
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    // @ts-ignore
    return this.httpClient.post(url,data,{headers});
  }
  public updateProduct(url,data){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " +TokenModel.token);
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    return this.httpClient.put(url,data,{headers});
  }
  public onlogin(username:string,password:string){
    console.log(username + " "+password);

    const crediantials = { username:username , password:password};
    let data = this.httpClient.post("http://localhost:8080/api/auth",crediantials);
    this.token = JSON.stringify(data).replace("{","")
      .replace("}","")
      .replace('"token":"','')
      .replace('"','');

    console.log(this.token);
    // @ts-ignore
    return this.httpClient.post("http://localhost:8080/api/auth",crediantials);
  }

}
