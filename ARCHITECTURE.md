# AI Provider Architecture

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Interface                          │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │            ChatArea Component                          │   │
│  │  ┌──────────────────────────────────────────────┐     │   │
│  │  │  Header with Provider Selector               │     │   │
│  │  │  [Gemini | OpenAI | Claude | NVIDIA | Meta] │     │   │
│  │  └──────────────────────────────────────────────┘     │   │
│  │                                                        │   │
│  │  ┌──────────────────────────────────────────────┐     │   │
│  │  │  Message Display Area                        │     │   │
│  │  │  • User Messages                             │     │   │
│  │  │  • AI Responses (with typing effect)         │     │   │
│  │  │  • Error Messages                            │     │   │
│  │  └──────────────────────────────────────────────┘     │   │
│  │                                                        │   │
│  │  ┌──────────────────────────────────────────────┐     │   │
│  │  │  Input Area                                  │     │   │
│  │  │  • Text Input                                │     │   │
│  │  │  • Send Button                               │     │   │
│  │  └──────────────────────────────────────────────┘     │   │
│  └────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    User types message
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    useAIProvider Hook                           │
│                                                                 │
│  Current State:                                                 │
│  • provider: 'gemini' | 'openai' | 'claude' | 'nvidia' | 'meta'│
│  • isLoading: boolean                                           │
│                                                                 │
│  Functions:                                                     │
│  • sendMessage(question: string): Promise<string>              │
│  • changeProvider(provider: AIProviderType): void              │
│  • initializeClient(provider): AIClient                        │
│                                                                 │
│  Provider-Specific Methods:                                    │
│  • callGemini(question)                                        │
│  • callOpenAI(question)                                        │
│  • callClaude(question)                                        │
│  • callNvidia(question)                                        │
│  • callMeta(question)                                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                 Routes to selected provider
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    AI Config (aiConfig.ts)                      │
│                                                                 │
│  Configuration for each provider:                              │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ gemini:   { apiKey, model }                             │  │
│  │ openai:   { apiKey, model, baseURL }                    │  │
│  │ claude:   { apiKey, model, baseURL, temp, tokens }      │  │
│  │ nvidia:   { apiKey, model, baseURL, temp, tokens }      │  │
│  │ meta:     { apiKey, model, baseURL, temp, tokens }      │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
              Initializes appropriate SDK client
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      SDK Clients                                │
│                                                                 │
│  ┌───────────────┐  ┌───────────────┐  ┌──────────────────┐   │
│  │ GoogleGenAI   │  │   OpenAI      │  │   OpenAI         │   │
│  │ (Gemini)      │  │   (GPT)       │  │   (Compatible)   │   │
│  └───────────────┘  └───────────────┘  └──────────────────┘   │
│         ↓                  ↓                     ↓              │
│    Gemini API        OpenAI API      Claude/NVIDIA/Meta API    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    API Request to Provider
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    External AI Services                         │
│                                                                 │
│  ┌─────────┐  ┌─────────┐  ┌────────┐  ┌────────┐  ┌──────┐  │
│  │ Google  │  │ OpenAI  │  │Anthropic│ │ NVIDIA │  │ Meta │  │
│  │ Gemini  │  │   API   │  │  Claude │ │   API  │  │ Llama│  │
│  └─────────┘  └─────────┘  └────────┘  └────────┘  └──────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                      Response Generated
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Response Processing                          │
│                                                                 │
│  1. Receive response text                                      │
│  2. Error handling (if any)                                    │
│  3. Return to ChatArea                                         │
│  4. Display with typing effect                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Input
```
User → ChatArea.handleSend() → useAIProvider.sendMessage()
```

### 2. Provider Selection
```
useAIProvider determines active provider
↓
Calls appropriate provider method:
- callGemini()
- callOpenAI()
- callClaude()
- callNvidia()
- callMeta()
```

### 3. API Configuration
```
Provider method → AI_CONFIG[provider]
↓
Retrieves:
- API Key (from env or config)
- Model name
- Base URL
- Parameters (temp, max_tokens)
```

### 4. Client Initialization
```
initializeClient(provider)
↓
Creates SDK client:
- GoogleGenerativeAI for Gemini
- OpenAI for GPT/Claude/NVIDIA/Meta
```

### 5. API Call
```
SDK Client → External API
↓
Sends request with:
- User message
- Model configuration
- Parameters
```

### 6. Response Handling
```
API Response → Provider method
↓
Extract text content
↓
Error handling (if needed)
↓
Return to ChatArea
```

### 7. UI Update
```
ChatArea receives response
↓
Creates assistant message
↓
Applies typing effect (character by character)
↓
Updates UI in real-time
↓
Auto-scrolls to bottom
```

## State Management

```typescript
// ChatArea State
messages: Message[]           // All chat messages
isTyping: boolean            // Loading indicator
streamingContent: string     // Current streaming text

// useAIProvider State
provider: AIProviderType     // Current selected provider
isLoading: boolean          // API call in progress
```

## Error Flow

```
API Error Detected
↓
Identify Error Type:
- 429: Rate Limit
- 401: Invalid API Key
- 403: Permission Denied
- 500/503: Service Unavailable
- Other: Generic Error
↓
Format User-Friendly Message
↓
Display in Chat as Assistant Message
```

## Component Hierarchy

```
Index.tsx
└── ChatArea.tsx
    ├── useAIProvider() hook
    │   └── AI_CONFIG
    ├── Header (with Provider Selector)
    ├── ScrollArea
    │   └── MessageBubble[] (messages)
    │       └── TypingIndicator (when loading)
    └── MultiActionInput
```

## Configuration Hierarchy

```
Environment Variables (.env.local)
↓
AI_CONFIG (aiConfig.ts)
↓
useAIProvider Hook
↓
SDK Clients (OpenAI, GoogleGenAI)
↓
External APIs
```

## Key Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **OpenAI SDK** - GPT, Claude, NVIDIA, Meta
- **Google Generative AI SDK** - Gemini
- **Shadcn/ui** - UI components
- **Vite** - Build tool
