<template>
  <div class="home">
    <div class="source">
      <div class="source-item">
        <div class="img">
          <img id="sourceImg" src="../assets/img/cat.jpg" alt="" ref="sourceImg">
          <div id="sourceText" draggable="false" ref="sourceText">我是一只猫呀</div>
        </div>
      </div>
    </div>
    <div id="target" class="target" ref="target">
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      startOffsetX: 0,
      startOffsetY: 0
    }
  },
  mounted () {
    // 拖动对象 dragstart drag dragend
    this.$refs.sourceImg.ondragstart = this.ondragstart
    // 目标区域 dragenter dragover dragleave  释放drop  dragenter、dragover以及drop默认拒绝接受释放的元素，需要阻止浏览器的默认事件
    this.$refs.target.ondragenter = this.ondragenter
    this.$refs.target.ondragover = this.ondragover
    this.$refs.target.ondrop = this.ondrop
  },
  methods: {
    // 拖拽元素
    ondragstart (e) {
      console.log({ e })
      console.log('ondragstart')
      // 在开始拖拽时，将元素的id值作为唯一标识，设置到dataTransfer上，这样在拖拽结束时就能通过getData获取到id,这样就知道拖拽是具体哪个元素
      e.dataTransfer.setData('Text', e.target.id)
      // 记录下鼠标在元素上的距离。因为拖拽过程中获取到的offsetX以及offsetY都是针对于鼠标来说。
      this.startOffsetX = e.offsetX
      this.startOffsetY = e.offsetY
    },
    // 目标区域  => 必须在dragover时阻止默认事件，才会触发drop事件。对元素的处理一般放在drop事件中即可。
    ondragenter (e) {
      console.log('ondragenter')
    },
    ondragover (e) {
      e.preventDefault()
    },
    ondrop (e) {
      console.log({ e })
      e.preventDefault()
      const id = e.dataTransfer.getData('Text')
      console.log({ id })
      if (!id) {
        return
      }
      // 获取目标区域
      const target = document.getElementById('target')
      // 获取到拖拽元素
      const ele = document.getElementById(id)
      // 复制一份拖拽元素
      const node = ele.cloneNode(true)
      // 设置node的样式属性 => 减去刚开始记录的值。另外由于获取到的offsetX Y都是整数，所以这种松开鼠标有些许的距离出入是很正常的。
      node.style.position = 'absolute'
      node.style.left = e.offsetX - this.startOffsetX + 'px'
      node.style.top = e.offsetY - this.startOffsetY + 'px'
      // 将复制元素添加到目标区域
      target.appendChild(node)
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.source {
  width: 30%;
  height: 800px;
  background-color: skyblue;
}
.source-item {
  width: 160px;
  height: 100px;
}
img {
  width: 120px;
  height: 80px;
}
.target {
  position: relative;
  width: 60%;
  height: 800px;
  border: 1px solid #ccc;
}
</style>
