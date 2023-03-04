<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
let baseUrlServiceAdmin = 'http://localhost:4002'
let baseUrlServiceForum = 'http://localhost:4003'
export default {
  components: {
    Navbar
  },
  data() {
    return {
      dataReports: []
    }
  },
  methods: {
    async fetchReport() {
      console.log('Fetch data - report page')
      try {
        const { data } = await axios({
          url: baseUrlServiceAdmin + '/reports', //! Masih belum dimasukin URL-nya
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data, '<- Ini data Report')
        this.dataReports = data
      } catch (error) {
        console.log(error)
      }
    },
    async deletePost(postId) {
      try {
        const { data } = await axios({
          url: `${baseUrlServiceForum}/posts/${postId}/`, //! Masih belum dimasukin URL-nya
          method: 'DELETE',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data, '<- Ini data Delete')
        await this.deleteReport(reportId)
        await this.fetchReport()
        await this.$router.push('/forum')
      } catch (error) {
        console.log(error)
      }
    },
    async deleteComment(commentId, reportId) {
      try {
        const { data } = await axios({
          url: `${baseUrlServiceForum}/comments/${commentId}/`, //! Masih belum dimasukin URL-nya
          method: 'DELETE',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data, '<- Ini data Delete Comment')
        await this.deleteReport(reportId)
        await this.fetchReport()
        await this.$router.push('/forum')
      } catch (error) {
        console.log(error)
      }
    },
    async deleteReport(reportId) {
      try {
        const { data } = await axios({
          url: `${baseUrlServiceAdmin}/reports/${reportId}/`, //! Masih belum dimasukin URL-nya
          method: 'DELETE',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data, '<- Ini data Delete Report')
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.fetchReport()
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
        <h1 class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Forum Report Page</h1>
      </div>
      <div class="row">
        <div class="col-12">
          <table class="table align-middle">
            <!-- Untuk Table Jobs -->
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Note</th>
                <th scope="col">Post ID</th>
                <th scope="col">Comment ID</th>
                <th scope="col">Reporter ID</th>
                <th scope="col">Action</th>
                <th scope="col col-span"></th>
                <th scope="col" width="50px"></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(data, index) in dataReports" :key="index">
                <td>{{ ++index }}</td>
                <td>{{ data.note }}</td>
                <td>{{ data.postId }}</td>
                <td>{{ data.commentId }}</td>
                <td>{{ data.ReporterId }}</td>
                <td v-show="data.postId && !data.commentId">
                  <button
                    @click.prevent="deletePost(data.postId, data.id)"
                    type="button"
                    class="btn btn-warning"
                  >
                    Delete Post
                  </button>
                </td>
                <td v-show="data.commentId">
                  <button
                    @click.prevent="deleteComment(data.commentId, data.id)"
                    type="button"
                    class="btn btn-danger"
                  >
                    Delete Comment
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>
