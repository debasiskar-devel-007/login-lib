import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, MinLengthValidator, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';




@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public message: any = '';
  //   FormGroupDirective: It is a directive that binds an existing FormGroup to a DOM element.
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  public fromTitleValue: any = '';
  public serverURL: any = '';
  public signUpRouteingUrlValue: any = '';
  public forgetRouteingUrlValue: any = '';
  public routerStatusValue: any = '';
  public endpointValue: any;
  public logoValue: any = '';
  public cookieSetValue: any = '';
  public buttonNameValue: any = '';

  @Input()         // Set the project name
  set fromTitle(fromTitleVal: any) {
    this.fromTitleValue = (fromTitleVal) || '<no name set>';
    this.fromTitleValue = fromTitleVal;

  }
  @Input()      // set the from logo

set logo(logoVal : any) {
  this.logoValue = logoVal;
}
@Input()
set buttonName (buttonNameVal :any){
  this.buttonNameValue = (buttonNameVal) || '<no name set>';
  this.buttonNameValue = buttonNameVal
}

  @Input()        // setting the server url from project
  set fullUrl(fullUrlVal: any) {
    this.serverURL = (fullUrlVal) || '<no name set>';
    this.serverURL = fullUrlVal;

  }
  @Input()

  set endpoint(endpointVal: any) {
    this.endpointValue = endpointVal;
  }

@Input()

public set cookieSet(v : any) {
  this.cookieSetValue = v;
  // console.log(this.cookieSetValue.cookie);
  // for (const key in this.cookieSetValue.cookie) {
            
  //   console.log(this.cookieSetValue.cookie[key]);
  // }

}



  @Input()          // setting the navigate By Sign Up Url from project
  set signUpRouteingUrl(routeingUrlval: any) {
    this.signUpRouteingUrlValue = (routeingUrlval) || '<no name set>';
    this.signUpRouteingUrlValue = routeingUrlval;
    console.log(this.signUpRouteingUrlValue)
  }


  @Input()          // setting the navigate By Forget Password Url from project
  set forgetRouteingUrl(routeingUrlval: any) {
    this.forgetRouteingUrlValue = (routeingUrlval) || '<no name set>';
    this.forgetRouteingUrlValue = routeingUrlval;
    console.log(this.forgetRouteingUrlValue)
  }

  @Input()          // setting the navigate By Forget Password Url from project
  set routerStatus(routerStatusval: any) {
    this.routerStatusValue = (routerStatusval) || '<no name set>';
    this.routerStatusValue = routerStatusval;
    // console.log(this.routerStatusValue);
    // console.log(this.routerStatusValue.data.length);
  }




  public loginForm: FormGroup;
  public project_name: any = '';

  constructor(public fb: FormBuilder, public http: HttpClient, public router: Router, public apiService: ApiService, public cookieService: CookieService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.apiService.clearServerUrl();       // Clear the server url
    setTimeout(() => {
      this.apiService.setServerUrl(this.serverURL);       // set the server url 
    }, 50);
    // console.log(this.serverURL);


    this.apiService.clearaddEndpoint();       // clear the endpoint 
    setTimeout(() => {
      this.apiService.setaddEndpoint(this.endpointValue);       // set the endpoint
    }, 50);
    // console.log(this.addEndpointData.endpoint);

  }

/********* Login Form Submit start here*********/ 
  loginFormSubmit() {
    let x: any;
/****************** test*******************/ 
// for (const key in this.cookieSetValue.cookie) {
//   console.log(this.cookieSetValue.cookie[key].type);
//   if (result.token == this.cookieSetValue.cookie[key].type) {
//     console.log('+++++++++++++++');
//   }
// }


    // use for validation checking

    for (x in this.loginForm.controls) {
      this.loginForm.controls[x].markAsTouched();
    }

    if (this.loginForm.valid) {
      let data: any = this.loginForm.value;
      this.apiService.addLogin(data).subscribe((response) => {
        // console.log(response);
        let result: any = {};
        result = response;
      //   let cookiekeyarr:any = [];
      //   let cookievaluearr:any = [];
      //   for(let j in result.item){
      //     // console.log(Object.values(result.item[j]));
      //     // cookiekeyarr = Object.keys(result.item[j]);
      //     // cookievaluearr = Object.values(result.item[j]);
      //     cookievaluearr.push(Object.keys(result.item[j]), Object.values(result.item[j]));
      //   }
      //   // console.log('cookiekeyarr'+cookiekeyarr);
      //   console.log(cookievaluearr);
      // //   setTimeout(()=>{
      //   // for (let key in cookiekeyarr){
      //     for(let value in cookievaluearr[0]){
      //       console.log('hi'+value);
      //       // this.cookieService.set(cookiekeyarr[key],cookievaluearr[value]);
      //     }
      //   // }
      // // },2000);
      //   // setTimeout(()=>{
      //   //   console.log(this.cookieService.getAll());
      //   // },4000);
        

        if (result.status == "success") {
          // for (const key in this.cookieSetValue.cookie) {
          //   console.log(this.cookieSetValue.cookie[key].type);
          //   if (result == this.cookieSetValue.cookie[key].type) {
          //     console.log('+++++++++++++++');
          //   }
          // }
          this.cookieService.set('user_details', JSON.stringify(result.item[0]));
          this.cookieService.set('jwtToken', result.token);

          setTimeout(() => {
            // console.log(this.cookieService.getAll());
          }, 1000);

          // console.log('result')
          // console.log(result.item[0].type)
          for (const key in this.routerStatusValue.data) {
            // console.log(this.routerStatusValue.data[key].type);

            if (result.item[0].type === this.routerStatusValue.data[key].type) {
              this.router.navigateByUrl('/' + this.routerStatusValue.data[key].routerNav)     // navigate to dashboard url 
            }
          }


          // this is use for reset the from
          this.formDirective.resetForm();
          this.message = '';
        } else {
          // display error message on html
          this.message = result.msg;
        }
      });
    }

  }


  inputUntouched(val: any) {
    this.loginForm.controls[val].markAsUntouched();
  }

  // This is use for navigate this component to forget component 
  forgetpassword() {
    this.router.navigateByUrl('/' + this.forgetRouteingUrlValue.path);
  }

  // This is use for navigate this component to sign-Up component 
  signup() {
    this.router.navigateByUrl('/' + this.signUpRouteingUrlValue.path);
  }

  customFunction(link: any) {
    this.router.navigateByUrl('/'+ link);
  }

}
