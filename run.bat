@echo off
chcp 65001 > nul
echo ===================================================
echo Запуск MVU-WEBSITE (Next.js)
echo ===================================================
echo.
echo Установка зависимостей (на случай их отсутствия)...
call npm install
echo.
echo Запуск сервера разработки...
start http://localhost:3000
call npm run dev
pause
