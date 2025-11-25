import { useState, useCallback } from 'react';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AI_CONFIG } from '@/config/aiConfig';

export type AIProviderType = 'gemini' | 'openai' | 'claude' | 'nvidia' | 'meta';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const useAIProvider = () => {
  const [provider, setProvider] = useState<AIProviderType>('gemini');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize AI clients
  const initializeClient = useCallback((providerType: AIProviderType) => {
    switch (providerType) {
      case 'gemini':
        return new GoogleGenerativeAI(AI_CONFIG.gemini.apiKey);
      
      case 'openai':
        return new OpenAI({
          apiKey: AI_CONFIG.openai.apiKey,
          dangerouslyAllowBrowser: true
        });
      
      case 'claude':
        return new OpenAI({
          apiKey: AI_CONFIG.claude.apiKey,
          baseURL: AI_CONFIG.claude.baseURL,
          dangerouslyAllowBrowser: true
        });
      
      case 'nvidia':
        return new OpenAI({
          apiKey: AI_CONFIG.nvidia.apiKey,
          baseURL: AI_CONFIG.nvidia.baseURL,
          dangerouslyAllowBrowser: true
        });
      
      case 'meta':
        return new OpenAI({
          apiKey: AI_CONFIG.meta.apiKey,
          baseURL: AI_CONFIG.meta.baseURL,
          dangerouslyAllowBrowser: true
        });
      
      default:
        return null;
    }
  }, []);

  // Call Gemini API
  const callGemini = async (question: string): Promise<string> => {
    const client = initializeClient('gemini') as GoogleGenerativeAI;
    const model = client.getGenerativeModel({ model: AI_CONFIG.gemini.model });
    const result = await model.generateContent(question);
    return result.response.text() || '';
  };

  // Call OpenAI API
  const callOpenAI = async (question: string): Promise<string> => {
    const client = initializeClient('openai') as OpenAI;
    const completion = await client.chat.completions.create({
      model: AI_CONFIG.openai.model,
      messages: [{ role: 'user', content: question }],
    });
    return completion.choices[0]?.message?.content || '';
  };

  // Call Claude API
  const callClaude = async (question: string): Promise<string> => {
    const client = initializeClient('claude') as OpenAI;
    const completion = await client.chat.completions.create({
      model: AI_CONFIG.claude.model,
      messages: [{ role: 'user', content: question }],
      temperature: AI_CONFIG.claude.temperature,
      max_tokens: AI_CONFIG.claude.maxTokens,
    });
    return completion.choices[0]?.message?.content || '';
  };

  // Call NVIDIA API
  const callNvidia = async (question: string): Promise<string> => {
    const client = initializeClient('nvidia') as OpenAI;
    const completion = await client.chat.completions.create({
      model: AI_CONFIG.nvidia.model,
      messages: [{ role: 'user', content: question }],
      temperature: AI_CONFIG.nvidia.temperature,
      max_tokens: AI_CONFIG.nvidia.maxTokens,
    });
    return completion.choices[0]?.message?.content || '';
  };

  // Call Meta API
  const callMeta = async (question: string): Promise<string> => {
    const client = initializeClient('meta') as OpenAI;
    const completion = await client.chat.completions.create({
      model: AI_CONFIG.meta.model,
      messages: [{ role: 'user', content: question }],
      temperature: AI_CONFIG.meta.temperature,
      max_tokens: AI_CONFIG.meta.maxTokens,
    });
    return completion.choices[0]?.message?.content || '';
  };

  // Main send message function
  const sendMessage = async (question: string): Promise<string> => {
    setIsLoading(true);
    
    try {
      let responseText = '';

      switch (provider) {
        case 'gemini':
          responseText = await callGemini(question);
          break;
        case 'openai':
          responseText = await callOpenAI(question);
          break;
        case 'claude':
          responseText = await callClaude(question);
          break;
        case 'nvidia':
          responseText = await callNvidia(question);
          break;
        case 'meta':
          responseText = await callMeta(question);
          break;
        default:
          throw new Error(`Unknown provider: ${provider}`);
      }

      return responseText;
    } catch (error: any) {
      console.error(`Error calling ${provider} API:`, error);
      
      // Handle different error types
      let errorMessage = 'Sorry, there was an error processing your request.';
      
      if (error?.status === 429 || error?.error?.error?.code === 'rate_limit_exceeded') {
        errorMessage = '⚠️ Rate limit exceeded. You have exceeded your API quota or requests per minute.';
      } else if (error?.status === 401 || error?.error?.error?.code === 'invalid_api_key') {
        errorMessage = '🔑 Invalid API key. Please check your API key configuration.';
      } else if (error?.status === 403) {
        errorMessage = '🚫 Access forbidden. Please verify your API key has the necessary permissions.';
      } else if (error?.status === 500 || error?.status === 503) {
        errorMessage = `🔧 ${provider} service is temporarily unavailable. Please try again in a moment.`;
      } else if (error?.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const changeProvider = (newProvider: AIProviderType) => {
    setProvider(newProvider);
    console.log('AI Provider changed to:', newProvider);
  };

  return {
    provider,
    changeProvider,
    sendMessage,
    isLoading,
  };
};
