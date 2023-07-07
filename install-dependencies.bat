@echo off

echo Installing dependencies...
cd books
start "" npm i --legacy-peer-deps
cd ..
cd lending
start "" npm i --legacy-peer-deps
cd ..
cd students
start "" npm i --legacy-peer-deps

echo All dependencies installed.
