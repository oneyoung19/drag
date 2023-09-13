<template>
  <div class="pdf-wrapper">
    <canvas
      :ref="`pdfCanvas${pageNum}`"
      v-for="pageNum in pdfPages"
      :key="pageNum">
      {{ pageNum }}
    </canvas>
  </div>
</template>

<script>
import pdfjs from 'pdfjs-dist/webpack'

export default {
  data () {
    return {
      pdfUrl: 'http://10.0.40.215:8080/KYC.pdf',
      pdfDoc: {},
      pdfPages: 0
    }
  },
  mounted () {
    const { pdfUrl } = this
    this.loadFile(pdfUrl)
  },
  methods: {
    loadFile (url) {
      pdfjs
        .getDocument({
          url,
          // https://www.jianshu.com/p/7e9eb3b4e2ea
          cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/cmaps/',
          // cMapUrl: 'https://unpkg.zhimg.com/pdfjs-dist@1.9.426/cmaps/',//这里同样要引入字体解决水印问题，需自己提供
          // 注意：如果PDF的水印是收费字体，则需要 通过cMapUrl引入对应的字体，如果是免费字体，则不需要引入字体 水印会直接渲染出来
          cMapPacked: true
        })
        .promise.then(pdfDoc => {
          const { numPages } = pdfDoc
          this.pdfDoc = pdfDoc
          this.pdfPages = numPages
          // 获取第一页
          this.$nextTick(() => {
            this.getPage(1)
          })
        })
        .catch((error) => {
          console.error('Error loading PDF:', error)
        })
    },
    getPage (pageNum) {
      const canvas = this.$refs[`pdfCanvas${pageNum}`][0]
      return this.pdfDoc.getPage(pageNum).then(page => {
        this.renderPage(canvas, page).promise.then(() => {
          if (pageNum < this.pdfPages) {
            this.getPage(++pageNum)
          }
        })
      })
    },
    renderPage (canvas, page) {
      const viewport = page.getViewport({
        scale: screen.availWidth / page.getViewport({ scale: 2 }).width
      }) // 设置缩放比例
      const context = canvas.getContext('2d')

      // 设置<canvas>元素的大小以适应PDF页面
      const dpr = window.devicePixelRatio || 1
      const bsr =
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1
      const ratio = dpr / bsr
      canvas.width = viewport.width * ratio
      canvas.height = viewport.height * ratio
      canvas.style.width = viewport.width + 'px'
      canvas.style.height = viewport.height + 'px'

      // 渲染PDF页面到<canvas>元素
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
        // 这里会进行放大，解决模糊问题
        transform: [ratio, 0, 0, ratio, 0, 0]
      }

      return page.render(renderContext)
    }
  }
}
</script>

<style scoped>
.pdf-wrapper {
}
.pdf-wrapper canvas {
  display: block;
  margin: 0 auto;
}
</style>
