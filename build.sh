#!/bin/bash
echo "========================================"
echo "  SillyTavern Android 构建脚本"
echo "========================================"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "[错误] 未安装 Node.js"
    echo "请从 https://nodejs.org 下载安装"
    read -p "按回车键退出..."
    exit 1
fi

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "[错误] 未安装 npm"
    echo "请从 https://nodejs.org 下载安装"
    read -p "按回车键退出..."
    exit 1
fi

echo "[1/5] 检查环境..."
node --version
npm --version
echo ""

echo "[2/5] 安装依赖..."
npm install
if [ $? -ne 0 ]; then
    echo "[错误] npm install 失败"
    read -p "按回车键退出..."
    exit 1
fi
echo ""

echo "[3/5] 构建 Web 应用..."
npm run build
if [ $? -ne 0 ]; then
    echo "[错误] Web 构建失败"
    read -p "按回车键退出..."
    exit 1
fi
echo ""

echo "[4/5] 同步到 Android..."
npx cap sync android
if [ $? -ne 0 ]; then
    echo "[错误] Cap sync 失败"
    read -p "按回车键退出..."
    exit 1
fi
echo ""

echo "[5/5] 构建 APK..."
cd android
chmod +x gradlew
./gradlew assembleDebug
if [ $? -ne 0 ]; then
    echo "[错误] Gradle 构建失败"
    cd ..
    read -p "按回车键退出..."
    exit 1
fi
cd ..
echo ""

echo "========================================"
echo "  构建完成！"
echo "  APK 文件位置:"
echo "  android/app/build/outputs/apk/debug/app-debug.apk"
echo "========================================"
read -p "按回车键退出..."
