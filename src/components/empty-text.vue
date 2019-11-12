<template>
  <div class="flex flex-column justify-center tc">
    <h1 class="f3 f2-l mb3">what are you interested in?</h1>
    <h2 class="f5 f4-l fw2 mt0 black-70">search, subscribe and learn</h2>
    <div class="cf mt5 mt6-l">
      <form>
      <input v-focus v-model="query" class="f4 f3-l input-reset h3 bg-black-10 bn fl black-80 tc pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" placeholder="504 english" type="text" name="query" value="">
      <input @click="search" class="f6 f5-l button-reset h3 fl pv3 tc bn bg-animate bg-primary hover-bg-black white cursor-hand w-100 w-25-m w-20-l br2-ns br--right-ns" type="submit" value="Search...">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['text'],
  data () {
    return {
      query: ''
    }
  },
  methods: {
    search () {
      this.$router.push({ path: 'explore', query: { q: this.query } })
    }
  }
}
</script>

<style>
</style>
