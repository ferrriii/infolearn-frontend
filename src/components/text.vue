<template>
  <div class="flex flex-column mw8 w-90 pt5 pt3-l">
    <li class="flex items-center lh-copy pv3 pr3">
      <img class="w2-5 h2-5 w3-ns h3-ns br-100 bg-silver" :src="`https://avatars.dicebear.com/v2/initials/${text.book.title}.svg`" />
      <div class="pl3 flex-auto">
        <span class="f5 f4-ns db b">{{text.book.title}}</span>
        <span class="f6 f5-ns db o-70">{{text.author.name}}</span>
      </div>
    </li>
    <transition name="fade" mode="out-in">
      <h1 :key="text.id" dir="auto" class="f3 f2-m f1-l flex-grow flex flex-column justify-center ph3 pre-wrap overflow-hidden measure-narrow lh-copy">{{text.text}}</h1>
    </transition>
    <div class="flex justify-between f3">
      <span class="flex items-center">
        <font-awesome-icon :icon="['far', 'heart']" />
        <span class="f6 ml1">{{text.numberOfLikes}}</span>
      </span>
      <span>
        <font-awesome-icon :icon="['far', 'copy']" class="mh3" />
        <font-awesome-icon :icon="['far', 'bell']" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['text'],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
.pre-wrap {
  white-space: pre-wrap;
}
</style>
