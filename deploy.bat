@echo off
echo.
echo ========================================
echo   MVU WEBSITE - DEPLOYMENT SCRIPT
echo ========================================
echo.
echo [1/2] Building and publishing...
call npm run deploy
echo.
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Deployment failed!
    pause
    exit /b %errorlevel%
)
echo [2/2] Done!
echo Website published to GitHub Pages.
echo.
pause
