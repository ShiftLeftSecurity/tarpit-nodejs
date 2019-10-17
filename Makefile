package:
	docker build -t tarpit-expressjs-mongodb:latest .

start:
	docker-compose up --build --abort-on-container-exit --remove-orphans 
