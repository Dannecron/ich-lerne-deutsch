up:
	docker-compose up -d

up-build:
	docker-compose up --build -d

down:
	docker-compose down

ps:
	docker-compose ps

logs:
	docker-compose logs --tail 100

logs-follow:
	docker-compose logs --tail 100 -f

firestore-import:
	docker-compose exec app firestore-import --yes --backupFile /var/www/vue/data/back-up.json
 