<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ]),
    ...mapState({
      deviceId: state => state.deviceId
    }),
    randomId () {
      return Number.parseInt(Math.random() * 999999999999999)
    }
  },
  methods: {
    ...mapActions([
      'register'
    ])
  },
  created () {
    if (!this.deviceId) {
      let deviceId = this.randomId
      this.register({ deviceId })
    }
  }
}
</script>

<style>
@import "./assets/tachyons.min.css";
@import "./assets/style.css";
</style>
