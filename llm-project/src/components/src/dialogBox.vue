<template>
  <div
    class="w-full flex flex-col items-stretch gap-8 h-full text-white px-4 py-8"
  >
    <!-- User -->
    <div :class="[
      'h-fit',
      'flex',
      'flex-row-reverse',
      'items-start',
      'justify-start',
      'gap-2'
    ]">
      <img
        src=""
        alt=""
        class="size-10 aspect-square rounded-full bg-amber-50"
      />
      <div class="rounded-2xl p-2 max-w-[90%] bg-gray-800">
        <p class="text-pretty break-words">
          你好，AI！我想创建一个简单的TodoApp，展示我的个人信息。你能帮我设计一个基本的结构吗？我希望能包括我的名字、照片和一些兴趣爱好。
        </p>
      </div>
    </div>

    <!-- AI -->
    <div class="h-fit flex items-start justify-start gap-2">
      <img
        src=""
        alt=""
        class="size-10 aspect-square rounded-full bg-amber-50"
      />
      <div class="rounded-2xl bg-gray-800 p-2 max-w-[90%]">
        <p class="text-pretty break-words">
          当然可以！创建一个待办事项应用是一个很好的SwiftUI项目。首先，您需要确保您的开发环境已经设置好，包括Xcode和SwiftUI的基本知识。
        </p>

        <p class="text-pretty break-words mt-2">
          1.
          创建项目：打开Xcode，选择"创建新项目"，选择"App"，然后命名您的项目，例如"TodoApp"。
        </p>

        <p class="text-pretty break-words mt-2">
          2.
          定义数据模型：我们需要一个简单的模型来表示待办事项。可以创建一个TodoItem结构，包含任务的标题和完成状态。
        </p>

        <!-- 重点处理Code部分 -->
        <div class="w-fit overflow-x-hidden bg-gray-800 rounded-2xl h-fit my-2">
          <div
            class="w-full flex justify-between items-center bg-slate-500 px-4 py-1 text-sm"
          >
            <span>Swift</span>
            <button>Copy</button>
          </div>
          <pre
            class="p-2 bg-gray-900"
          ><code class="inline- block no-scrollbar text-sm break-words whitespace-pre-wrap">import Foundation
struct TodoItem: Identifiable {
    var id = UUID()
    var title: String = "Default Event Example for long text todo item efault Event Example for long text todo item efault Event Example for long text todo item efault Event Example for long text todo item" 
    var isCompleted: Bool
}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>
