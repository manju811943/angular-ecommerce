import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/productService';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/product';
import { Cart } from '../../services/cart';
import { CartItem } from '../../common/cart-item';



@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list-grid.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {

  products : any = [];
  currentCategoryId:number = 1;
  previousCategoryId:number = 1;
  searchMode: boolean = false;

  thePageNumber : number = 1;
  thePageSize : number = 10;
  theTotalElements : number = 0;

  constructor(private productService: ProductService,
              private route:ActivatedRoute,
              private cartService:Cart
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe(()=>{
      this.getProductList();
    })
  }

  getProductList(){
    const searchMode = this.route.snapshot.paramMap.has("keyword");
    if(searchMode){
      this.handleSearchProducts()
    }else{
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
  const theKeyword: string = this.route.snapshot.paramMap.get("keyword") ?? '';
   //search for product using keyword
   this.productService.searchProductsBykeyword(this.thePageNumber -1,
                                               this.thePageSize,
                                               theKeyword)
                                               .subscribe((products:any)=>{
                                                this.proccessResult(products)})
  }


  handleListProducts() {
    //check if "id" parameteris available
    const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      //get the 'id' param string and convert string to number using "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }else{
      this.currentCategoryId = 1;
    }

    // if(this.previousCategoryId ! = this.currentCategoryId) this.currentCategoryId = 1;
    this.productService.getProductListPaginate(
      this.thePageNumber-1,
      this.thePageSize,
      this.currentCategoryId
    ).subscribe(products => {
      this.proccessResult(products);
    })
  }

  onPageSizeChange(event: Event){
    const value = +(event.target as HTMLSelectElement).value;
    this.thePageSize = value;
    this.thePageNumber = 1;
    this.getProductList();

  }

  proccessResult(products:any){
    this.products = products._embedded.products;
    this.thePageNumber = products.page.number + 1;
    this.thePageSize = products.page.size;
    this.theTotalElements = products.page.totalElements;
  }

  addToCard(theProduct:Product){
    console.log("add to cart event::", theProduct.name,theProduct.unitPrice);
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem); 
  }
}
