import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { DemoMaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent, successModalComponent } from './sign-up/sign-up.component';
import { ForgetPasswordComponent, snackBarComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent, snackBarResetComponent } from './reset-password/reset-password.component';
import { ApiService } from './api.service';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    successModalComponent,
    snackBarComponent,
    snackBarResetComponent,
    // commonModalComponent

  ],
  imports: [
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule
  ],
  exports: [LoginComponent, SignUpComponent, ForgetPasswordComponent, ResetPasswordComponent],
  providers: [ApiService],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [ successModalComponent, snackBarComponent, snackBarResetComponent]
})
export class LoginModule { }
