# SillyTavern Android 应用

基于 [SillyTavern](https://github.com/SillyTavern/SillyTavern) 项目构建的 Android 原生应用。

## 项目结构

```
sillytavern-android/
├── android/                    # Android 原生项目
│   ├── app/
│   │   └── src/main/          # 主应用代码
│   │       ├── assets/         # Web 资源
│   │       ├── java/          # Java/Kotlin 代码
│   │       └── res/           # Android 资源
│   └── build.gradle           # Gradle 配置
├── src/                       # Web 前端源码
│   ├── main.js                # 主应用逻辑
│   └── index.html             # 入口页面
├── dist/                      # 构建输出目录
├── package.json              # npm 配置
├── capacitor.config.ts       # Capacitor 配置
└── vite.config.js            # Vite 构建配置
```

## 功能特性

- 🤖 连接远程 SillyTavern 服务器进行 AI 对话
- 💬 实时聊天界面
- 🎭 角色管理和选择
- ⚙️ 服务器配置设置
- 🌙 深色主题设计

## 技术栈

| 技术 | 说明 |
|------|------|
| Capacitor 6.x | 混合应用框架 |
| Vite 5.x | 前端构建工具 |
| TypeScript | 类型支持 |
| Android Gradle | Android 构建系统 |

## 快速开始

### 环境要求

- Node.js 18+
- npm 9+
- Android SDK
- JDK 17+

### 构建步骤

1. **安装依赖**

```bash
cd sillytavern-android
npm install
```

2. **构建 Web 应用**

```bash
npm run build
```

3. **同步到 Android**

```bash
npx cap sync android
```

4. **构建 APK**

```bash
cd android
gradle assembleDebug
```

或者使用 Gradle Wrapper:

```bash
cd android
./gradlew assembleDebug
```

5. **安装到设备**

```bash
adb install app/build/outputs/apk/debug/app-debug.apk
```

## 应用配置

### 服务器连接

在应用设置中配置 SillyTavern 服务器地址：

- **Server URL**: SillyTavern 服务器地址 (默认: http://localhost:8000)
- **API Key**: 可选的 API 密钥

### 权限说明

应用需要以下权限：

- `INTERNET` - 网络访问
- `ACCESS_NETWORK_STATE` - 网络状态检查
- `ACCESS_WIFI_STATE` - WiFi 状态检查

## 开发

### 调试 Web 应用

```bash
npm run dev
```

然后访问 http://localhost:3000

### 更新 Capacitor

```bash
npx cap update
```

### 清理构建

```bash
npm run build
npx cap sync android
cd android
gradle clean
```

## 许可证

基于 SillyTavern AGPL-3.0 许可证
