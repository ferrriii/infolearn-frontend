<template>
  <div class="about absolute top-0 w-100 flex flex-column flex-grow h-100 justify-between items-center bg-light primary" >
    <div class="mw-100 mw9-ns w-100 h-100 flex justify-center">

      <div class="flex flex-column mw8 w-90 pv1 pt3-l">
        <li class="flex items-center lh-copy pv3 pr3">
          <img class="w2-5 h2-5 w3-ns h3-ns br-100 bg-secondary" :src="`https://avatars.dicebear.com/v2/initials/${book.title}.svg`" />
          <div class="pl3 flex-auto">
            <span class="f5 f4-ns db b">{{book.title}}</span>
            <span class="f6 f5-ns db o-70">{{book.description}}</span>
          </div>
          <font-awesome-icon :icon="['fas', 'paper-plane']" @click="post" class="mh3 f3 cursor-hand" v-bind:class="{ 'black': canSend, 'black-40': !canSend }" />
        </li>
        <textarea v-model="text" maxlength="115" dir="auto" class="bw0 resize-none bg-transparent flex-grow pa2 f3 f2-m f1-l lh-copy" placeholder="type here..."></textarea>

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
    async post () {
      if (!this.text) return
      let response = await this.$axios.post('/publish', {
        text: this.text,
        book: this.book.id
      })
      if (response.status === 200) {
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
