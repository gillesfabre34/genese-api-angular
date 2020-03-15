# genese-api-angular  [![npm version](https://badge.fury.io/js/genese-api-angular.svg)](https://badge.fury.io/js/genese-api-angular)

genese-api-angular is a code generator for Angular apps.

Create you OpenApi file and lauch genese-api-angular : all your DTOs and data-services will be automatically generated ! Moreover, all these data-services will use and return highly typed objects corresponding to the schemas included in you OpenApi file.
 
Less code, less tests, less bugs, less waste of time.


## Table of Contents
* [Why use genese-api-angular ?](#why-use-genese-api-angular-)
* [Installation](#1-installation)
* [Configuration](#2-configuration)
* [Code generation](#3-code-generation)
* [Usage](#4-usage)


## Why use genese-api-angular ?

This module is a powerful tool which will improve your productivity in building web apps. 

genese-api-angular is the Genese module used for Angular applications, which will save your time and help you to code Angular applications much faster. With genese-api-angular, all your Angular data-services and all your DTOs will be automatically generated ! No more html requests, no more mappers, no more tests of mappers...  Genese replaces the http requests located in your services, and replaces too the mappers used to format data coming from backend into typed objects.

Moreover, genese-api-angular uses under the hood the core of the Genese framework : [genese-mapper](https://www.npmjs.com/package/genese-mapper). Returning typed objects from your data-services to your components is fundamental : if you do not, your component could receive incorrect data from the backend, and your application would crash automatically. That's why the mappers are so important. Unfortunately, writing mappers is long and fastidious. More, you need to write unit tests for your mappers, and add some mock values to be able to do these tests. Idem for your http requests, which should be tested with some tools like HttMock. That's why writing data-services is so long and fastidious. 

genese-api-angular calls the http requests for you, and uses a Generic mapper which will send you back objects automatically typed !

 * ***DTOs***
 
 No need to write any data-model or DTO : genese-api-angular will create them automatically (using your OpenApi file)
 * ***DATA-SERVICES***
 
 No need to write any data-service. No HTML requests, no mappers : genese-api-angular will create them for you (using your OpenApi file)
 * ***GET requests***
 
 You will be sure that the objects received from your GET requests have correct type (under the hood, genese-mapper maps all your data)
 * ***PUT and POST requests***
 
 You will be sure to send correctly typed objects in your POST or PUT requests (with auto-completion in your preferred IDE)
 
 For more information about OpenApi specifications : [Swagger official website](https://swagger.io/specification/)

[Top](#table-of-contents)
## 1. Installation

At first you need to install the npm module:

```sh
npm install genese-api-angular
```

The minimum Angular version is Angular 8.

---

[Top](#table-of-contents)
#### 2. Configuration

In your `package.json`, just add this line :

`package.json`
```ts
{
    //...
    "scripts": {
        //...
        "genese-api": "node node_modules/genese-api-angular/index.js"
        //...
    }
    //...
}
```

---

[Top](#table-of-contents)
#### 3. Code generation

At first, you must create your OpenApi file. You can do that easily with the excellent [Apicurio application](https://www.apicur.io/). Download the JSON file of your API and put it in the root folder of your application, with the name `genese-api.json`.

After that, you just need to enter this code in your terminal :

```ts
    npm run genese-api
```

It will generate a folder "genese/genese-api". Inside it, you will find all your DTOs and data-services, ready to use !

---

[Top](#table-of-contents)
#### 4. Usage

For this npm version, the data-services are not yet implemented. Be patient ! 

However, you can use for now the [genese-angular](https://www.npmjs.com/package/genese-angular) module.
