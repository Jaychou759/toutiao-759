<template>
  <div class="update-avator">
    <img :src="photo" ref="image" />

    <footer>
      <span @click="$parent.$parent.isShowAvator = false">取消</span>
      <span @click="uploadAvators">完成</span>
    </footer>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadAvator } from '@/api'
export default {
  props: {
    photo: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },
    //上传头像
    uploadAvators() {
      //1.获取裁剪后的图像的file对象
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: '图片正在上传...',
          forbidClick: true
        })

        try {
          //2.发送请求
          const { data } = await uploadAvator(blob)

          //3.更改父组件里的头像
          this.$emit('update-avator', data.data.photo)

          //4.关闭弹层
          this.$parent.$parent.isShowAvator = false
          console.log(data)
          this.$toast.success('图片上传成功')
        } catch (e) {
          console.dir(e)
          this.$toast.fail('图片上传失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.update-avator {
  position: relative;
  height: 100%;
  img {
    position: absolute;
    width: 100%;
    height: 40%;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    font-size: 40px;
    color: #fff;
    display: flex;
    justify-content: space-between;
  }
}
</style>
