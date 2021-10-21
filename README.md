# Transl8r

## About the Project

Transl8r is an app designed to connect people and translators to provide fast, effective translations via live chat, video calls or image modification.

## Contributors

- [Richard Barnes](https://www.linkedin.com/in/richard-barnes-cmgr-421996a9/)
- [Francesco Elia Foradori](https://github.com/Fora00)
- [Thomas Macfie](https://www.linkedin.com/in/tom-macfie-bb4832175/)
- [Christian Letter](https://github.com/ChrisLetter)

## Technologies

The technologies we used to build this app:

### Frontend

[React](https://reactjs.org/), [SCSS](https://sass-lang.com/documentation), [ReactQuery](https://react-query.tanstack.com/), [React-toastify](https://fkhadra.github.io/react-toastify/introduction)

### Backend

[PostgreSQL](https://www.postgresql.org/), [Sequelize](https://sequelize.org/), [NodeJs](https://nodejs.org/en/), [Express](http://expressjs.com/)

### Others

[JWT](https://jwt.io/), [PeerJS](https://peerjs.com/), [Socket.io](https://socket.io/), [Cloudinary](http://cloudinary.com/), [Markerjs](https://markerjs.com/products/markerjs/)

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

- This will create the tables in the Postgresql database

```
transl8r/server npx nodemon
```

- This will populate the databases language table

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
