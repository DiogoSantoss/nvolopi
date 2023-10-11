docker pull mongo
docker run --name mongodb_nvolopi -p 3001:3001 mongo
docker exec -it mongodb_nvolopi /bin/bash
mongosh
use nvolopi (maybe optional)