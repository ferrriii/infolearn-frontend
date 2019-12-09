<template>
  <article class="dt w-100 pv1 mt2 hover-bg-black-10" href="#0">
    <div class="dtc w2-5 w3-ns v-mid">
      <img class="w2-5 h2-5 w3-ns h3-ns br-100 bg-secondary" alt="" :src="img" />
    </div>
    <div class="dtc v-mid pl2">
      <h1 class="f6 f5-ns fw6 lh-title black mv0">{{title}}</h1>
      <h2 class="f6 fw4 mt0 mb0 o-70 mt1 mt2-ns">{{subtitle}}</h2>
    </div>
    <div class="dtc v-mid">
      <form class="w-100 tr">
        <slot></slot>
      </form>
    </div>
  </article>
</template>

<script>
export default {
  props: ['title', 'subtitle', 'img'],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
