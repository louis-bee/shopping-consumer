<template>
  <dialog ref="dialog" class="dialog" :class="placement" :style="{ width: dialogWidth+'px' }">
    <div v-if="showDelete" class="delete" @click="close">×</div>
    <slot></slot>
    <template>
      <div class="but-area">
        <div v-if="showConfirm" @click="onConfirm" class="button comfirm">确定</div>
        <div v-if="showCancel" @click="onCancel" class="button cancel">取消</div>
      </div>
    </template>
  </dialog>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    width: {
      default: 400
    },
    modal: { default: true },
    placement: {
      default: 'center' // 'top'
    },
    showConfirm: {
      default: true
    },
    showCancel: {
      default: true
    },
    showDelete: {
      default: true
    }
  },
  data () {
    return {
      clientWidth: 1536
    }
  },
  computed: {
    dialogWidth () {
      return this.pxTovw(this.width)
    }
  },
  mounted () {
    this.clientWidth = document.documentElement.clientWidth
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    show () {
      this.modal ? this.$refs.dialog.showModal() : this.$refs.dialog.show()
    },
    close () {
      this.$emit('on-close')
      this.$refs.dialog.close()
    },
    onConfirm () {
      this.$emit('on-confirm')
      this.close()
    },
    onCancel () {
      this.$emit('on-cancel')
      this.close()
    },
    handleResize () {
      this.clientWidth = document.documentElement.clientWidth
    },
    pxTovw (px) {
      return px / 1536 * this.clientWidth
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  margin: 0 auto;
  min-height: 150px;
  background-color: #fff;
  border: none;
  box-shadow: none;
  border-radius: 15px;
  padding: 0 32px 46px 32px;
  z-index: 999;
  position: fixed;
  &.top {
    top: 50px
  }
  &.center {
    top: 50%;
    transform: translateY(-50%);
  }
  .delete {
    cursor: pointer;
    user-select: none;
    height: 30px;
    width: 30px;
    line-height: 30px;
    font-size: 30px;
    font-weight: 200;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    right: 7px;
    top: 6px;
    &:hover {
      background-color: #ededed;
    }
    &:active {
      background-color: #d7d7d7;
    }
  }
  &::backdrop {
    border: none;
    box-shadow: none;
    background: black;
    opacity: 0.5;
  }

  .but-area {
    position: absolute;
    bottom: 10px;
    right: 24px;
    display: flex;
    gap: 10px;
    .button {
      cursor: pointer;
      user-select: none;
      padding: 0 12px;
      height: 36px;
      line-height: 36px;
      border-radius: 18px;
      &:hover {
        background-color: #ededed;
      }
      &:active {
        background-color: #d7d7d7;
      }
    }
  }
}
</style>
