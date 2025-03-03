import axios from 'axios';
// 在文件顶部添加导入语句
import { Model } from '../model/Model';
import { Message } from '../model/Message';

// 在文件顶部添加变量声明
let currentModel: Model;
let API_BASE: string;

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

interface StreamChunk {
    choices: Array<{
        delta: { content?: string }
    }>
}

export class AIError extends Error {
    readonly code: string;
    
    constructor(code: string, message: string) {
        super(message);
        this.code = code;
        this.name = 'AIError';
    }
}

export function initAIService(model: Model) {
    currentModel = model;
    API_BASE = model.url;
}

export const getChatCompletion = async (request: ChatCompletionRequest): Promise<ChatCompletionResponse> => {
    try {
        const response = await axios.post(`${API_BASE}/chat/completions`, request, {
            headers: {
                'Authorization': currentModel.getFullKey(),
                'Content-Type': 'application/json'
            }
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
    const response = await fetch(`${API_BASE}/chat/completions`, {
        method: 'POST',
        headers: {
            'Authorization': currentModel.getFullKey(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: currentModel.id,
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
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '));
        
        lines.forEach(line => {
            const data = JSON.parse(line.replace('data: ', '')) as StreamChunk;
            const content = data.choices[0].delta.content || '';
            onData(content);
        });
    }
}