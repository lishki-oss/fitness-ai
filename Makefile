.PHONY: docs

docs:
	docker compose -f docs/docker-compose.yml up --build
