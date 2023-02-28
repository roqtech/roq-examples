### NextJS With ROQ auth example

Running the Project Locally

To run the project locally, follow the steps below.

##### Install Dependencies

To install the project's dependencies, run the following command in your terminal:
`npm i`

This command installs the required packages and their dependencies defined in the package.json file.

##### Run the Database

To run the project's database, you can use Docker Compose. Docker Compose allows you to define and run multi-container Docker applications.

Run the following command in your terminal to start the database:

`docker compose up`

This command starts the database and any other services defined in the docker-compose.yml file. Make sure that you have Docker installed on your machine before running this command.

#### Generate Prisma Client

Prisma is an open-source database toolkit that provides a type-safe database client. The Prisma client is used to perform CRUD operations on the database.

To generate the Prisma client, run the following command in your terminal:

`npx prisma generate`

This command generates a Prisma client in the node_modules/.prisma/client directory. Make sure that you have the Prisma CLI installed globally before running this command.

### Run database schema migrations

Run the migrations with your local DB (check the env `DATABASE_URL` value):

`npx prisma migrate deploy`
