# Start PostgreSQL database for test
docker-compose -f docker-compose-test.yml up -d

# Ping for readiness
RETRIES=10
until psql "postgres://OTOT-B-USER:OTOT-B-PW@localhost:5434/OTOT-B" -c "select 1" > /dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
  echo "Waiting for postgres server, $((RETRIES--)) remaining attempts..."
  sleep 1
done

# Execute test suite
echo "Running all tests..."
../node_modules/mocha/bin/mocha '../test/**/*-test.js' --timeout 10000 --exit

# Clean up
docker-compose -f docker-compose-test.yml down -v