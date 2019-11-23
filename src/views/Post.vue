<template>
  <div class="about absolute top-0 w-100 flex flex-column flex-grow h-100 justify-between items-center bg-light primary" >
    <div class="mw-100 mw9-ns w-100 h-100 flex justify-center">

      <div class="flex flex-column mw8 w-100">
        <div class="bg-black--10 bb bw1 b--black-20 flex justify-between items-center pv1">
          <span @click="$router.go(-1)" class="cursor-hand w1 flex flex-column justify-center tc pa2">
            <font-awesome-icon :icon="['fas', 'arrow-left']" class="mh3 f3" />
          </span>
          <span>Post in {{ellipsis(book.title)}}</span>
          <span  @click="post" class="primary b pa1 cursor-hand">
            <font-awesome-icon :icon="['fas', 'paper-plane']" class="mh3 f3" v-bind:class="{ 'black': canSend, 'black-40': !canSend }" />
          </span>
        </div>

        <textarea v-model="text" maxlength="115" dir="auto" class="bw0 resize-none bg-transparent outline-0 flex-grow pa3 f3 f2-m f1-l lh-copy" placeholder="type here..."></textarea>
      </div>

    </div>
    <!-- <div class="o-90 w-100 pv3 ph1" :style="{ 'color': backgroundColor, 'background-color': color}">a</div> -->
    <div class="o-90 w-100 f4 shadow-1 white bg-black flex justify-between">
      <div class="w-33 pv2 tc"><router-link to="/" class="white"><font-awesome-icon :icon="['fas', 'home']" /></router-link></div>
      <div class="w-33 pv2 tc"><router-link to="explore" class="white"><font-awesome-icon :icon="['fas', 'search']" /></router-link></div>
      <div class="w-33 pv2 tc"><router-link to="me" class="white"><font-awesome-icon :icon="['fas', 'user-alt']" /></router-link></div>
    </div>
  </div>
</template>

<script>
import { ellipsis } from '@/modules/utils.js'

export default {
  props: ['book'],
  data () {
    return {
      text: ''
    }
  },
  computed: {
    canSend () {
      return this.text.length > 0 && this.text.length < 115
    }
  },
  methods: {
    ellipsis,
    async post () {
      if (!this.text) return
      let response = await this.$axios.post('/publish', {
        text: this.text,
        book: this.book.id
      })
      if (response.status === 204) {
        this.text = ''
      }
    }
  }
}
</script>

<style>
.resize-none {
  resize: none;
}
</style>
