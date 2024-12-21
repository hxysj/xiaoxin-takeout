<template>
  <view
    class="ca-modal-body"
    :class="{'ca-modal-active' : animation, 'ca-modal-H5Top': H5Top, 'ca-modal-H5Bottom': H5Bottom}"
    :data-platform="platform"
  >
    <view
      class="ca-modal"
      :class="'ca-modal-' + position +' ' + 'ca-modal-' + mode"
    >
      <slot></slot>
    </view>
    <view
      v-if="mask"
      class="uni-mask"
      @touchmove.stop.prevent="moveHandle"
      catchtouchmove="true"
      @click.stop="hide()"
    ></view>
  </view>
</template>

<script>
const systemInfo = uni.getSystemInfoSync();
export default {
  data() {
    return {
      platform: systemInfo.platform
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    /*
    * 参数说明（定位）
    */
    position: {//可能值  top  left  right bottom middle
      type: String,
      default: 'middle'
    },
    /*
    * 参数说明
    * full 宽度100%
    * insert 80%宽度内联小框
    * cover 宽度高度100%
    */
    mode: {
      type: String,
      default: 'full'
    },
    mask: {
      type: Boolean,
      default: true
    },
    /*
    * H5置顶
    */
    H5Top: {
      type: Boolean,
      default: true
    },
    /*
    * H5置底
    */
    H5Bottom: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    animation: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  watch: {
    animation(value) {
      this.$emit('change', value);
    }
  },
  methods: {
    moveHandle() {
      return;
    },
    hide() {
      this.animation = false;
      return false;
    }
  }
}
</script>

<style lang="scss">
@charset "UTF-8";
.ca-modal {
  position: fixed;
  z-index: 2;
  transition: inherit;
}
.ca-modal-body {
  box-sizing: border-box;
  opacity: 0;
  position: fixed;
  top: 88rpx;
  bottom: 100rpx;
  left: 0;
  width: 100%;
  pointer-events: none;
  -webkit-transform: translateX(0);
  transform: translateX(0);
  transition: all 0.2s linear;
  z-index: 98;
}
.ca-modal-body.ca-modal-active {
  pointer-events: auto;
  opacity: 1;
}
.ca-modal-body.ca-modal-H5Top {
  top: 0;
  z-index: 999;
}
.ca-modal-body.ca-modal-H5Bottom {
  bottom: 0;
  z-index: 999;
}
.ca-modal-body .uni-mask {
  z-index: 1;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.ca-modal-middle {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.ca-modal-cover {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  transform: translate(100%, 0);
}
.ca-modal-top {
  left: 50%;
  z-index: 98;
  width: 100%;
  height: auto;
  transform: translate(-50%, -100%);
}
.ca-modal-top + .uni-mask {
  z-index: 97;
}
.ca-modal-full {
  width: 100%;
  left: 0;
  transform: translate(0, -100%);
}
.ca-modal-full.ca-modal-top {
  transform: translate(0, -200%);
}
.ca-modal-full.ca-modal-bottom {
  transform: translate(0, 100%);
  transition: inherit;
}
.ca-modal-right {
  right: 0;
  max-width: 80%;
}
.ca-modal-left {
  left: 0;
  max-width: 80%;
}
.ca-modal-middle.ca-modal-insert {
  min-width: 380rpx;
  min-height: 380rpx;
  max-width: 102%;
  max-height: 80%;
  transform: translate(-50%, -50%);
  background: none;
  box-shadow: none;
}
.ca-modal-body {
  opacity: 0;
  pointer-events: none;
}
.ca-modal-active {
  opacity: 1;
  pointer-events: auto;
}
.ca-modal-active .ca-modal-top {
  top: 88rpx;
  transform: translate(-50%, 0);
}
.ca-modal-active .ca-modal-full {
  transform: translate(0, -50%);
}
.ca-modal-active .ca-modal-full.ca-modal-top {
  transform: translate(0, 0);
}
.ca-modal-active .ca-modal-bottom {
  transform: translate(0, 0);
}
.ca-modal-active .ca-modal-cover {
  transform: translate(0, 0);
}
.ca-modal-bottom {
  bottom: 0;
}
</style>
