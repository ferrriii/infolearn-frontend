<template>
  <div class="about absolute top-0 w-100 flex flex-column flex-grow h-100 justify-between items-center bg-light primary" >
    <div class="mw-100 mw9-ns w-100 h-100 mv1 flex justify-center">
      <div class="flex flex-column mw8 w-90 pv1 pt3-l">
        <input ref="query" @input="debounceQuery" class="ba br4 pa2 b--black-30" placeholder="Search...">

        <div class="mt1 o-90 w-100 f6 fw4 flex justify-between">
          <div class="w-33 pv2 tc bb bw1 cursor-hand o-70 b--black-30">texts</div>
          <div class="w-33 pv2 tc bb bw1 b--primary b">collections</div>
          <div class="w-33 pv2 tc bb bw1 cursor-hand o-70 b--black-30">people</div>
        </div>

        <div class="flex-grow overflow-y-auto" style="height:0px; min-height:50px">
          <Card v-for="book in collections" :key="book.id" :title="book.title" :subtitle="book.lastText" :book="book">
            <div v-if="book.subscribed" @click="unsubscribe(book)" class="f6 dib br-pill ba b--black-10 dim cursor-hand primary pv1 ph2 pv2-ns ph3-ns mh1" type="submit">Unsub</div>
            <div v-if="!book.subscribed" @click="subscribe(book)" class="f6 dib bg-primary br-pill ba b--black-10 dim cursor-hand white pv1 ph2 pv2-ns ph3-ns mh1" type="submit">Subscribe</div>
          </Card>
        </div>

      </div>

    </div>
    <div class="o-90 w-100 f4 shadow-1 white bg-black flex justify-between">
      <router-link to="/" @click.native.stop="" class="white w-33 pv2 tc"><font-awesome-icon :icon="['fas', 'home']" /></router-link>
      <div @click.stop="" class="light-yellow w-33 pv2 tc"><font-awesome-icon :icon="['fas', 'search']" /></div>
      <router-link to="me" @click.native.stop="" class="white w-33 pv2 tc"><font-awesome-icon :icon="['fas', 'user-alt']" /></router-link>
    </div>
  </div>
</template>

<script>
import { debounce } from 'debounce'
import Card from '@/components/card.vue'

export default {
  data () {
    return {
      q: '',
      collections: []
    }
  },
  computed: {
    query () {
      return this.q
    }
  },
  watch: {
    query () {
      this.search()
    }
  },
  methods: {
    debounceQuery: debounce(function (e) {
      this.q = e.target.value.trim()
    }, 250),
    async search () {
      if (this.query === '') {
        this.collections = []
        return
      }
      let response = await this.$axios.post('/search/books', { q: this.query })
      let body = response.data
      this.collections = body.data
    },
    async subscribe (book) {
      let response = await this.$axios.post('/subscribe', { book: book.id })
      if (response.status === 200) {
        this.$set(book, 'subscribed', true)
      }
    }
  },
  activated () {
    this.q = this.$route.query.q
    this.$refs.query.value = this.q
  },
  components: {
    Card
  }
}
</script>

<style>
</style>
