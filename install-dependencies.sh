#!/bin/bash

# Start Server 1
echo "Installing dependencies..."
cd books
npm i --legacy-peer-deps &
cd ..
cd lending
npm i --legacy-peer-deps &
cd ..
cd students
npm i --legacy-peer-deps &

echo "All dependencies installed"
