docker exec -it 796f4e367091 /bin/sh
yarn knex seed:run

docker build -t city_hunter .
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

docker pull veronica528/city-hunter:latest

docker login
veronica528
47ea0632-750a-4052-ad2d-a59f50056880
