# AI Provider Integration Guide

This project supports multiple AI providers for chat functionality. You can seamlessly switch between different AI models.

## Supported AI Providers

- **Google Gemini** 🤖 - Google's latest AI model
- **OpenAI GPT** 🔮 - GPT-4 and other OpenAI models
- **Anthropic Claude** 🎭 - Claude 3.5 Sonnet and other Claude models
- **NVIDIA** 💚 - NVIDIA's Llama Nemotron models
- **Meta Llama** 🦙 - Meta's Llama models via Together AI

## Setup Instructions

### 1. Install Dependencies

```bash
npm install openai @google/generative-ai
```

### 2. Configure API Keys

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add your API keys:

```env
VITE_GEMINI_API_KEY=your_actual_gemini_key
VITE_OPENAI_API_KEY=your_actual_openai_key
VITE_CLAUDE_API_KEY=your_actual_claude_key
VITE_NVIDIA_API_KEY=your_actual_nvidia_key
VITE_META_API_KEY=your_actual_meta_key
```

### 3. Get API Keys

#### Google Gemini
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to `.env.local`

#### OpenAI
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add to `.env.local`

#### Anthropic Claude
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create a new API key
3. Add to `.env.local`

#### NVIDIA
1. Visit [NVIDIA API Catalog](https://build.nvidia.com/)
2. Sign up and get an API key
3. Add to `.env.local`

#### Meta/Together AI
1. Visit [Together AI](https://api.together.xyz/)
2. Create an account and get API key
3. Add to `.env.local`

## Usage

### Switching AI Providers

Use the dropdown in the chat header to switch between providers:

```tsx
import { useAIProvider } from '@/hooks/useAIProvider';

const { provider, changeProvider, sendMessage } = useAIProvider();

// Change provider
changeProvider('gemini'); // or 'openai', 'claude', 'nvidia', 'meta'

// Send message
const response = await sendMessage('Hello, AI!');
```

### Configuration

Customize AI models and parameters in `src/config/aiConfig.ts`:

```typescript
export const AI_CONFIG = {
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    model: 'gemini-2.0-flash-exp' // Change model here
  },
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    model: 'gpt-4', // or 'gpt-3.5-turbo', 'gpt-4-turbo'
  },
  // ... other providers
};
```

## Features

- ✅ Real-time streaming responses with typing effect
- ✅ Easy provider switching via dropdown
- ✅ Comprehensive error handling
- ✅ Environment variable support
- ✅ TypeScript support
- ✅ Extensible architecture

## Error Handling

The system handles various errors:

- **Rate Limit** (429): Shows quota exceeded message
- **Invalid API Key** (401): Prompts to check API key
- **Forbidden** (403): Indicates permission issues
- **Service Unavailable** (500/503): Suggests retry

## Architecture

```
src/
├── config/
│   └── aiConfig.ts          # AI provider configuration
├── hooks/
│   └── useAIProvider.tsx    # AI provider hook
└── components/
    └── chat/
        └── ChatArea.tsx     # Main chat component
```

## API Reference

### useAIProvider Hook

```typescript
const {
  provider,        // Current AI provider
  changeProvider,  // Function to switch providers
  sendMessage,     // Function to send messages
  isLoading       // Loading state
} = useAIProvider();
```

### Methods

- `changeProvider(provider: AIProviderType)` - Switch AI provider
- `sendMessage(question: string): Promise<string>` - Send message and get response

## Security Notes

⚠️ **Important**: 
- Never commit `.env.local` to version control
- API keys in the code are for demo only
- Use environment variables in production
- Enable browser security carefully (`dangerouslyAllowBrowser`)

## Troubleshooting

### CORS Issues
Some providers may have CORS restrictions. Consider using a backend proxy in production.

### API Key Not Working
1. Verify key is correctly copied
2. Check key has necessary permissions
3. Ensure billing is set up (for paid services)

### Rate Limits
- Implement request throttling
- Use caching for repeated queries
- Consider upgrading API tier

## License

MIT
