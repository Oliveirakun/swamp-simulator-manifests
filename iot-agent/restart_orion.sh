docker-compose stop
docker ps -a | grep 'orion' | awk '{print $1}' | xargs docker rm
nohup docker-compose up &
