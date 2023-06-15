#!/bin/bash

# Start Server 1
echo "Starting Books Server..."
cd books
npm test &

# Start Server 2
echo "Starting Lending Server..."
cd ..
cd lending
npm test &

# Start Server 3
echo "Starting Student Server..."
cd ..
cd students
npm test &

echo "All servers started."
