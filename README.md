# Transl8r

## About the Project

Transl8r is an app designed to connect people and translators to provide fast, effective translations via live chat, video calls or image modification.

## Contributors

- [Richard Barnes](https://www.linkedin.com/in/richard-barnes-cmgr/)
- [Francesco Elia Foradori](https://www.linkedin.com/in/francesco-elia-foradori/)
- [Thomas Macfie](https://www.linkedin.com/in/tom-macfie-bb4832175/)
- [Christian Letter](www.linkedin.com/in/christian-letter)

## Technologies

The technologies we used to build this app:

### Frontend

[React](https://reactjs.org/), [SCSS](https://sass-lang.com/documentation), [ReactQuery](https://react-query.tanstack.com/), [React-toastify](https://fkhadra.github.io/react-toastify/introduction)

### Backend

[PostgreSQL](https://www.postgresql.org/), [Sequelize](https://sequelize.org/), [NodeJs](https://nodejs.org/en/), [Express](http://expressjs.com/)

### Others

[JWT](https://jwt.io/), [PeerJS](https://peerjs.com/), [Socket.io](https://socket.io/), [Cloudinary](http://cloudinary.com/), [Markerjs](https://markerjs.com/products/markerjs/)

## Screenshots

![Screenshot 2021-10-22 at 13 37 10](https://user-images.githubusercontent.com/77243567/138455321-0d96dc69-3ac9-45f7-a14f-07732c9cfeea.png)

![Screenshot 2021-10-22 at 13 39 29](https://user-images.githubusercontent.com/77243567/138455353-07c80739-b138-4af5-b0f1-338b5d94895e.png)

![Screenshot 2021-10-22 at 13 40 08](https://user-images.githubusercontent.com/77243567/138455378-0cb33c8b-d93e-4f69-a68f-5744ceb52141.png)

## Getting Started

There's a few things you need to do to get started:

### Prerequsites

- npm

```
npm install npm@latest -g
```

- API Keys

  - Cloudinary

- Database

You will need to create a Postgres database. You can set the name and password of this database in the servers environment variables as shown in the .env.example file

1. Clone this repo

2. `transl8r/client % npm install`

3. `transl8r/server % npm install`

4. Create `server/.env` using `server/.env.example` as a template

5. Create `client/.env` using `client/.env.example` as a template

### BackEnd

- This will create the tables in the Postgresql database.

```
transl8r/server npx nodemon
```

- This will populate the databases language table. Please note that you will need to run the above command first.

```
transl8r/server npm run populate
```

- Now fire up database with the populated languages and you're good to go!

```
transl8r/server npx nodemon
```

### FrontEnd

```
transl8r/client % npm start
```
