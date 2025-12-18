import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Luv2ShopForm } from '../../services/luv2-shop-form';
import { CountryState } from '../../services/country-state';
import { CountryList } from '../../common/country-list';
import { StateList } from '../../common/State-list';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {

  checkoutFormGroup! : FormGroup;
  totalPrice : number = 0;
  totalQuantity : number = 0;
  creditCardMonth : number[] = [];
  creditCardyear : number[] = [];

  countries: CountryList[] = [];
  states: StateList[] = [];

  constructor(private formBuilder : FormBuilder,
              private luv2ShopForm: Luv2ShopForm,
              private countryState : CountryState
  ){}

  ngOnInit(){
    this.checkoutFormGroup = this.formBuilder.group({
      customer : this.formBuilder.group({
        firstName : [''],
        lastName : [''],
        email : ['']
      }),
      shippingAddress : this.formBuilder.group({
        street : [''],
        city : [''],
        state : [''],
        country : [''],
        zinCode : ['']
      }),
      // billingAddress : this.formBuilder.group({
      //   street : [''],
      //   city : [''],
      //   state : [''],
      //   country : [''],
      //   zinCode : ['']
      // }),
      creditCard : this.formBuilder.group({
        cardType : [''],
        cardNumber : [''],
        nameOnCard : [''],
        securityCode : [''],
        expirationMonth : [''],
        expirationYear : ['']
      }),
    })

    const startMonth:number = new Date().getMonth() + 1;
    const startYear : number = new Date().getFullYear();

    this.luv2ShopForm.getCreditCardMonths(startMonth).subscribe(res=>{
        this.creditCardMonth = res;
    })
    this.luv2ShopForm.getCreditCardYear(startYear).subscribe(res=>{
      this.creditCardyear = res;
    })

    this.getCountryList();
    // this.getStateList();
  }

  getCountryList(){
    this.countryState.getCountryList().subscribe(result=>{
      console.log("countryState", result._embedded.countries);
      this.countries = result._embedded.countries;
    })
  }

  getStateList(countryCode:string){
    this.countryState.getStateList(countryCode).subscribe(result=>{
      this.states = result._embedded.states;
    })
  }

  onSubmit() {
    console.log("data==>", this.checkoutFormGroup.get('customer')?.value);
    console.log("data==>", this.checkoutFormGroup.get('shippingAddress')?.value);
    console.log("data==>", this.checkoutFormGroup.get('creditCard')?.value);
  }

  onCountryChange(shippingAddress: string): void {
    const formGroup = this.checkoutFormGroup.get(shippingAddress);
    const countryCode =  formGroup?.value.country.code;
    this.getStateList(countryCode);
  }


}
