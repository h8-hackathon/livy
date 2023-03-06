<script>
import Navbar from '../components/Navbar.vue'
import { mapActions, mapState, mapStores } from 'pinia'
import { useCounterStore } from '../stores/counter'
import axios from 'axios'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      title: '',
      caption: '',
      contentType: '',
      linkURL: '',
      //   baseUrl: 'http://localhost:4002/'
      baseUrl: 'https://api.livy.chat/'
    }
  },
  computed: {
    ...mapState(useCounterStore, ['postByID'])
  },
  methods: {
    ...mapActions(useCounterStore, ['editPosts']),
    async fetchPostsByID(id) {
      console.log('Fetch data - from post page')
      try {
        const { data } = await axios({
          url: this.baseUrl + `cms/posts/${id}`,
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.title = data.title
        this.caption = data.caption
        this.contentType = data.type.toLowerCase()
        this.linkURL = data.url
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.fetchPostsByID(this.$route.params.id)
  }
}
</script>

<template>
  <div>
    <Navbar />
    <section
      class="col-md-9 ms-sm-auto col-lg-10 px-md-4"
      id="new-job-section"
      style="margin: auto"
    >
      <div class="justify-content-between align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1
          class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
          style="margin: auto; text-align: center"
        >
          Form - Edit Content
        </h1>
      </div>
      <div class="row" style="margin: auto; width: 50%">
        <div class="">
          <form
            id="new-job-form"
            @submit.prevent="
              editPosts(
                {
                  title: this.title,
                  caption: this.caption,
                  type: this.contentType,
                  url: this.linkURL
                },
                $route.params.id
              )
            "
          >
            <div class="mb-3">
              <label for="product-name">Title <span class="text-danger fw-bold">*</span></label>
              <input type="text" class="form-control" autocomplete="off" required v-model="title" />
            </div>

            <div class="mb-3">
              <label for="product-name">Caption <span class="text-danger fw-bold">*</span></label>
              <textarea
                type="text"
                rows="10"
                class="form-control"
                autocomplete="off"
                required
                v-model="caption"
              />
            </div>

            <div class="mb-3">
              <label for="product-category"
                >Content Type <span class="text-danger fw-bold">*</span></label
              >
              <select id="content-type" class="form-select" required v-model="contentType">
                <option value="" selected disabled>-- Select Type --</option>
                <option value="article">Article</option>
                <option value="podcast">Podcast</option>
                <option value="video">Video</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="product-name">Link URL <span class="text-danger fw-bold">*</span></label>
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                required
                v-model="linkURL"
              />
            </div>

            <div class="row mt-4 mb-3">
              <div class="col-6">
                <button class="btn btn-lg btn-primary rounded-pill w-100 p-2" type="submit" href="">
                  Submit
                </button>
              </div>

              <div class="col-6">
                <button
                  class="btn btn-lg btn-danger rounded-pill w-100 p-2"
                  href=""
                  @click.prevent="$router.push(`/content`)"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
