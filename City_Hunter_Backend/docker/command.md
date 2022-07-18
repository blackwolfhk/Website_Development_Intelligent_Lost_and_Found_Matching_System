docker exec -it 0f3ab27c26f6 /bin/sh

docker build -t node-server .
docker tag city_hunter:latest veronica528/city-hunter:latest

<!-- docker push image -->

docker push veronica528/city-hunter:latest

<!-- Change docker account -->

docker login --username=
53b8ea56-

<!-- copy file and paste to ec2:enviroment -->

scp /Users/kelvin_cheung/Documents/Tecky_Academy/city_hunter_backend/docker/docker-compose.yml fp:/home/ubuntu/docker
scp /Users/kelvin_cheung/Documents/Tecky_Academy/city_hunter_backend/.env.docker fp:/home/ubuntu/docker

<!-- docker pull -->

docker pull jamesteckyio/c20-backend:latest

docker login
veronica528
47ea0632-750a-4052-ad2d-a59f50056880
