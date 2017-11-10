<template>
  <el-upload
    ref="upload"
    :action="action"
    :name="name"
    :multiple="multiple"
    :onSuccess="handleSuccess"
    :onPreview="onPreview"
    :onRemove="handleRemove"
    :accept="accept"
    :fileList="fileList"
    :autoUpload="autoUpload"
    :withCredentials="true">
    <slot></slot>
  </el-upload>
</template>

<script>
  export default {
    props: {
      action: {
        type: String,
        required: true
      },
      name: String,
      multiple: {
        type: Boolean,
        default: false
      },
      onSuccess: Function,
      onPreview: Function,
      onRemove: Function,
      accept: {
        type: String,
        default: ''
      },
      fileList: Array,
      autoUpload: {
        type: Boolean,
        default: false
      },
      uploadId: Number,
      withCredentials:Boolean
    },
    methods: {
      submit() {
        this.$refs.upload.submit()
      },
      handleSuccess() {
        let arg = [].slice.call(arguments)
        arg.push(this.uploadId)
        this.onSuccess.apply(this, arg)
      },
      handleRemove() {
        let arg = [].slice.call(arguments)
        arg.push(this.uploadId)
        this.onRemove.apply(this, arg)
      }
    }
  }
</script>
