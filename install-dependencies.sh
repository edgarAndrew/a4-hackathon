#!/bin/bash

# Start Server 1
echo "Installing dependencies..."
cd books
npm i &
cd ..
cd lending
npm i &
cd ..
cd students
npm i &

echo "All dependencies installed"
