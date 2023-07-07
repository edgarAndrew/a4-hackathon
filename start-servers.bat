@echo off

REM Start Server 1
echo Starting Books Server...
cd books
start "" npm test

REM Start Server 2
cd ..
echo Starting Lending Server...
cd lending
start "" npm test

REM Start Server 3
cd ..
echo Starting Students Server...
cd students
start "" npm test

REM Start React App
cd ..
echo Starting React App...
cd dashboard
start "" npm run dev

echo All servers started.
