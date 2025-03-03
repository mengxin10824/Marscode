import { describe, expect, it, vi, beforeEach, beforeAll, afterAll } from 'vitest';
import { getChatCompletion, streamChatCompletion, setCurrentModel } from '../src/services/aiService';
import { Message, MessageType } from '../src/model/Message';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Model } from '../src/model/Model';

const mock = new MockAdapter(axios);

class MockModel extends Model {
  constructor() {
    super(
      'deepseek-ai/DeepSeek-V3',
      'Test Model',
      'default-icon.svg',
      'https://api.siliconflow.cn/v1',
      'sk-test-key'
    );
  }
  
  getFullKey() {
    return `Bearer ${this.apiKey}`;
  }
}

beforeEach(() => {
  setCurrentModel(new MockModel());
});

describe('AI Service API', () => {
  let originalModel: Model;

  beforeAll(() => {
    originalModel = setCurrentModel();
  });

  afterAll(() => {
    setCurrentModel(originalModel);
  });

  beforeEach(() => {
    mock.reset();
  });

  it('should handle stream response correctly', async () => {
    const mockMessages = [new Message('1', 'Hello', MessageType.USER, '2025-01-01')];
    const mockResponse = [
      'data: {"choices":[{"delta":{"content":"你好"}}]}\n\n',
      'data: {"choices":[{"delta":{"content":"！"}}]}\n\n',
      'data: [DONE]\n\n'
    ].join('');

    mock.onPost(/chat\/completions/).reply(200, mockResponse, {
      'Content-Type': 'text/event-stream',
      'Transfer-Encoding': 'chunked'
    });

    const onData = vi.fn();
    await streamChatCompletion(mockMessages, onData);

    expect(onData).toHaveBeenNthCalledWith(1, '你好');
    expect(onData).toHaveBeenNthCalledWith(2, '！');
  });

  it('should handle API errors correctly', async () => {
    const mockError = { response: { status: 500 } };
    mock.onPost(/chat\/completions/).replyOnce(500, mockError);
    
    await expect(getChatCompletion({ 
        apiUrl: 'https://api.siliconflow.cn/v1', 
        prompt: 'test', 
        max_tokens: 1000 
    })).rejects.toThrow('API_ERROR');
  });
}); 