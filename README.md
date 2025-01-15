# marscode
Marscode LLM 前段组件库



> 豆包MarsCode 青训营-寒假专场：https://juejin.cn/post/7437020309973155849

## 背景

当前，与大模型的交互多种多样，但最常见也是最容易被用户理解的，就是对话框模式，例如：

- ChatGPT 

![img](https://bytedance.larkoffice.com/space/api/box/stream/download/asynccode/?code=YzI1NTEyNDQ1ODJmZTZmNzM4NjNiNjJkYmZmMzkzNjJfRGRpUjljNnpPanZpUW1xZWVvYm5vWVJ1RUJndG5RbXBfVG9rZW46UnM4WWJxbGdDb3BuSzB4N1NOR2NwcDA2bkdjXzE3MzY5NTYzNzI6MTczNjk1OTk3Ml9WNA)![img](https://bytedance.larkoffice.com/space/api/box/stream/download/asynccode/?code=YzVkMTBlN2VlYmE0NTgzNmNjYzM5Mzg5NjZjYjZjMWZfODF0STZGbUFKcnRMeDRia0FOaUJqbHZnVTBjWkdwSnZfVG9rZW46Qms3TWJ3amQ4b05HTEt4TXR5VWNma0ZwbnVmXzE3MzY5NTYzNzI6MTczNjk1OTk3Ml9WNA)![img](https://bytedance.larkoffice.com/space/api/box/stream/download/asynccode/?code=OGYxNzA1ZGVmNjcwM2Y3YWFhOThkYWMxOGRiOGVlOGVfanNLTnFSUmIwcEdjaVNJYjg2VWtDcVZaWFhudnVnR3pfVG9rZW46SDlaRGJHWElnb3plaEt4RUpFRGN0eTk2bldmXzE3MzY5NTYzNzI6MTczNjk1OTk3Ml9WNA)

- Claude

- Coze

这种模式下，用户可以通过发送文本、图片、PDF等多种形式的输入，LLM则会根据接收到的信息进行处理并返回相应的结果。为此，需要在前端页面设计和实现支持多种输入输出形式的对话框组件，该组件不仅要能够接收和展示文本信息，还需具备处理和显示图片、文档等多媒体内容等能力，以便为用户提供更加直观和便捷的交互体验。

毫不夸张的说，几乎所有 LLM 产品都会提供这类交互组件，因此非常值得学习借鉴。

## 需求

1. ### 组件能力

组件样式可自行设计，此处以 claude 为例，介绍关键特性：

![img](https://bytedance.larkoffice.com/space/api/box/stream/download/asynccode/?code=NWIxYmY2M2JkYjU5MjA4YzU0ZmI4MTFiNzM1ZDViMjJfZXBaYWI1bFhhZUNCeFZmdUZPQUM3eE9OZFJDNm5WeTlfVG9rZW46T05CbmJHZDFOb2hYUjJ4RzJmM2M4OTdsbjdzXzE3MzY5NTYzNzI6MTczNjk1OTk3Ml9WNA)

- 需要支持用户输入对话，且对话内容支持图片、PDF 等多媒体格式；
- 用户输入对话并回车后，调用 LLM 接口，组件内流式展示大模型返回的结果；
- LLM 返回内容可能为：文本、Markdown、图片等，需要正确展示这些格式内容；
- **需要支持LLM 流式返回结果，实现逐行打印效果；**
- **若返回结果包含代码，请提供“Copy” 按钮，方便用户复制代码，样式如：**
  - ![img](https://bytedance.larkoffice.com/space/api/box/stream/download/asynccode/?code=NTkzMTI4MDg5MmJjNDNhMmNmNDdkZjJmNDg3NzgyMDVfV3MzZlU2SzhWRENBcmxYendKWUJDcks0MWNZelEwVHZfVG9rZW46SE82MmJLaU1nb2dqeEp4ejVrSWN2Wkxsbm5kXzE3MzY5NTYzNzI6MTczNjk1OTk3Ml9WNA)

在此基础上，希望该组件支持内联与独立对话两种功能模式。

1. ### 内联对话框

参考 [Vercel 文档站](https://vercel.com/docs)，期望该对话组件支持内联模式，该模式下存在三种状态：

- 收缩形态：表现为一个单一的输入框，点击后展开弹框进入第二形态
  - ![img](https://bytedance.larkoffice.com/space/api/box/stream/download/asynccode/?code=OGM1ZTQ1ZGJlMTkxNGExNTZmZTEyOTMzN2EwMDZjYmVfUURiS3k3UFVXOE04ZU5WR1hKWk5ldFNweTIxNFRUb2xfVG9rZW46SGp4Q2JxZXdQbzBCYlp4RWh0dmN0ZFQ1bmxlXzE3MzY5NTYzNzI6MTczNjk1OTk3Ml9WNA)
- 展开形态：表现为支持对话的弹框模式，形如：
  - ![img](https://bytedance.larkoffice.com/space/api/box/stream/download/asynccode/?code=ZDM3MjM1YTc0ODk1NDI2NmFiOWViMmQyMDQ1MDZjNGVfdmdiMlhwU3BlT0lUakMxTGs2M0dmQ3FYZnAxcEV0VmlfVG9rZW46QkVzQWJ5WnJOb2M1enJ4U1M0QmNqa0xHblRnXzE3MzY5NTYzNzI6MTczNjk1OTk3Ml9WNA)
- 对话形态：用户输入问题后，立即进入该形态，形态上既为 LLM 对话信息流，如：

![img](https://bytedance.larkoffice.com/space/api/box/stream/download/asynccode/?code=NTQ4ZGQ2NzUxMzk2MWJmN2M0ZjFlNWFhY2UxNjAxYWRfU2dPS013NFB6bkJOWENWQ1U5Vk8xREJaUVFrZ09NMHdfVG9rZW46S0Y3R2J4WGFob0U1NmF4VzlCSmNkSEVSbnBnXzE3MzY5NTYzNzI6MTczNjk1OTk3Ml9WNA)

注意，对话形态下需要支持 markdown、图片等格式。

1. ### 独立对话框

独立对话框模式下，页面主体内容为该对话框，对话内容平铺在页面上，大致样式如下：

![img](https://bytedance.larkoffice.com/space/api/box/stream/download/asynccode/?code=MjEyYWFmMjVkZWMxM2EyZTAyODhkNDNhNGM0MDJlNGNfS2FHNEdkcm5nV0pXVWU3eE9Gc0NWN3Zvdm41NlVMTHFfVG9rZW46TzA0emJNcFNlb2M3VTd4Y2syd2N3ZlZXbnVlXzE3MzY5NTYzNzI6MTczNjk1OTk3Ml9WNA)

具体功能与页面布局可自由发挥，不做限制。

1. ### 兼容性

除 Web 端外，组件还需兼容 H5、小程序形态，并提交相关演示材料。

## 加分项

1. 单测覆盖率超过 80%；
2. 有完善的 CI 流水线，并在 CI 中执行构建、自动测试、Lint 检查、ts 检查等检测动作；
3. 有完善的 CD 流水线，实现发布动作自动化；

## 技术栈

- 大模型：推荐使用 Coze api 进行大模型对话：https://www.npmjs.com/package/@coze/api
- 框架：可使用 vue、react、angular 等，不做限制；
- 工程化：
  - 使用 TypeScript 编写代码；
  - 使用 vitest/jest 实现单元测试；
  - 接入 eslint、lint-staged 工具；
  - 使用 webpack、rspack 等构建产物；
