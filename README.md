<h1 align="center">
MERN COMMERCE API
</h1>

<h5 align="center">
REST API for E-Commerce platform.
</h5>

<p align="center">
    <a href="https://nodejs.org/en" target="_blank">
        <img src="https://img.shields.io/badge/Node.js-%3E%3D20-%2357A745" />
    </a>
    <a href="https://expressjs.com" target="_blank">
        <img src="https://img.shields.io/badge/Express-%3E%3D4.x-%23EEEEEE" />
    </a>
    <a href="https://www.mongodb.com" target="_blank">
        <img src="https://img.shields.io/badge/MongoDB-%3E%3D8.x-%23569134" />
    </a>
</p>

</br>

| [Requirements][] | [Install][] | [How to setting][] | [API Docs][] | [License][] |

## Requirements

	bcryptjs = ^2.x
    cookie-parser = ^1.x
    cors = ^2.x
    dotenv = ^16.x
    email-templates = ^11.x
    express = ^4.x
    express-async-errors = ^3.x
    express-fileupload = ^1.x
    express-mongo-sanitize = ^2.x
    express-rate-limit = ^7.x
    helmet = ^7.x
    http-status-codes = ^2.x
    joi = ^17.x
    jsonwebtoken = ^9.x
    mongoose = ^8.x
    mongoose-unique-validator = ^5.x
    nodemailer = ^6.x
    pug = ^3.x
    rate-limiter = ^0.x
    stripe = ^16.x
    swagger-ui-express = ^5.x

    dev dependecies:
    @eslint/js = ^9.x
    eslint = ^9.x
    globals = ^15.x

## Install

Clone repo

HTTPS:
```
git clone https://github.com/muhammadhabibfery/mern-simple-commerce-api.git
```
SSH:
```
git clone git@github.com:muhammadhabibfery/mern-simple-commerce-api.git
```

Install Nodejs

[Download Node.js](https://nodejs.org/en/download)


Install Nodemon Globally
```
npm install -g nodemon
```


Install Dependencies
```
npm install
```

## How to setting 

Create .env file, then setup some configuration with your own credentials
```
NODE_ENV=development
PORT=3000
MONGO_URI=<Your-MONGODB-Connection>
COOKIE_KEY=<Create-Your-Own-Key>
JWT_SECRET_KEY=<Create-Your-Own-Key>
STRIPE_PUBLISHABLE_KEY=<Your-Publishable-Key>
STRIPE_SECRET_KEY=<Your-Secret-Key>
MAIL_HOST=<Your-Mail-Host>
MAIL_PORT=<Your-Mail-Port>
MAIL_USERNAME=<Your-Mail-Username>
MAIL_PASSWORD=<Your-Mail-Password>
MAIL_FROM_NAME=<Your-Mail-Name>
MAIL_FROM_ADDRESS=<Your-Mail-Address>
```

Run the admin seeder

```
npm run seed
```

Run the local server

```
npm run dev
```

## API Docs
<img src="/public/api-docs.png" alt="Preview" width="75%"/>
</br>
<p style="font-weight: bold;">
Complete REST API Documentation can be found <a href="https://api-mern-commerce.muhammadhabibfery.com/api/v1/api-docs" target="_blank">here</a>
</p>


## License

> Copyright (C) 2024 Muhammad Habib Fery.  
**[⬆ back to top](#mern-commerce-api)**

[Requirements]:#requirements
[Install]:#install
[How to setting]:#how-to-setting
[API Docs]:#api-docs
[License]:#license
