import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private http : HttpClient) { }
  private baseUrl = "http://localhost:8080" 

  getProductListPaginate(thePage:number, 
                         thePageSize:number,
                        theCategotyId:number){
    const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${theCategotyId}`
                        + `&page=${thePage}&size=${thePageSize}`;

    return this.http.get<GetResponse>(searchUrl).pipe(
      map(res => {
        return res; 
      })
    );
  }

  getProductCategoryList(){
    const categoryUrl = `${this.baseUrl}/product-category`;
    return this.http.get<GetResponseProductCategory>(categoryUrl).pipe(
      map(res => {
        return res; 
      })
    )
  }

  searchProductsBykeyword(thePage:number,
                          thePageSize:number,
                          theKeyword: string) {
    const searchProductUrl = `${this.baseUrl}/products/search/findByNameContainingIgnoreCase?name=${theKeyword}`  
                              + `&page=${thePage}&size=${thePageSize}`
    return this.http.get<GetResponse>(searchProductUrl).pipe(
      map(res => {
        return res; 
      })
    )
  }

  getProduct(theProductId: number) {
    const productUrl = `${this.baseUrl}/products/${theProductId}`
    return this.http.get<GetResponse>(productUrl).pipe(
      map(res => {
        return res; 
      })
    )
  }
  
}

interface GetResponse{
  _embedded :{
    products : Product[]
  },
  page : {
    size : number,
    totalElements : number,
    totalPages : number,
    number : number
  }
}

interface GetResponseProductCategory{
  _embedded :{
    ProductCategory : ProductCategory[]
  }
}



  
