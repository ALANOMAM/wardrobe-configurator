# Setting up the project

## 1-Create and fix the env file

MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=mydb
MYSQL_USER=user
MYSQL_PASSWORD=password

DB_HOST=mysql
DB_USER=user
DB_PASSWORD=password
DB_NAME=mydb

## 2-Install the node modules fro frontend and backend folders

### `docker-compose run --rm npm-frontend npm install`

### `docker-compose run --rm npm-backend npm install`

## 3-Start the three containers

### `docker-compose up -d mysql backend frontend --build`

## 4-Enter in the backend container and run migrate and seed

### `docker exec -it <backend-container-id> sh`

### `npm run refresh-db`

The app runs in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

This project uses [Prime React](https://primereact.org/) and basic css for styling.

## Description
