# Start PostgreSQL database for test
docker-compose -f docker-compose-test.yml up -d

# Ping for readiness
echo "[db] not yet ready to accept connections"
WAIT_FOR_PG_ISREADY="while ! pg_isready; do sleep 1; done;"
docker-compose exec test-database bash -c "$WAIT_FOR_PG_ISREADY"
echo "[db] ready to accept connections"

# Temporary fix to ensure container is fully ready
sleep 5

# Execute test suite
echo "running all tests..."
../node_modules/mocha/bin/mocha '../test/**/*-test.js' --recursive --timeout 10000 --exit

# Clean up
docker-compose -f docker-compose-test.yml down -v