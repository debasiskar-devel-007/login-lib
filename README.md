# Login

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

## Code scaffolding

Run `ng generate component component-name --project login` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project login`.
> Note: Don't forget to add `--project login` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build login` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build login`, go to the dist folder `cd dist/login` and run `npm publish`.

## Running unit tests

Run `ng test login` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Login lib install
1. `npm install login-lib-influxiq`

2. create a component like login   `ng g c login`

3. Ts page
`
  public logo: any = '../../assets/favicon.ico';
  public fromTitle: any = "Login Form";    // This is a From Title 
  public fullUrl: any = "https://o820cv2lu8.execute-api.us-east-2.amazonaws.com/production/api/";  // server url
  public endpoint: any = "login";
  public buttonName:any= 'Login Button';
  public signUpRouteingUrl: any = { 
    "path":"",
    "buttonName":"sign-up",
    "customLink":"",
    "customURl":"https://advancedwellness.pro/"
  };

  public forgetRouteingUrl: any = {
    // "path":"forget-password",
    "path":"",
    "buttonName":"forget-password",
    "customLink":"/forget-password",
    "customURl":"http://www.fjhj.lkj/cx"
  };
  public routerStatus: any;
  constructor() {
    this.routerStatus = {           // this is use for if login succcess then navigate which page 
      "data": [
        {
          "type": "admin",
          "routerNav": "forget-password"
        },
        {
          "type": "user",
          "routerNav": "userDashbord"
        },
        {
          "type": "model",
          "routerNav": "modelDashbord"
        }
      ]
    }

  }

  `
4. html page

`
<lib-login [fromTitle]="fromTitle" [fullUrl]="fullUrl" [forgetRouteingUrl]="forgetRouteingUrl"
    [signUpRouteingUrl]='signUpRouteingUrl' [routerStatus]="routerStatus" [endpoint]="endpoint"
     [logo]="logo" [buttonName]="buttonName"></lib-login>
`

5. 