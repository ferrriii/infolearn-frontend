<template>
  <div @click="nextText" :style="{ backgroundColor, color}" class="about absolute top-0 w-100 flex flex-column flex-grow h-100 justify-between items-center disable-select bg-animate-slow">
    <div class="mw-100 mw9-ns w-90 h-75 flex justify-center">

      <text-display v-if="hasText" :text="text"/>
      <empty-text v-if="!hasText" />

    </div>
    <div class="o-90 w-100 f4 shadow-1 white bg-black flex justify-between">
      <div @click.stop="" class="light-yellow w-33 pv2 tc"><font-awesome-icon :icon="['fas', 'home']" /></div>
      <router-link to="explore" @click.native.stop="" class="white w-33 pv2 tc"><font-awesome-icon :icon="['fas', 'search']" /></router-link>
      <router-link to="me" @click.native.stop="" class="white w-33 pv2 tc"><font-awesome-icon :icon="['fas', 'user-alt']" /></router-link>
    </div>
  </div>
</template>

<script>
import TextDisplay from '@/components/text.vue'
import EmptyText from '@/components/empty-text.vue'
import { mapGetters } from 'vuex'
import { str2color, blackOrWhite } from '@/modules/utils.js'

export default {
  data () {
    return {
      index: -1,
      texts: []
    }
  },
  computed: {
    ...mapGetters(['isAuthorized']),
    hasText () {
      return this.texts.length > 0 && this.index >= 0 && this.index < this.texts.length
    },
    text () {
      if (this.index > this.texts.length) return {}
      return this.texts[this.index]
    },
    backgroundColor () {
      if (this.hasText) {
        return str2color(this.text.text)
      } else {
        return '#f0fff0'
      }
    },
    color () {
      return blackOrWhite(this.backgroundColor)
    }
  },
  watch: {
    isAuthorized (newVal, oldVal) {
      if (newVal) {
        this.initializeTexts()
      }
    }
  },
  methods: {
    async loadTexts (timeOffset = null) {
      let response = await this.$axios.get(`/text/next?time=${timeOffset}`)
      let body = response.data
      this.texts = this.texts.concat(body.data)
      //      this.texts = body.data
      //    this.index = 0
    },
    nextText () {
      this.index++
      if (this.index >= this.texts.length) return
      this.viewText()
      if (this.index === this.texts.length - 2) {
        const latestTextTime = this.texts.reduce((a, v) => {
          if (v.time > a) {
            return v.time
          } else {
            return a
          }
        }, 0)
        this.loadTexts(latestTextTime)
      }
      // if (index is close to last) load more
    },
    async viewText () {
      this.$axios.post('/read', { text: this.text })
      // TODO: retry?
    },
    async initializeTexts () {
      await this.loadTexts()
      this.index = 0
      this.viewText()
    }
  },
  async created () {
    if (this.isAuthorized) {
      this.initializeTexts()
    }
    // otherwise it will be called whenever isAuthorized is changed
  },
  async activated () {
    if (this.hasText) return
    this.initializeTexts()
  },
  components: {
    TextDisplay,
    EmptyText
  }
}
</script>

<style>
.bg-animate-slow {
  transition: background-color 0.75s ease-in-out;
}
</style>
