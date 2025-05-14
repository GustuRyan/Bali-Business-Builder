<template>
  <div
    class="border rounded-lg"
    :class="{ 'border-gray-300': !isError, 'border-red-400': isError }"
  >
    <div v-if="editor" class="grid grid-cols-2 gap-1 p-2">
      <div class="space-x-2 space-y-2">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
          class="btn btn-sm btn-square"
          type="button"
        >
          <Icon name="ooui:bold-b" />
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
          class="btn btn-sm btn-square"
          type="button"
        >
          <Icon name="tabler:italic" />
        </button>
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
          class="btn btn-sm btn-square"
          type="button"
        >
          <Icon name="mi:strikethrough" />
        </button>
        <button
          @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
          class="btn btn-sm btn-square"
          type="button"
        >
          <Icon name="ic:baseline-code" />
        </button>

        <button
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
          class="btn btn-sm btn-square"
          type="button"
        >
          <Icon name="ph:paragraph" />
        </button>

        <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
          class="btn btn-sm btn-square"
          type="button"
        >
          <Icon name="fluent:code-block-16-regular" />
        </button>
      </div>
      <div class="space-x-2 space-y-2">
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          class="btn btn-sm btn-square"
          type="button"
        >
          h1
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          class="btn btn-sm btn-square"
          type="button"
        >
          h2
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          class="btn btn-sm btn-square"
          type="button"
        >
          h3
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
          class="btn btn-sm btn-square"
          type="button"
        >
          h4
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
          class="btn btn-sm btn-square"
          type="button"
        >
          h5
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
          class="btn btn-sm btn-square"
          type="button"
        >
          h6
        </button>
      </div>
      <div class="space-x-2 space-y-2">
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          class="btn btn-sm btn-square"
          type="button"
        >
          <Icon name="zondicons:list-bullet" />
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
          class="btn btn-sm btn-square"
          type="button"
        >
          <Icon name="bx:list-ol" />
        </button>
        <button
          @click="editor.chain().focus().setHorizontalRule().run()"
          class="btn btn-sm btn-square"
          type="button"
        >
          <Icon name="ic:outline-horizontal-rule" />
        </button>

        <button
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
          class="btn btn-sm btn-square"
          type="button"
        >
          <Icon name="mingcute:blockquote-line" />
        </button>
      </div>
      <div class="space-y-2 space-x-2">
        <button
          @click="editor.chain().focus().unsetAllMarks().run()"
          class="btn btn-sm btn-square"
          type="button"
        >
          <Icon name="codicon:clear-all" />
        </button>
        <button
          @click="editor.chain().focus().clearNodes().run()"
          class="btn btn-sm btn-square"
          type="button"
        >
          <Icon name="ant-design:clear-outlined" />
        </button>

        <button
          @click="editor.chain().focus().setHardBreak().run()"
          class="btn btn-sm btn-square"
          type="button"
        >
          <Icon name="icon-park-outline:paragraph-break" />
        </button>
        <button
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
          class="btn btn-sm btn-square"
          type="button"
        >
          <Icon name="ant-design:undo-outlined" />
        </button>
        <button
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
          class="btn btn-sm btn-square"
          type="button"
        >
          <Icon name="ant-design:redo-outlined" />
        </button>
      </div>
    </div>
    <editor-content :editor="editor" class="p-2" placehoder="write something" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

const props = defineProps({
  modelValue: {
    type: [String],
  },
  isError: {
    type: Boolean,
    default: () => false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const contentClass = computed(() => {
  if (props.isError) {
    return "prose-sm p-2 min-h-[100px] mx-auto focus:outline-none border border-red-400 rounded-md";
  }
  return " prose-sm p-2 min-h-[100px] mx-auto focus:outline-none border border-gray-300 rounded-md";
});

const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class: contentClass.value,
    },
  },
  onUpdate(ctx) {
    emit("update:modelValue", ctx.editor.getHTML());
  },
});
</script>
