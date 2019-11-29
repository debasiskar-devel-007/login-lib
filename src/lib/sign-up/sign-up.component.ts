import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { ApiService } from '../api.service';



export interface DialogData {
  value: string;
  Url: any;
}

@Component({
  selector: 'lib-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public value: any='';
  public link: any='';
  public Url: any='';
  public message: any = '';

  //   FormGroupDirective: It is a directive that binds an existing FormGroup to a DOM element.
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  public formTitleValue: any = '';
  public serverUrlValue: any = '';
  public forgetRouteingUrlValue: any = '';
  public loginRouteingUrlValue: any = '';
  public addEndpointValue: any = '';
  public logoValue: any = '';
  public typevalue: any = '';
  public buttonNameValue: any = '';

  @Input()         // Set the Form name
  set formTitle(formTitleVal: any) {
    this.formTitleValue = (formTitleVal) || '<no name set>';
    this.formTitleValue = formTitleVal;
    // console.log(this.formTitleValue);

  }

  @Input()
  set buttonName (buttonNameVal :any){
    this.buttonNameValue = (buttonNameVal) || '<no name set>';
    this.buttonNameValue = buttonNameVal
  }

  @Input()        // setting the server url from project
  set serverUrl(serverUrlVal: any) {
    this.serverUrlValue = (serverUrlVal) || '<no name set>';
    this.serverUrlValue = serverUrlVal;
    // console.log(this.serverUrlValue);

  }
@Input()      // set the from logo

set logo(logoVal : any) {
  this.logoValue = logoVal;
}

@Input()      // set the from logo

set modaleLogo(modaleLogoVal : any) {
  this.link = modaleLogoVal;
}

@Input()
set userType(typeval: any) {
  this.typevalue = typeval;
}


  @Input()        // set the endpoint And source
  public set addEndpoint(addEndpointVal: any) {
    this.addEndpointValue = addEndpointVal;
    console.log(this.addEndpointValue)
  }


  @Input()          // setting the navigate By Forget Password Url from project
  set forgetRouteingUrl(routeingUrlval: any) {
    this.forgetRouteingUrlValue = (routeingUrlval) || '<no name set>';
    this.forgetRouteingUrlValue = routeingUrlval;
    // console.log(this.forgetRouteingUrlValue);
  }

  @Input()          // setting the navigate By login Url from project
  set loginRouteingUrl(routeingUrlval: any) {
    this.loginRouteingUrlValue = (routeingUrlval) || '<no name set>';
    this.loginRouteingUrlValue = routeingUrlval;
    // console.log(this.loginRouteingUrlValue);
  }



  public signUpForm: FormGroup;

  constructor(public fb: FormBuilder, public http: HttpClient, public router: Router, public dialog: MatDialog, public apiService: ApiService) {
    this.signUpForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required]
    })


    this.http.get(this.serverUrlValue + 'gettemptoken').subscribe(res=>{
      console.log(res);
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


/********* Sign Up Form Submit start here*********/ 
  signUpFormSubmit() {
    this.http.get(this.serverUrlValue + 'gettemptoken').subscribe(res=>{
      console.log(res);
    });
    console.log('jhgj')
    this.apiService.jwtTokenGet().subscribe((response) => {});
    // use for validation checking
    for (let x in this.signUpForm.controls) {
      this.signUpForm.controls[x].markAsTouched();
    }
    if (this.signUpForm.valid) {
      // let link: any = this.fullUrlValue;
      let allData: any = this.signUpForm.value;
      allData.type = this.typevalue;
      console.log(allData);

      let data: any = {
        'data': allData,
        "source": this.addEndpointValue.source
      };
      console.log(data);
      this.apiService.addData(data).subscribe((response) => {
        let result: any = {};
        result = response;
        console.log(result);

        if (result.status == "success") {
          const dialogRef = this.dialog.open(successModalComponent, {
            width: '250px',
            data: {value: result.status, Url: this.link}
          });
          // this.router.navigateByUrl('/' + )     // navigate to dashboard url 


          // this is use for reset the from
          this.formDirective.resetForm();
        } else {
          // display error message on html
          this.message = result.msg;
        }
      })

    }
  }


/********* Sign Up Form Submit end here*********/ 

  // This is use for navigate this component to forget component 
  forgetpassword() {
    this.router.navigateByUrl('/' + this.forgetRouteingUrlValue.path);
  }


  // This is use for navigate this component to forget component 
  login() {
    this.router.navigateByUrl('/' + this.loginRouteingUrlValue.path);
  }

  inputUntouched(val: any) {
    this.signUpForm.controls[val].markAsUntouched();
  }
  customFunction(link: any) {
    this.router.navigateByUrl('/'+ link);
  }
}


@Component({
  selector: 'successModal',
  templateUrl: '../successModal.html',

})
export class successModalComponent {

  constructor(
    public dialogRef: MatDialogRef<successModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      console.log(data)
     }

    
  onNoClick(): void {
    this.dialogRef.close();
  }

}


