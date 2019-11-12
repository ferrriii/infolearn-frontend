<template>
    <modal @close="$emit('cancel')" v-slot="slotProps">
      <div class="pa2 bg-black--10 bb bw1 b--black-20 flex justify-between">
        <span @click="slotProps.close" class="cursor-hand">X</span>
        <span>Create Book</span>
        <span v-if="canCreate" @click="create(slotProps)" class="primary b cursor-hand">Create</span>
        <span v-if="!canCreate" class="primary b o-70">Create</span>
      </div>
      <form class="pv2 black-80">
        <div>
          <label for="title" class="f6 b db mb2 pv1 ph2 pa2">Title</label>
          <input v-model="title" v-focus id="title" class="input-reset outline-0 bg-transparent bb-only b--black-20 pa2 mb3 db w-100" type="text" placeholder="Book name">
        </div>
        <div>
          <label for="desc" class="f6 b db mb2 pv1 ph2">Description <span class="normal black-60">(optional)</span></label>
          <input v-model="description" id="desc" class="input-reset outline-0 bg-transparent bb-only b--black-20 pa2 mb3 db w-100" type="text" placeholder="Book description">
        </div>
      </form>
    </modal>
</template>

<script>
import Modal from '@/components/modal.vue'

export default {
  data () {
    return {
      title: '',
      description: ''
    }
  },
  computed: {
    canCreate () {
      return this.title !== ''
    }
  },
  methods: {
    async create ({ close }) {
      close()
      let response = await this.$axios.post('/books/', { title: this.title, description: this.description })
      if (response.status === 200) {
        let body = response.data
        let book = body.data
        this.$emit('bookCreated', book)
      }
    }
  },
  components: {
    Modal
  }
}
</script>

<style>
.bb-only {
  border-style: none;
  border-width: 0;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}
</style>
