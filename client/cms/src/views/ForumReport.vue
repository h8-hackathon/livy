<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
let baseUrl = 'https://api.livy.chat'
export default {
  components: {
    Navbar
  },
  data() {
    return {
      dataPostReports: [],
      dataCommentReports: []
    }
  },
  methods: {
    async fetchReport() {
      console.log('Fetch data - report page')
      try {
        const { data } = await axios({
          url: baseUrl + '/cms/forumreport', //! Masih belum dimasukin URL-nya
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data, '<- Ini data Report')
        this.dataPostReports = data.postReports
        this.dataCommentReports = data.commentReports
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
    async ignoreReportPost(postID) {
      try {
        const { data } = await axios({
          url: `${baseUrl}/cms/forumreport/posts/ignore/${postID}/`,
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data, '<- Ini data Ignore Report')
        await this.fetchReport()
        await this.$router.push('/forum')
      } catch (error) {
        console.log(error)
      }
    },
    async ignoreReportComment(commentID) {
      try {
        const { data } = await axios({
          url: `${baseUrl}/cms//forumreport/comments/ignore/${commentID}/`,
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data, '<- Ini data Ignore Report')
        await this.fetchReport()
        await this.$router.push('/forum')
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
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
      >
        <h5 class="text-center fw-bold  mx-1 mx-md-4 ">Forum Report Post</h5>
      </div>
      <div class="row">
        <div class="col-12">
          <table class="table align-middle">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Title</th>
                <th scope="col">Images</th>
                <th scope="col">Caption</th>
                <th scope="col">Author Name</th>
                <th scope="col">Author Email</th>
                <th scope="col">Action</th>
                <th scope="col col-span"></th>
                <th scope="col" width="50px"></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(data, index) in dataPostReports" :key="index">
                <td>{{ ++index }}</td>
                <td>{{ data.title }}</td>
                <td>{{ data.images }}</td>
                <td>{{ data.caption }}</td>
                <td>{{ data.author.name }}</td>
                <td>{{ data.author.email }}</td>
                <td>
                  <button
                    @click.prevent="deletePost(data._id)"
                    type="button"
                    class="btn btn-danger"
                  >
                    Delete Post
                  </button>
                </td>
                <td>
                  <button
                    @click.prevent="ignoreReportPost(data._id)"
                    type="button"
                    class="btn btn-warning"
                  >
                    Ignore Report
                  </button>
                </td>
               
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
      >
        <h5 class="text-center fw-bold  mx-1 mx-md-4 ">Forum Report Comments</h5>
      </div>
      <div class="row">
        <div class="col-12">
          <table class="table align-middle">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Title</th>
                <th scope="col">Images</th>
                <th scope="col">Caption</th>
                <th scope="col">Author Name</th>
                <th scope="col">Author Email</th>
                <th scope="col">Action</th>
                <th scope="col col-span"></th>
                <th scope="col" width="50px"></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(data, index) in dataCommentReports" :key="index">
                <td>{{ ++index }}</td>
                <td>{{ data.title }}</td>
                <td>{{ data.images }}</td>
                <td>{{ data.caption }}</td>
                <td>{{ data.author.name }}</td>
                <td>{{ data.author.email }}</td>
           
                <td >
                  <button
                    @click.prevent="deleteComment(data._id)"
                    type="button"
                    class="btn btn-danger"
                  >
                    Delete Comment
                  </button>
                </td>
                <td>
                  <button
                    @click.prevent="ignoreReportComment(data._id)"
                    type="button"
                    class="btn btn-warning"
                  >
                    Ignore Report
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
