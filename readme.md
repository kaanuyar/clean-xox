# What is this?

Simple **Tic-tac-toe** game server. Players can use http endpoints to relay game commands back and forth. Code structure tries to follow **Clean Architecture** (did my best)

<br>

# Running the application

## Requirements

#### Make sure you have the following installed:

- **NodeJS (v22.12.0+ recommended)**   
- **PostgreSQL (v17.2+ recommended)**

## Usage

### 1. Clone the repository

```
git clone https://github.com/kaanuyar/clean-xox.git
```

### 2. Install dependencies

```
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory. You can find the example from `.env.example` file.

### 4. Apply database migrations

Before applying database migrations, please be sure that the database connection string in `.env` file is correct. If the database does not exist, migration will fail.

```
npm run migration:migrate
```

### 5. Run the project

#### For production usage

```
npm run build
npm run start
```

#### For development usage

```
npm run dev
```

### 6. Explore endpoints

#### Swagger UI

Replace `{port}` with the value you have set in your `.env` file.

```
http://localhost:{port}/api-docs
```

#### VSCode REST Client

If you have the REST Client extension installed, you can run the sample `.http` requests from `requests` folder.