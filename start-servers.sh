#!/bin/bash

# Start Server 1
echo "Starting Books Server..."
cd books
npm start &

# Start Server 2
echo "Starting Lending Server..."
cd ..
cd lending
npm start &

# Start Server 3
echo "Starting Student Server..."
cd ..
cd students
npm start &

# Start React App
echo "Starting Student Server..."
cd ..
cd dashboard
npm run dev &

echo "All servers started."
