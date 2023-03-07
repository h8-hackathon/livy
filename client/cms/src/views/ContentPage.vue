<script>
import Navbar from '../components/Navbar.vue'
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      title: '',
      caption: '',
      contentType: '',
      linkURL: ''
    }
  },
  computed: {
    ...mapState(useCounterStore, ['posts'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchPosts', 'addPosts', 'deletePosts'])
  },
  created() {
    this.fetchPosts()
  }
}
</script>

<template>
  <div>
    <Navbar />
    <section class="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="company-section" style="margin: auto">
      <div class="d-flex justify-content-between flex-wrap  flex-md-nowrap pt-3 align-items-center mt-5  mb-4 ">
        <h1 class="header">List of Content</h1>
        <button style="font-size: small;  10px; " class="btn btn-success" @click.prevent="$router.push(`/content-add`)">
          + Add New Content
        </button>
      </div>

      <div class="table-responsive">
        <table class="table align-middle table-borderless" style="min-width: max-content;">
          <!-- Untuk Table Jobs -->
          <thead >
            <tr class="thead  ">
              <th width="5%">No.</th>
              <th width="20%">Title</th>
              <th width="25%">Caption</th>
              <th width="15%">Type</th>
              <th width="10%">Link URL</th>
              <th width="15%">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(el, index) in posts" :key="index">
              <td>{{ ++index }}</td>
              <td>{{ el.title }}</td>
              <td style="overflow-y: auto; ">
                <div style="max-height:100px; ">
                  {{ el.caption }}
                </div>
              </td>
              <td>{{ el.type }}</td>
              <td>
                <a :href="el.url" target="_blank">Link URL</a>
              </td>
              <td>
                <button type="button" class="btn btn-warning my-2  btn-sm text-light "
                  @click.prevent="$router.push(`/content-edit/${el.id}`)">
                  Edit
                </button>
                <button type="button" class="btn btn-danger btn-sm m-2" @click.prevent="deletePosts(el.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<style scoped>
.thead{
  background: #f6f6f6;
  color: #909090;
}
tr th{
  padding: 10px!important;
  font-size: 0.9rem;
  font-weight: 600!important;
} 

td {
  color: #909090;
  font-size: 0.96rem;
  font-weight: 400!important;
}
.header {
  font-size: 1.4rem ;
}


</style>
