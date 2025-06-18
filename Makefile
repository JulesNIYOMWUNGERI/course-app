run-clean:
	cd ./backend && mvn clean install quarkus:dev
run-dev:
	cd ./backend && mvn quarkus:dev