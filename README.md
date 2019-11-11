# Waste Exchange Frontend

Frontend for [indiawasteexchange.com](https://www.indiawasteexchange.com/).

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

    To seed test data in to the database refer the [backend readme](https://github.com/chennaitricolor/wastexchange-be#dev-machine-setup).

5. Install node modules:
    ```
    npm install
    ```
6. Start the application and watch for changes:
    ```
    npm run start-dev
    ```
    You will be able to access the running app [here](http://localhost:4201/)

## Deployment

### Build and Push Docker Image

```
# build
docker build -t chennaitricolor/wastexchange-fe:$(git rev-parse --short HEAD) -t chennaitricolor/wastexchange-fe:latest .

# push
docker push chennaitricolor/wastexchange-fe:$(git rev-parse --short HEAD)
docker push chennaitricolor/wastexchange-fe:latest
```

### Deploy Docker Image

* Install Ansible 2.8.3
* Run the ansible playbook
	```
	ansible-playbook -i deployment/inventory.yaml \
		--private-key <ssh-private-key> \
		--extra-vars "env=<staging|production> app_version=$(git rev-parse --short HEAD)" \
		deployment/playbook.yaml
	```

### Interesting urls:

| Env | URL |
| --- | --- |
| Staging env (FE) | https://staging.madraswasteexchange.com/ |
| Production env (FE) | https://www.madraswasteexchange.com/ |
| CI | |
| Trello | https://trello.com/b/LxUGt20J/waste-exchange |
