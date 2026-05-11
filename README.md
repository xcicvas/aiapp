# SillyTavern - Local AI Chat

基于 SillyTavern 构建的**完全离线** Android 应用，无需任何云端配置即可使用。

## 功能特点

- 🤖 **本地 AI** - 使用 WebLLM 在浏览器中直接运行 AI 模型
- 🌐 **免费 API** - 支持 OpenRouter、Groq、Together AI 等免费 API
- 🔧 **自定义服务器** - 可连接任何 OpenAI 兼容的 API
- 📱 **移动优化** - 原生 Android 应用，离线可用
- 💬 **聊天功能** - 与 AI 角色对话
- 🎭 **角色管理** - 创建和管理 AI 角色
- 🔒 **隐私保护** - 数据存储在本地设备

## AI 模式

### 1. 本地 AI (WebLLM)
- 完全离线运行
- 使用设备 GPU
- 无需互联网连接
- 需要设备支持 WebGPU

### 2. 免费 API
- OpenRouter (免费模型)
- Groq (免费额度)
- Together AI (免费积分)

### 3. 自定义服务器
- 连接 SillyTavern 服务器
- 连接 Ollama
- 连接任何 OpenAI 兼容 API

## 构建

```bash
# 克隆项目
git clone https://github.com/xcicvas/aiapp.git
cd aiapp

# 安装依赖
npm install

# 构建 Web 应用
npm run build

# 同步到 Android
npx cap sync android

# 构建 APK
cd android
./gradlew assembleDebug
```

APK 位置: `android/app/build/outputs/apk/debug/app-debug.apk`

## 技术栈

| 技术 | 说明 |
|------|------|
| Capacitor 6.x | 混合应用框架 |
| Vite 5.x | 前端构建 |
| WebLLM | 本地 AI 推理 |
| Android | 原生应用 |

## 许可证

基于 AGPL-3.0 许可证
