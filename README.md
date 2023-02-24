# Welcome to Ballot Online

An awesome voting application created with Gatsby JS front end and Django backend.
A Postgres database is used with GraphQL to query data.
The schema is transformed from SQL to GraphQL using django-graphene.

# Usage

## Installation

Requirements:

- Python3.8 or higher
- Node v18 or higher
- PostgresQL database for production server

1. Clone the repo

2. Create virtual environment, python3.8 or higher is required

```sh
python3 -m venv venv
source venv/bin/activate
```

3. Install backend dependencies

```sh
pip3 install -r requirements.txt
```

4. Install frontend dependencies

Note:
Currently version are not compatible
Need help to upgrade material-ui dependency

```sh
npm install --legacy-peer-deps
```

## Development Mode

1. Run backend

Note:
Backend is run at port 8004

```sh
cd backend
python3 manage.py runserver 8004
cd ..
```

2. Run gatsby frontend development server

```sh
npm run start
```

## Production Mode

1. Run backend server

```sh
cd backend
../venv/bin/gunicorn app.wsgi:application -c app/gunicorn.config.py

```

2. Server gatsby public directory with Nginx

## Create your own account and make a vote today !!

NOTES:

- The project is still in beta phase
- Currently Actual voting on an item does not increment count(help needed)

### Website URL:

[voting-app](https://ballot-online.zeroisone.io)

## Project Info

## Features:

- User login / logout
- User registration
- Question creation
- Voting on questions

## Technologies

- Apollo GraphQL
- Gatsby JS
- Django
- React
- Material UI
- Nginx
- Django Graphene
- GraphQL
