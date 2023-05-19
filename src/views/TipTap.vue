<template>
  <editor-content :editor="editor" :class="isFocused ? 'is_focus' : ''"/>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent
  },

  data () {
    return {
      editor: null
    }
  },
  computed: {
    // 编辑器聚焦
    isFocused () {
      return this.editor && this.editor.isFocused
    }
  },
  mounted () {
    this.editor = new Editor({
      content: 'I’m running Tiptap with Vue.js. 🎉',
      extensions: [
        StarterKit.configure({
          // paragraph: {
          //   draggable: true
          // }
        })
      ]
    })
  },

  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>

<style>
.ProseMirror {
  border-radius: 5px;
  background: #fff;
  padding: 10px;
  /* 去除contenteditable元素 聚焦时的蓝色外线*/
  outline: none;
}

.ProseMirror p {
  margin: 0;
}

.ProseMirror:hover {
  border: 1px dashed rgb(24, 144, 255) !important;
}
.is_focus > .ProseMirror {
  border: 1px solid rgb(24, 144, 255) !important;
}

</style>
