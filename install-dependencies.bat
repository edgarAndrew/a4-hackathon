@echo off

echo Installing dependencies...
cd books
start "" npm i
cd ..
cd lending
start "" npm i 
cd ..
cd students
start "" npm i
cd ..
cd dashboard
start "" npm i --legacy-peer-deps 

echo All dependencies installed.
