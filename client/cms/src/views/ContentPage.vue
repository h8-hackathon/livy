<script>
import Navbar from '../components/Navbar.vue'
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  components: {
    Navbar
  },
  computed: {
    ...mapState(useCounterStore, ['posts'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchPosts'])
  },
  created() {
    this.fetchPosts()
  }
}
</script>

<template>
  <div>
    <Navbar />
    <section
      class="col-md-9 ms-sm-auto col-lg-10 px-md-4"
      id="company-section"
      style="margin: auto"
    >
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
      >
        <h1 class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">List of Content</h1>
        <div>
          <button
            type="button"
            class="btn btn-success"
            @click.prevent="$router.push(`/content-add`)"
          >
            + Add New Content
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <table class="table align-middle">
            <!-- Untuk Table Jobs -->
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Title</th>
                <th scope="col">Caption</th>
                <th scope="col">Type</th>
                <th scope="col">Link URL</th>
                <th scope="col">Action</th>
                <th scope="col" width="50px"></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(el, index) in posts" :key="index">
                <td>{{ ++index }}</td>
                <td>{{ el.title }}</td>
                <td>{{ el.caption }}</td>
                <td>{{ el.type }}</td>
                <td>{{ el.url }}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning text-light"
                    @click.prevent="$router.push(`/content-add`)"
                  >
                    Edit
                  </button>
                  <button type="button" class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>
