# Start PostgreSQL database for test
docker-compose up -d

# Ping for readiness
echo "[test-database] not yet ready to accept connections"
WAIT_FOR_PG_ISREADY="while ! pg_isready; do sleep 1; done;"
docker-compose exec test-database bash -c "$WAIT_FOR_PG_ISREADY"
echo "[test-database] ready to accept connections"

# Execute test suite
echo "running all tests..."
yarn test

# Clean up
docker-compose down -v