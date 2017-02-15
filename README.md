# TEMPTATION ISLAND API

**Table of Contents**

- [TEMPTATION ISLAND API](#)
	- [API SPECS](#)
		- [USERS](#)
			- [GET /users](#)
			- [GET /users/:id](#)
			- [POST /users](#)
		- [TEMPTATIONS](#)
			- [GET /temptations?amount=[default: 3]&gender=[male|female|all, default: all]](#)
		- [GAMES](#)
			- [POST /users/:id/games](#)
	- [INSTALLATION](#)
	- [TESTING](#)
    
## API SPECS

### USERS

#### GET /users

```
GET /users

200 OK
Content-Type: application/json

{
    "users": {
        [
            {
                "id": 1,
                "name": "Jean",
                "temptationIq": 10,
                "games_played": 5
            }
        ]
    }
}
```

#### GET /users/:id

```
GET /users/:id

200 OK
Content-Type: application/json

{
    "user": {
        "id": 1,
        "name": "Jean",
        "temptationIq": 10,
        "games_played": 5
    }
}
```

#### POST /users

```
POST /users
Content-Type: application/json

{
  "name": "Jean"
}

200 OK
Content-Type: application/json

{
  "id": 1,
  "name": "Jean",
  "temptationIq": 100,
  "games_played": 0
}

400 INVALID REQUEST
Content-Type: application/json

{
    "errors": {
        "status": 400,
        "title": "Invalid Request",
        "Detail": "Name is required"

    }
}
```

### TEMPTATIONS

#### GET /temptations?amount=[default: 3]&gender=[male|female|all, default: all]

```
GET /temptations?amount=[default: 3]&gender=[male|female|all, default: all]

200 OK
Content-Type: application/json

{
    "temptations": [
        {
            id: 1,
            name: 'Sabrina',
            imageUrl: 'http://...',
            gender: 'female',
            iq: 50
        },
        {
            id: 5,
            name: 'Sonja',
            imageUrl: 'http://...',
            gender: 'female',
            iq: 100
        },
        {
            id: 2,
            name: 'Piet',
            imageUrl: 'http://...',
            gender: 'male',
            iq: 79
        }
    ],
    "available_names": ['Jos', 'Maria', ...],
}
```

### GAMES

#### POST /users/:id/games

```
POST /users/:id/games
Content-Type: application/json

{
    "game": {
        "answers": [
            {
                temptationId: 1,
                name: 'Sonja',
                iq: 34
            },
            {
                temptationId: 5,
                name: 'Sara',
                iq: 3
            },
            {
                temptationId: 8,
                name: 'Ronny',
                iq: 14
            }
        ]
    ]
}

200 OK
Content-Type: application/json
{
    "game": {
        "score": 12, # /100
    },
    "user": {
        "id": 1,
        "name": "Pol",
        "temptationIq": 56,
        "gamesPlayed": 1
    }
}

400 INVALID REQUEST
Content-Type: application/json

{
    "errors": {
        "status": 400,
        "title": "Invalid Request",
        "Detail": ""

    }
}
```

## INSTALLATION

* `git clone git@github.com:icapps/testing-mill.git`

* `yarn install` or `npm install`

* update `database.json` with correct db details

* seed database with temptation data: `sequelize db:migrate --env [development|production]`

* `npm start`

## TESTING

* Run the database: `docker-compose up`

* seed database with temptation data: `sequelize db:migrate --env test`

* `npm test`
