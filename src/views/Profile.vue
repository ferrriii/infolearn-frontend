<template>
  <div class="about absolute top-0 w-100 flex flex-column flex-grow h-100 justify-between items-center bg-light primary" >
    <div class="mw-100 mw9-ns w-100 h-100 flex justify-center">

      <div class="flex flex-column mw8 w-90 pv1 pt3-l">
        <!--
        <li class="flex items-center lh-copy pv3 pr3">
          <img class="w2-5 h2-5 w3-ns h3-ns br-100 bg-secondary" src="https://avatars.dicebear.com/v2/initials/ssa.svg" />
          <div class="pl3 flex-auto">
            <span class="f5 f4-ns db b">504</span>
          </div>
        </li>
        -->
        <div class="flex justify-between items-center pv1">
          <span>My Books</span>
          <router-link to="/me/newbook">
          <div class="bg-primary white br-100 w2 h2 dtc tc dim cursor-hand">
            <span class="f3 white v-mid">+</span>
          </div>
          </router-link>
        </div>
        <div class="flex-grow overflow-y-auto bt bw1 b--black-30" style="height:0px; min-height:50px">
          <Card v-for="book in collections" :key="book.id" :title="ellipsisCardText(book.title)" :subtitle="ellipsisCardText(book.lastText)" :book="book" :img="`https://avatars.dicebear.com/v2/initials/${book.title}.svg`">
            <button v-if="book.subscribed" @click.prevent="unsubscribe(book)" class="f6 dib bg-light br-pill ba b--black-10 dim cursor-hand primary pv1 ph2 pv2-ns ph3-ns mh1" type="submit">Unsub</button>
            <button v-if="!book.subscribed" @click.prevent="subscribe(book)" class="f6 dib bg-primary br-pill ba b--black-10 dim cursor-hand white pv1 ph2 pv2-ns ph3-ns mh1" type="submit">Subscribe</button>
            <router-link :to="{ name: 'publish', params: { book }}">
              <button class="f6 button-reset bg-primary br-pill ba b--black-10 dim cursor-hand white pv1 ph2 pv2-ns ph3-ns mh1" type="submit">Post</button>
            </router-link>
          </Card>
        </div>

      </div>

    </div>
    <transition name="fade">
    <router-view @bookCreated="bookCreated" @cancel="$router.go(-1)"/>
    </transition>
    <div class="o-90 w-100 f4 shadow-1 white bg-black flex justify-between">
      <router-link to="/" @click.native.stop="" class="white w-33 pv2 tc"><font-awesome-icon :icon="['fas', 'home']" /></router-link>
      <router-link to="explore" @click.native.stop="" class="white w-33 pv2 tc"><font-awesome-icon :icon="['fas', 'search']" /></router-link>
      <div @click.stop="" class="light-yellow w-33 pv2 tc"><font-awesome-icon :icon="['fas', 'user-alt']" /></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '@/components/card.vue'
import { ellipsis } from '@/modules/utils.js'

export default {
  data () {
    return {
      collections: [ ],
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['isAuthorized'])
  },
  watch: {
    isAuthorized (newVal, oldVal) {
      if (newVal) {
        this.loadBooks()
      }
    }
  },
  methods: {
    ellipsisCardText (str) {
      return ellipsis(str, 19 + (window.screen.width - 375) / 20)
    },
    async subscribe (book) {
      let response = await this.$axios.post('/subscribe', { book: book.id })
      if (response.status === 204) {
        this.$set(book, 'subscribed', true)
      }
    },
    async unsubscribe (book) {
      let response = await this.$axios.post('/unsubscribe', { book: book.id })
      if (response.status === 204) {
        this.$set(book, 'subscribed', false)
      }
    },
    async loadBooks () {
      if (this.isLoading) return
      this.isLoading = true
      let response = await this.$axios.get('/my/books')
      let body = response.data
      this.collections = body.data
      this.isLoading = false
    },
    bookCreated (book) {
      this.collections.push(book)
    }
  },
  created () {
    if (this.isAuthorized) {
      this.loadBooks()
    } // otherwise it will be loaded whenever isAurhorized is changed to true
  },
  activated () {
    this.loadBooks()
  },
  components: {
    Card
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
