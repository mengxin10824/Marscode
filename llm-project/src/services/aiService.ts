import axios from 'axios';
// 在文件顶部添加导入语句
import { Model } from '../model/Model';
import { Message } from '../model/Message';

// 在文件顶部添加变量声明
let _currentModel: Model;
// let API_BASE: string;

let _apiBase: string;

// const API_URL = 'https://api.siliconflow.cn/v1/chat-completions';

interface ChatCompletionRequest {
    prompt: string;
    max_tokens: number;
    temperature?: number;
    top_p?: number;
    n?: number;
    stream?: boolean;
    logprobs?: number | null;
    echo?: boolean;
    stop?: string[] | string;
    presence_penalty?: number;
    frequency_penalty?: number;
    best_of?: number;
    logit_bias?: { [token: string]: number };
    user?: string;
}

interface ChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
        text: string;
        index: number;
        logprobs: any;
        finish_reason: string;
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

// interface StreamChunk {
//     choices: Array<{
//         delta: { content?: string }
//     }>
// }
export interface StreamChunk {
    choices: {
        delta: {
            content: string;
        };
    }[];
}

export class AIError extends Error {
    readonly code: string;
    readonly statusCode?: number;
    
    constructor(code: string, message: string, statusCode?: number) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.name = 'AIError';
    }
}

export function initAIService(model: Model) {
    _currentModel = model;
    _apiBase = model.url;
}

export const getChatCompletion = async (
    request: ChatCompletionRequest & { apiUrl: string }
): Promise<ChatCompletionResponse> => {
    abortController = new AbortController();
    try {
        const response = await axios.post(`${request.apiUrl}/chat/completions`, request, {
            headers: {
                'Authorization': _currentModel.getFullKey(),
                'Content-Type': 'application/json'
            },
            signal: abortController.signal
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching chat completion:', error);
        if (error instanceof DOMException && error.name === 'AbortError') {
            throw new AIError('ABORTED', 'Request was aborted by the user');
        }
        if (error instanceof Response) {
            const errorData = await error.json();
            throw new AIError(errorData.error?.code || 'API_ERROR', errorData.error?.message);
        }
        throw error;
    }
};

export const streamChatCompletion = async (
    messages: Message[],
    onData: (content: string) => void
) => {
    const response = await fetch(`${_apiBase}/chat/completions`, {
        method: 'POST',
        headers: {
            'Authorization': _currentModel.getFullKey(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: _currentModel.id,
            messages: messages.map(m => ({ role: 'user', content: m.content })),
            stream: true,
            temperature: 0.7
        })
    });

    if (!response.body) throw new AIError('NO_RESPONSE', 'Empty response body');
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        handleStreamResponse(chunk, onData);
    }
}

const handleStreamResponse = (chunk: string, onData: (content: string) => void) => {
    const lines = chunk.split('\n')
        .filter(line => line.trim() && line.startsWith('data: '));
    
    lines.forEach(line => {
        const data = JSON.parse(line.replace('data: ', '')) as StreamChunk;
        const content = data.choices[0].delta.content || '';
        onData(content);
    });
}

export const getCurrentModel = () => _currentModel;
export const setCurrentModel = (model?: Model): Model => {
  if (model) {
    _currentModel = model;
    _apiBase = model.url;
  }
  return _currentModel;
};

class MockModel extends Model {
  constructor() {
    super(
      'mock-model',
      'Mock Model',
      'mock-icon.svg',
      'https://mock.api',
      'sk-mock-key'
    );
  }
}

// 初始化使用模拟模型
setCurrentModel(new MockModel());

let abortController: AbortController | null = null;

export const abortRequest = () => {
    if (abortController) {
        abortController.abort();
        abortController = null;
    }
};

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export const getChatCompletionWithRetry = async (
    request: ChatCompletionRequest & { apiUrl: string },
    retries = MAX_RETRIES
): Promise<ChatCompletionResponse> => {
    try {
        return await getChatCompletion(request);
    } catch (error) {
        if (retries > 0 && error instanceof AIError && error.statusCode !== undefined && error.statusCode >= 500) {
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            return getChatCompletionWithRetry(request, retries - 1);
        }
        throw error;
    }
}