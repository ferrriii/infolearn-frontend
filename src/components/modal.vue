<template>
  <span class="absolute overflow-hidden w-100 h-100 flex justify-center">
    <transition name="fade">
      <div v-if="show" @click="close" class="absolute overflow-hidden top-0 left-0 w-100 h-100 bg-black-70"></div>
    </transition>
    <transition name="slideup" @after-leave="closed" appear>
      <div v-if="show" class="absolute w-100 bottom-0 shadow-1 mw8 h5 bg-light black overflow-hidden">
        <slot :close="close"/>
      </div>
    </transition>
  </span>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  },
  methods: {
    close () {
      this.show = false
    },
    closed () {
      this.$emit('close')
    }
  }
}
</script>

<style>
.slideup-enter-active,
.slideup-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.slideup-enter,
.slideup-leave-to {
  opacity: 0;
  transform: translateY(50%);
}
</style>
