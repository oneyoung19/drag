<template>
  <div class="view-wrapper">
    <div class="box" style="background: #fff">
      <div>
        <canvas
          v-for="page in pages"
          :id="'the-canvas' + page"
          :key="page">
        </canvas>
      </div>
      <!-- <div class="view" id="svg-wrap"></div> -->
    </div>
  </div>
</template>

<script>
import PDFJS from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.entry'

PDFJS.workerSrc = workerSrc

// PDFJS.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js';
// 请注意，这里的cdn worker地址是贴的网上的，并且签章那部分代码是没有注释的，直接拿去用是达不到效果的，我也没有现成的资源可提供，只是贴一下方法

export default {
  data () {
    return {
      pdfDoc: null,
      pages: 0,
      pdfUrl: '',
      src: '',
      loadding: true,
      file: true,
      isDestory: true
    }
  },
  metaInfo: {
    meta: [
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=yes'
      }
    ]
  },
  watch: {},
  methods: {
    _renderPage (num) {
      // getPage 处理每个页面
      // 返回单页内容实例（页面引索） pdf.getPage(index)
      this.pdfDoc.getPage(num).then((page) => {
        // canvas 绘制 PDF
        let canvas = document.getElementById('the-canvas' + num)
        let ctx = canvas.getContext('2d')
        ctx.mozImageSmoothingEnabled = false
        ctx.webkitImageSmoothingEnabled = false
        ctx.msImageSmoothingEnabled = false
        ctx.imageSmoothingEnabled = false
        let dpr = window.devicePixelRatio || 1
        let bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1
        let ratio = dpr / bsr
        // 返回页面内容(比例) page.getViewport({scale:2.0})语法改这么写
        let viewport = page.getViewport({
          scale: screen.availWidth / page.getViewport({ scale: 2 }).width
        }) // 这是让pdf文件的大小等于视口的大小
        canvas.width = viewport.width * ratio
        canvas.height = viewport.height * ratio // 这里会进行压缩，解决模糊问题
        canvas.style.width = viewport.width + 'px'
        canvas.style.height = viewport.height + 'px'
        let renderContext = {
          canvasContext: ctx,
          viewport: viewport,
          transform: [ratio, 0, 0, ratio, 0, 0] // 这里会进行放大，解决模糊问题
        }
        const that = this
        page.render(renderContext).promise.then(function () {
          //  防止 在 PDF未渲染完某页 就返回时 会报错，导致下一次打开PDF 不会渲染出来
          if (that.isDestory) {
            console.log('xuanran')
            // page.getTextContent()
            if (that.pages > num) {
              that._renderPage(num + 1)
            }
          }
        })
        // -----------END----------

        // svg绘制 PDF
        /* svg实现方式 */
        // let viewport2 = page.getViewport({ scale: viewport.scale })
        // let container = document.createElement('div')
        // container.id = 'canvas_' + num
        // container.className = 'pageContainer'
        // container.style.width = viewport2.width + 'px'
        // container.style.height = viewport2.height + 'px'
        // document.getElementById('svg-wrap').appendChild(container)

        // return page.getOperatorList().then(function (opList) {
        //   let svgGfx = new PDFJS.SVGGraphics(page.commonObjs, page.objs)
        //   return svgGfx.getSVG(opList, viewport2).then(function (svg) {
        //     container.appendChild(svg)
        //   })
        // })

        // -----------END----------
      })
    },
    _loadFile (url) {
      // 获取整个 文档
      PDFJS.getDocument({
        url,
        // cMapUrl: 'https://unpkg.zhimg.com/pdfjs-dist@1.9.426/cmaps/',//这里同样要引入字体解决水印问题，需自己提供
        // 注意：如果PDF的水印是收费字体，则需要 通过cMapUrl引入对应的字体，如果是免费字体，则不需要引入字体 水印会直接渲染出来
        cMapPacked: true
      }).promise.then(
        (pdf) => {
          this.pdfDoc = pdf
          this.pages = this.pdfDoc.numPages
          this.loadding = false
          const that = this
          if (that.isDestory) {
            this.$nextTick(() => {
              this._renderPage(1)
            })
          }
        },
        (err) => {
          if (err.name === 'MissingPDFException') {
            this.$toast('无效的PDF链接')
          }
          // reject(err);
        }
      )
    }
  },
  mounted () {
    // this._loadFile(
    //   'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'
    // )
    this._loadFile('http://10.0.40.215:8080/KYC.pdf')
  },
  beforeDestroy () {
    console.log('destory')
    this.isDestory = false
    this._renderPage = null
  }
}
</script>
<style scoped>
.view-wrapper {
  padding-top: 1.22667rem;
}
.view-wrapper /deep/ .van-nav-bar .van-icon {
  color: #333;
  font-size: 18px;
  margin-right: 3px;
}
.view-wrapper /deep/ .van-loading {
  position: absolute;
  top: 50%;
  left: 46%;
}
</style>
