import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'lib-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  public message: any = '';
  public buttonNameValue: any = '';

  //   FormGroupDirective: It is a directive that binds an existing FormGroup to a DOM element.
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  public forgetPasswordForm: FormGroup;
  public formTitleValue: any = '';          // This is From title
  public serverUrlValue: any = '';          //  This is Server url
  public signUpRouteingUrlValue: any = '';  // setting the navigate By Sign Up Url from project
  public loginRouteingUrlValue: any = '';  // setting the navigate By login Url from project
  private domainUrlValue: any = '';          // This is reset password url
  public addEndpointValue: any = '';        // This is endpoint url
  public logoValue: any = '';               // This is from logo url
  public durationInSeconds = 5;             // This is SnackBar set time


  @Input()
set buttonName (buttonNameVal :any){
  this.buttonNameValue = (buttonNameVal) || '<no name set>';
  this.buttonNameValue = buttonNameVal
}

  @Input()         // Set the project email Doman URL
  set domainUrl(domainUrlVal: any) {
    this.domainUrlValue = (domainUrlVal) || '<no name set>';
    this.domainUrlValue = domainUrlVal;
    // console.log(this.domanUrlValue);
  }
  @Input()         // Set the project name
  set formTitle(formTitleVal: any) {
    this.formTitleValue = (formTitleVal) || '<no name set>';
    this.formTitleValue = formTitleVal;

  }

  @Input()        // setting the server url from project
  set serverUrl(serverUrlVal: any) {
    this.serverUrlValue = (serverUrlVal) || '<no name set>';
    this.serverUrlValue = serverUrlVal;

  }

  @Input()      // set the from logo

  set logo(logoVal: any) {
    this.logoValue = logoVal;
  }

  @Input()          // set the endpoint and source

  set addEndpoint(addEndpointval: any) {
    this.addEndpointValue = addEndpointval;
  }


  @Input()          // setting the navigate By Sign Up Url from project
  set signUpRouteingUrl(routeingUrlval: any) {
    this.signUpRouteingUrlValue = (routeingUrlval) || '<no name set>';
    this.signUpRouteingUrlValue = routeingUrlval;
    // console.log(this.signUpRouteingUrlValue)
  }

  @Input()          // setting the navigate By Sign Up Url from project
  set loginRouteingUrl(routeingUrlval: any) {
    this.loginRouteingUrlValue = (routeingUrlval) || '<no name set>';
    this.loginRouteingUrlValue = routeingUrlval;
    // console.log(this.loginRouteingUrlValue)
  }

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public apiService: ApiService,
    private snackBar: MatSnackBar
  ) {



    this.forgetPasswordForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],

    });




  }

  ngOnInit() {
    this.apiService.clearServerUrl();       //  Clear the server url
    setTimeout(() => {
      this.apiService.setServerUrl(this.serverUrlValue);        //  set the server url
    }, 50);
    // console.log(this.serverURL);


    this.apiService.clearaddEndpoint();       //  Clear the endpoint
    setTimeout(() => {
      this.apiService.setaddEndpoint(this.addEndpointValue.endpoint);   //  set the endpoint
    }, 50);
  }

  /********* Forget password  Form Submit start here*********/
  forgetPasswordSubmit() {
    let x: any;

    //  This for-loop use for from blank or properly validated checking  
    for (x in this.forgetPasswordForm.controls) {
      this.forgetPasswordForm.controls[x].markAsTouched();
    }
    if (this.forgetPasswordForm.valid) {    //    validation checking

      // this.openSnackBar();              // open snack-bar function

      let link: any = this.serverUrlValue;
      let data: any = this.forgetPasswordForm.value;

      data.domainUrl = this.domainUrlValue;

      this.apiService.forgetPassword(data).subscribe((response) => {
        // console.log(response);
        let result: any = {};
        result = response;

        if (result.status == "success") {
          // this.openSnackBar();             // open snack-bar function
          // this is use for reset the from
          this.formDirective.resetForm();
          this.message = '';         // clear the from
        } else {

          // display error message on html
          this.message = result.msg;      // show the error message

        }
      });
    }
  }

  /********* Forget password  Form Submit end here*********/


  /********* openSnackBar function open start here*********/


  openSnackBar() {
    this.snackBar.openFromComponent(snackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
 /********* openSnackBar function open end here*********/


  // This is use for navigate this component to sign-Up component 
  signup() {
    this.router.navigateByUrl('/' + this.signUpRouteingUrlValue);
  }

    // This is use for navigate this component to login component 
    login() {
      this.router.navigateByUrl('/' + this.loginRouteingUrlValue);
    }

  inputUntouched(val: any) {
    this.forgetPasswordForm.controls[val].markAsUntouched();
  }


  customFunction(link: any) {
    this.router.navigateByUrl('/'+ link);
  }


}


@Component({
  selector: 'snack-bar-modale',
  templateUrl: 'forget-passwordModale.html',
  styles: [`
    .example {
      color: aliceblue;
      background-color: yellowgreen;
    }
  `],
})
export class snackBarComponent { }
