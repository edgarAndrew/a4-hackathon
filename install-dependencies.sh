#!/bin/bash

# Start Server 1
echo "Installing dependencies..."
cd books
npm i  &
cd ..
cd lending
npm i  &
cd ..
cd students
npm i  &
cd ..
cd dashboard
npm i --legacy-peer-deps

echo "All dependencies installed"
