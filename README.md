# AI Chat - Multi-Provider AI Client

通用的 AI 聊天应用，支持连接各大 AI 厂商 API。

## 支持的 AI 提供商

| 提供商 | 模型 | 说明 |
|--------|------|------|
| **OpenAI** | GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-3.5 | 官方 API |
| **Anthropic** | Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus | Claude 系列 |
| **Google** | Gemini 2.0 Flash, Gemini 1.5 Pro, Gemini 1.5 Flash | Gemini 系列 |
| **Groq** | Llama 3.3 70B, Llama 3.1 70B, Mixtral 8x7B | 免费额度 |
| **OpenRouter** | Gemma 2 9B (免费), Claude 3 Haiku (免费) | 多模型聚合 |
| **DeepSeek** | DeepSeek Chat, DeepSeek Coder | 国产高性能 |
| **Ollama** | Llama 3.2, Qwen 2.5, Mistral | 本地部署 |

## 功能

- 🤖 多 AI 提供商支持
- 💬 流畅的聊天界面
- ⚙️ 自定义系统提示词
- 📱 移动端优化
- 🔒 API Key 本地存储
- 🌙 深色主题

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

## 使用方法

1. 安装 APK 到手机
2. 点击右上角 ⚙️ 设置
3. 选择 AI 提供商
4. 输入 API Key
5. 保存并开始聊天

## 获取 API Key

- OpenAI: https://platform.openai.com/api-keys
- Anthropic: https://console.anthropic.com/settings/keys
- Google: https://aistudio.google.com/app/apikey
- Groq: https://console.groq.com/keys
- OpenRouter: https://openrouter.ai/keys
- DeepSeek: https://platform.deepseek.com/api_keys
- Ollama: https://ollama.com

## 技术栈

| 技术 | 说明 |
|------|------|
| Capacitor 6.x | 混合应用框架 |
| Vite 5.x | 前端构建 |
| Android | 原生应用 |

## 许可证

MIT License
