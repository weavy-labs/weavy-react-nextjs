# React UI kit + Next.js

A simple Next.js application with best-practices, examples and guides on how to integrate the Weavy React UI kit. The application is structured like an intranet for the fictional ACME corporation and has basic features for user management including login, logout, editing user profiles and settings.

Some of the things showcased in the application are:

* Integration of the Weavy React UI kit components (chat, feed, files, messenger).
* How to implement and configure a token factory for authenticating your users.
* Syncing user and profile data from your appliction to Weavy.
* Server-to-server api requests with API keys.
* User-to-server api requests with access tokens.
* How to apply custom styling, including toggling light/dark mode.
* How to handle webhook events and update the user interface in realtime when these events happen, e.g. display a notification, update the count of unread messages etc.

## Prerequisites

* You need a Weavy environment up and running. See http://www.weavy.com/docs for more information.
* You need an API key for communication between your app and the Weavy environment (if you don't have an API key, you can generate one in your Weavy account). See http://www.weavy.com/docs for more information.

## Getting Started

Create a new .env file in the root folder and add the following:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="[a secret string]"
WEAVY_URL="[Url to the Weavy environment]"
WEAVY_APIKEY="[The Weavy environment api key]"
```

If you want to deploy to production, you may also need the following:

```
NEXTAUTH_URL_INTERNAL="[The url to the deployed site]"
```

Install the packages
```bash
npm install
```

Generate the Prisma client:
```bash
npx prisma generate
```


Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser. To login you can use any of the following credentials:
  
  - username: `admin`, `bugs`, `daffy`, `porky`, `tweety`, `wile`, or `meepmeep`
  - password: `acme`

...or register a new account.


