## Getting Started

Create a new .env.local file in the root folder and add the following:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="[a secret string]"
WEAVY_SERVER="[Url to the Weavy server]"
WEAVY_APIKEY="[The Weavy server api key]"
```

If you want to deploy to production, create a .env.production file and add all of the above. You may also need the following:

```
NEXTAUTH_URL_INTERNAL="[The url to the deployed site]"
```

Install the packages
```bash
npm install
```

Install @weavy/uikit-react
```bash
npm install @weavy/uikit-react
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


