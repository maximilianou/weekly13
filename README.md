### ../../../Do.md 
# weekly13
tdd angular jwt

### ../../../app13/Makefile 
```
ng1:
	nvm install 14
	nvm use 14
	npm install -g npm@latest
	npm install -g @angular/cli
	ng new frontend
ng2: 
	cd frontend && ng serve
ng3:
	docker-compose -f docker-compose.dev.yml up	--build
ng4:
	docker-compose -f docker-compose.dev.yml down	
ng5: 
	docker system prune -a # delete all docker images in your computer
ng10:
	cd frontend && ng generate module login --routing
	cd frontend && ng generate component login
#ng6:
#	mkdir api
#	cd api && npm init -y
#	cd api && npm install nodemon --save-dev
#	cd api && npm install bcryptjs body-parser cors express jsonwebtoken mongoose validator --save	
#ng8:
#	#cd frontend && ng generate module app-routing --flat --module=app
#	cd frontend && ng generate component home
#	cd frontend && ng generate component header
#	cd frontend && ng generate component profile
#	cd frontend && ng generate component auth
#	cd frontend && ng generate module auth
#	cd frontend && ng generate service auth/auth
#	cd frontend && ng generate guard auth/auth
#	cd frontend && ng generate component auth/register
#	cd frontend && ng generate component auth/login
#	cd frontend && npm install bootstrap --save
#	cd frontend && npm install @auth0/angular-jwt --save
#	cd frontend && npm install moment --save

#ng9:
	#cd frontend && npm install angular-in-memory-web-api --save
	#cd frontend && ng generate service InMemoryData
	#cd frontend && ng generate component dish-search



```
### ../../../app13/docker-compose.dev.yml 
```
version: "3.8" # specify docker-compose version

# Define the services/containers to be run
services:
  cook13_angular: # name of the first service
    build: # specify the directory of the Dockerfile
      context: ./frontend
      dockerfile: Dockerfile.dev
    container_name: cook13_angular
    volumes:
      - ./frontend:/frontend
      - /frontend/node_modules
    ports:
      - "4200:4200" # specify port forewarding
      - "49153:49153"
    environment:
      - NODE_ENV=dev

#  cook13_express: #name of the second service
#    build: # specify the directory of the Dockerfile
#      context: ./api
#      dockerfile: Dockerfile.dev
#    container_name: cook13_express
#    volumes:
#      - ./api:/api
#      - /api/node_modules
#    ports:
#      - "5000:5000" #specify ports forewarding
#    environment:
#      - PORT=5000
#      - SECRET=Thisismysecretforjwt
#      - NODE_ENV=development
#      - MONGO_DB_USERNAME=admin-user
#      - MONGO_DB_PASSWORD=admin-password
#      - MONGO_DB_HOST=cook13_database
#      - MONGO_DB_PORT=
#      - MONGO_DB_PARAMETERS=?authSource=admin
#      - MONGO_DB_DATABASE=mean-contacts
#    links:
#      - database

#  cook13_database: # name of the third service
#    image: mongo # specify image to build container from
#    container_name: cook13_mongo
#    environment:
#      - MONGO_INITDB_ROOT_USERNAME=admin-user
#      - MONGO_INITDB_ROOT_PASSWORD=admin-password
#      - MONGO_DB_USERNAME=admin-user1
#      - MONGO_DB_PASSWORD=admin-password1
#      - MONGO_DB=mean-contacts
#    volumes:
#      - ./mongo:/home/mongodb
#      - ./mongo/init-db.d/:/docker-entrypoint-initdb.d/
#      - ./mongo/db:/data/db
#    ports:
#      - "27017:27017" # specify port forewarding

#  cook13_nginx: #name of the fourth service
#    build: loadbalancer # specify the directory of the Dockerfile
#    container_name: cook13_nginx
#    ports:
#      - "8046:80" #specify ports forewarding
#    links:
#      - cook13_express
#      - cook13_angular


```
### ../../../app13/frontend/Dockerfile.dev 
```
# Create image based off of the official 12.8-alpine
FROM node:14-alpine
# disabling ssl for npm for Dev or if you are behind proxy
RUN npm set strict-ssl false

RUN apk add --no-cache nodejs nodejs-npm bash chromium nss chromium-chromedriver && \
    apk upgrade --no-cache --available && \
    npm config set unsafe-perm true && \
    npm install -g @angular/cli npm-snapshot && \
    npm cache clean --force

ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_DRIVER=/usr/bin/chromedriver

#RUN echo "nameserver 8.8.8.8" |  tee /etc/resolv.conf > /dev/null
WORKDIR /frontend
# Copy dependency definitions
COPY package.json ./
## installing and Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i
COPY . .
EXPOSE 4200 49153
CMD ["npm", "start"]

```
### ../../../app13/frontend/karma.conf.js 
```
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "./coverage/frontend"),
      reports: ["html", "lcovonly", "text-summary"],
      fixWebpackSourcePaths: true,
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    customLaunchers: {
      Chrome_without_sandox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"],
      },
    },
    browsers: ["Chrome"],
    singleRun: false,
    restartOnFileChange: true,
  });
};

```
### ../../../app13/frontend/package.json 
```
{
  "name": "frontend",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve --disableHostCheck=true --host=0.0.0.0 ",
    "build": "ng build",
    "test": "ng test ",
    "test:ci": "ng test --watch=false --browsers=Chrome_without_sandox --code-coverage=true  ",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "~10.0.5",
    "@angular/common": "~10.0.5",
    "@angular/compiler": "~10.0.5",
    "@angular/core": "~10.0.5",
    "@angular/forms": "~10.0.5",
    "@angular/platform-browser": "~10.0.5",
    "@angular/platform-browser-dynamic": "~10.0.5",
    "@angular/router": "~10.0.5",
    "rxjs": "~6.5.5",
    "tslib": "^2.0.0",
    "zone.js": "~0.10.3"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~0.1000.4",
    "@angular/cli": "~10.0.4",
    "@angular/compiler-cli": "~10.0.5",
    "@types/node": "^12.11.1",
    "@types/jasmine": "~3.5.0",
    "@types/jasminewd2": "~2.0.3",
    "codelyzer": "^6.0.0",
    "jasmine-core": "~3.5.0",
    "jasmine-spec-reporter": "~5.0.0",
    "karma": "~5.0.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage-istanbul-reporter": "~3.0.2",
    "karma-jasmine": "~3.3.0",
    "karma-jasmine-html-reporter": "^1.5.0",
    "protractor": "~7.0.0",
    "ts-node": "~8.3.0",
    "tslint": "~6.1.0",
    "typescript": "~3.9.5"
  }
}

```
### ../../../app13/frontend/src/app/app.component.spec.ts 
```
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.nativeElement.querySelector('router-outlet')).not.toBeNull();
  });
});

```
### ../../../app13/frontend/src/app/app.component.ts 
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}

```
### ../../../app13/frontend/src/app/app.component.html 
```
<router-outlet></router-outlet>
```
### ../../../app13/frontend/src/app/login/login.component.spec.ts 
```
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render form with email and password inputs', () => {
    const element = fixture.nativeElement;
    expect(element.querySelector('form')).toBeTruthy();
    expect(element.querySelector('#email')).toBeTruthy();
    expect(element.querySelector('#password')).toBeTruthy();
    expect(element.querySelector('button')).toBeTruthy();
  });  
  it('should return model invalid when form is empty', () => {
    expect(component.form.valid).toBeFalsy();
  });
  it('should validate email input as required', () => {
    const email = component.form.controls.email;
    expect(email.valid).toBeFalsy();
    expect(email.errors.required).toBeTruthy();
  });
  it('should validate password input as required', () => {
    const password = component.form.controls.password;
    expect(password.valid).toBeFalsy();
    expect(password.errors.required).toBeTruthy();
  });
  it('should validate email format', () => {
    const email = component.form.controls.email;
    email.setValue('testing');
    const errors = email.errors;
    expect(errors.required).toBeFalsy();
    expect(errors.pattern).toBeTruthy();
    expect(email.valid).toBeFalsy();
  });
  it('should validate email format correct', () => {
    const email = component.form.controls.email;
    email.setValue('testing@gmail.com');
    const errors = email.errors || {};
    expect(errors.required).toBeFalsy();
    expect(errors.pattern).toBeFalsy();
    expect(email.valid).toBeTruthy();
  });
  it('should render email validation message when formControl is submitted and invalid', () => {
    const elements: HTMLElement = fixture.nativeElement;
    expect(elements.querySelector('#email-error')).toBeFalsy();
    // component.onSubmit(); false positive
    elements.querySelector('button').click(); //
    fixture.detectChanges();
    expect(elements.querySelector('#email-error')).toBeTruthy();
    expect(elements.querySelector('#email-error').textContent).toContain(
      'Please enter a valid email.'
      );
  });
  it('should render password validation message when formControl is submitted and invalid', () => {
    const elements: HTMLElement = fixture.nativeElement;
    expect(elements.querySelector('#password-error')).toBeFalsy();
    // component.onSubmit(); false positive
    elements.querySelector('button').click(); //
    fixture.detectChanges();
    expect(elements.querySelector('#password-error')).toBeTruthy();
    expect(elements.querySelector('#password-error').textContent).toContain(
      'Please enter a valid password.'
      );
  });
});


```
### ../../../app13/frontend/src/app/login/login.component.html 
```
<form [formGroup]="form" (ngSubmit)='onSubmit()'>
    <input id="email" type="email" placeholder="Your email" />
    <span *ngIf='submitted && form.controls.email.invalid' id='email-error'>Please enter a valid email.</span>
    <input id="password" type="password" placeholder="********" />
    <span *ngIf='submitted && form.controls.password.invalid' id='password-error'>Please enter a valid password.</span>
    <button type="submit">Sign in</button>
  </form>

```
### ../../../app13/frontend/src/app/login/login.component.ts 
```
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private  formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
      this.submitted = true;
  }

}

```
### ../../../app13/frontend/src/app/login/login.module.ts 
```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule { }

```
