<template>
  <div @click="nextText" :style="{ backgroundColor, color}" class="about absolute top-0 w-100 flex flex-column flex-grow h-100 justify-between items-center disable-select bg-animate-slow">
    <div class="mw-100 mw9-ns w-90 h-75 flex justify-center">

      <text-display v-if="displayText" :text="text"/>
      <empty-text v-if="displayCTA" />

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
      index: 0,
      texts: [],
      textsLoaded: false
    }
  },
  computed: {
    ...mapGetters(['isAuthorized']),
    hasText () {
      return this.texts.length > 0 && this.index >= 0 && this.index < this.texts.length
    },
    displayText () {
      return this.hasText
    },
    displayCTA () {
      return this.textsLoaded && !this.hasText
    },
    text () {
      if (!this.hasText) return {}
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
    async loadTexts (timeOffset = {}) {
      this.textsLoaded = false
      let response = await this.$axios.post('/text/next', { time: timeOffset })
      let body = response.data
      this.texts = this.texts.concat(body.data)
      this.textsLoaded = true
    },
    nextText () {
      if (this.index < this.texts.length - 1) {
        this.index++
        this.viewText()
      }
      if (this.index >= this.texts.length - 2) {
        const timeOffset = {}
        this.texts.forEach(txt => {
          let bookTime = timeOffset[txt.book.id] || 0
          if (txt.time > bookTime) {
            timeOffset[txt.book.id] = txt.time
          }
        })
        this.loadTexts(timeOffset)
      }
    },
    async initializeTexts () {
      this.index = 0
      await this.loadTexts()
      this.viewText()
    },
    async viewText () {
      console.log('viewText', this.hasText)
      if (!this.hasText) return
      this.$axios.post('/read', { text: this.text })
      // TODO: retry?
    }
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
