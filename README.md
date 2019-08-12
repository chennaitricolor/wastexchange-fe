# Waste Exchange Frontend

Frontend for [indiawasteexchange.com](https://indiawasteexchange.com).

## Dev Machine Setup

1. Install [NodeJS 10.16 LTS](https://nodejs.org/en/)
2. Install [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/)
3. Clone the [frontend](https://github.com/chennaitricolor/wastexchange-fe) and [backend](https://github.com/chennaitricolor/wastexchange-fe) repositories. This setup assumes that both repositories are present in the same directory. For example:
	```
	chennaitricolor
	├── wastexchange-be
	└── wastexchange-fe
	```
4. Start dependencies (Postgres, backend application):
    ```
    docker-compose up

    # OR to rebuild the docker images before starting the services
    docker-compose up --build
    ```
5. Install node modules:
    ```
    npm install
    ```
6. Start the application and watch for changes:
    ```
    npm run start-dev
    ```
