import DialogBox from '../src/components/src/dialogBox.vue';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, test, vi } from 'vitest';

test('renders streaming content', async () => {
  const wrapper = mount(DialogBox, {
    global: {
      mocks: {
        $services: {
          aiService: {
            streamChatCompletion: vi.fn(() => Promise.resolve())
          }
        }
      }
    }
  });

  await wrapper.vm.handleSend('Hello');
  await nextTick();

  expect(wrapper.find('.typing-indicator').exists()).toBe(true);
  expect(wrapper.text()).toContain('Hello');
}); 