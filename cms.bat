@echo off
echo.
echo ========================================
echo   MVU WEBSITE - CMS LAUNCHER
echo ========================================
echo.
echo [1/2] Opening browser to: http://localhost:3000/admin
start http://localhost:3000/admin
echo.
echo [2/2] Starting local development server...
echo (Keep this window open while editing content)
echo.
call npm run dev
pause
