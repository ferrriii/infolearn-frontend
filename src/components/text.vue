<template>
  <div class="flex flex-column mw8 w-90 pt4 pt3-l">
    <li class="flex items-center lh-copy pv3 pr3">
      <img class="w2-5 h2-5 w3-ns h3-ns br-100 bg-silver" alt="" :src="`https://avatars.dicebear.com/v2/initials/${text.book.title}.svg`" />
      <div class="pl3 flex-auto">
        <span class="f5 f4-ns db b">{{text.book.title}}</span>
        <span class="f6 f5-ns db o-70">{{text.author.name}}</span>
      </div>
    </li>
    <transition name="fade" mode="out-in">
      <!-- textarea can handle mixed ltr & rtl texts better -->
      <textarea :key="text.id" v-model="text.text" @focus="changeFocus" dir="auto" readonly class="f3 f2-m f1-l flex-grow flex flex-column ph3 bg-transparent cursor-pointer bn outline-0 resize-none color-inherit overflow-hidden measure-narrow lh-copy"></textarea>
    </transition>
    <div class="flex justify-between f3 mb4 mb5-l">
      <span class="flex items-center">
        <font-awesome-icon v-if="!text.liked" @click.stop="likeText" :icon="['far', 'heart']" class="cursor-hand" />
        <font-awesome-icon v-if="text.liked" @click.stop="dislikeText" :icon="['fas', 'heart']" class="red cursor-hand" :class="{'bounce':isBounce}"/>
        <span class="f6 ml2">{{text.numberOfLikes}}</span>
      </span>
      <span>
        <font-awesome-icon @click.stop="copyText" :icon="['far', 'copy']" class="mh3 cursor-hand" />
        <!-- <font-awesome-icon :icon="['far', 'bell']" /> -->
      </span>
    </div>
  </div>
</template>

<script>
import copy from 'text-copy'

export default {
  props: ['text'],
  data () {
    return {
      isBounce: false
    }
  },
  watch: {
    text () {
      this.isBounce = false
    }
  },
  methods: {
    copyText () {
      copy(this.text.text)
    },
    async likeText () {
      this.text.numberOfLikes++
      this.text.liked = true
      this.isBounce = true
      let response = await this.$axios.get('/like/' + this.text.id)
      if (response.status !== 204) {
        this.text.numberOfLikes--
        this.text.liked = false
        this.isBounce = false
      }
    },
    async dislikeText () {
      this.text.numberOfLikes--
      this.text.liked = false
      this.isBounce = false
      let response = await this.$axios.get('/removelike/' + this.text.id)
      if (response.status !== 204) {
        this.text.numberOfLikes++
        this.text.liked = true
      }
    },
    changeFocus () {
      document.body.focus()
    }
  }
}
</script>

<style>
.cursor-pointer {
  cursor: default;
}

@keyframes bounce {
  0%,
  100% {
    transform: none;
  }
  30% {
    transform: scale(1.3);
  }
  60% {
    transform: scale(0.9);
  }
}

.bounce {
  animation: bounce 0.5s linear;
}
</style>
