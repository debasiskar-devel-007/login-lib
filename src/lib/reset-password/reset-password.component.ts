import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'lib-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})



export class ResetPasswordComponent implements OnInit {
  //   FormGroupDirective: It is a directive that binds an existing FormGroup to a DOM element.
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  public resetPasswordForm: FormGroup;
  public fromTitleNameValue: any = '';
  public serverUrlValue: any = '';
  public message: any = '';
  public addEndpointValue: any = '';

  public logoValue: any = '';
  // public signUpRouteingUrlValue: any = '';
  public durationInSeconds = 5;             // This is SnackBar set time


  @Input()         // Set the Form name
  set fromTitleName(fromTitleNameVal: any) {
    this.fromTitleNameValue = (fromTitleNameVal) || '<no name set>';
    this.fromTitleNameValue = fromTitleNameVal;
    console.log(this.fromTitleNameValue);

  }


  @Input()        // setting the server url from project
  set serverUrl(serverUrlVal: any) {
    this.serverUrlValue = (serverUrlVal) || '<no name set>';
    this.serverUrlValue = serverUrlVal;
    console.log(this.serverUrlValue);

  }

  @Input()        // set the endpoint and source

  public set addEndpoint(addEndpointVal: any) {
    this.addEndpointValue = addEndpointVal;
  }

  @Input()      // set the from logo

set logo(logoVal : any) {
  this.logoValue = logoVal;
}


  // @Input()          // setting the navigate By Sign Up Url from project
  // set signUpRouteingUrl(routeingUrlval: any) {
  //   this.signUpRouteingUrlValue = (routeingUrlval) || '<no name set>';
  //   this.signUpRouteingUrlValue = routeingUrlval;
  //   console.log(this.signUpRouteingUrlValue);
  // }
  public accesscode: string;

  constructor(public fb: FormBuilder, public http: HttpClient, public router: Router, public route: ActivatedRoute, public apiService: ApiService,  private snackBar: MatSnackBar) {

    this.route.params.subscribe(params => {

      this.accesscode = params['token'];
      console.log(this.accesscode);
    })

    this.resetPasswordForm = this.fb.group({
      // password: ['',  Validators.compose([Validators.required, Validators.minLength(4)])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.machpassword('password', 'confirmPassword')
    })
  }

  ngOnInit() {
    this.apiService.clearServerUrl();       // Clear the server url
    setTimeout(() => {
      this.apiService.setServerUrl(this.serverUrlValue);       // set the server url 
    }, 50);
    // console.log(this.serverURL);


    this.apiService.clearaddEndpoint();       // clear the endpoint 
    setTimeout(() => {
      this.apiService.setaddEndpoint(this.addEndpointValue.endpoint);       // set the endpoint
    }, 50);
    // console.log(this.addEndpointData.endpoint);

  }
  //  this function is use for mach password and confirm Password 

  machpassword(passwordkye: string, confirmpasswordkye: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordkye],
        confirmpasswordInput = group.controls[confirmpasswordkye];
      if (passwordInput.value !== confirmpasswordInput.value) {
        return confirmpasswordInput.setErrors({ notEquivalent: true });
      }
      else {
        return confirmpasswordInput.setErrors(null);
      }
    };
  }



/********* Reset Password Form Submit start here*********/ 
  resetPasswordSubmit() {
    console.log(this.resetPasswordForm.value);
    let x: any;
    for (x in this.resetPasswordForm.controls) {
      this.resetPasswordForm.controls[x].markAsTouched();
    }
    if (this.resetPasswordForm.valid) {
      let data1: any = { "password": this.resetPasswordForm.value.password, "accesscode": this.accesscode }
      let data: any = {
        'data': data1,
        "source": this.addEndpointValue.source
      }


      // data.accesscode = this.accesscode;

      this.apiService.addData(data).subscribe((response) => {
        let result: any = {};
        result = response;
        console.log(result);
        if (result.status == "success") {
          this.openSnackBar();
          this.formDirective.resetForm();       // Use for reset the form
          this.message = '';
        } else {
          this.message = result.msg;
        }

      })
    }
  }


  openSnackBar() {
    this.snackBar.openFromComponent(snackBarResetComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }


/********* Reset Password Form Submit end here*********/ 


  inputUntouched(val: any) {
    this.resetPasswordForm.controls[val].markAsUntouched();
  }




}

@Component({
  selector: 'snack-bar-modale',
  template: `Password changed successfully`,
  styles: [`
    .example {
      color: aliceblue;
      background-color: yellowgreen;
    }
  `],
})
export class snackBarResetComponent { }
