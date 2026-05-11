@echo off
echo ========================================
echo  SillyTavern Android 构建脚本
echo ========================================
echo.

REM 检查 Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未安装 Node.js
    echo 请从 https://nodejs.org 下载安装
    pause
    exit /b 1
)

REM 检查 npm
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未安装 npm
    echo 请从 https://nodejs.org 下载安装
    pause
    exit /b 1
)

echo [1/5] 检查环境...
node --version
npm --version
echo.

echo [2/5] 安装依赖...
call npm install
if %errorlevel% neq 0 (
    echo [错误] npm install 失败
    pause
    exit /b 1
)
echo.

echo [3/5] 构建 Web 应用...
call npm run build
if %errorlevel% neq 0 (
    echo [错误] Web 构建失败
    pause
    exit /b 1
)
echo.

echo [4/5] 同步到 Android...
call npx cap sync android
if %errorlevel% neq 0 (
    echo [错误] Cap sync 失败
    pause
    exit /b 1
)
echo.

echo [5/5] 构建 APK...
cd android
call gradlew assembleDebug
if %errorlevel% neq 0 (
    echo [错误] Gradle 构建失败
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

echo ========================================
echo  构建完成！
echo  APK 文件位置:
echo  android\app\build\outputs\apk\debug\app-debug.apk
echo ========================================
pause
