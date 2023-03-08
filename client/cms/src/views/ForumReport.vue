<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
let baseUrl = 'https://api.livy.chat'
export default {
  components: {
    Navbar
  },
  computed: {
    ...mapState(useCounterStore, ['dataPostReports', 'dataCommentReports'])
  },


  methods: {
    ...mapActions(useCounterStore, ['fetchReport']),

    async deletePost(postId) {
      try {
        const { data } = await axios({
          url: `${baseUrl}/cms/forumreport/posts/${postId}`,
          method: 'DELETE',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data, '<- Ini data Delete')
        await this.fetchReport()
        await this.$router.push('/forum')
      } catch (error) {
        console.log(error)
      }
    },
    async deleteComment(commentId) {
      try {
        const { data } = await axios({
          url: `${baseUrl}/cms/forumreport/comments/${commentId}`,

          method: 'DELETE',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data, '<- Ini data Delete Comment')
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
    <section class="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="company-section" style="margin: auto">
      <div class="d-flex justify-content-between flex-wrap  flex-md-nowrap pt-3 align-items-center mt-5  mb-4 ">
        <h1 class="header">Forum Report Page</h1>
      </div>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active text-secondary" id="post-tab" data-bs-toggle="tab" data-bs-target="#post" type="button"
            role="tab" aria-controls="post" aria-selected="true">Forum Report Test</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link text-secondary" id="comment-tab" data-bs-toggle="tab" data-bs-target="#comment" type="button"
            role="tab" aria-controls="comment" aria-selected="false">Forum Report Comments</button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="post" role="tabpanel" aria-labelledby="post-tab">
          <div class="table-responsive">
            <table class="table align-middle table-borderless">
              <!-- Untuk Table Jobs -->
              <thead>
                <tr class="thead  ">
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
                    <button @click.prevent="deletePost(data._id)" type="button" class="btn btn-danger">
                      Delete Post
                    </button>
                  </td>
                  <td>
                    <button @click.prevent="ignoreReportPost(data._id)" type="button" class="btn btn-warning">
                      Ignore Report
                    </button>
                  </td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="tab-pane fade" id="comment" role="tabpanel" aria-labelledby="comment-tab">
          <div class="table-responsive">
            <table class="table align-middle table-borderless">
              <!-- Untuk Table Jobs -->
              <thead>
                <tr class="thead  ">
                  <th scope="col">No.</th>

                  <th scope="col">Text</th>
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
                  <td>{{ data.text }}</td>

                  <td>{{ data.author.name }}</td>
                  <td>{{ data.author.email }}</td>

                  <td>
                    <button @click.prevent="deleteComment(data._id)" type="button" class="btn btn-danger">
                      Delete Comment
                    </button>
                  </td>
                  <td>
                    <button @click.prevent="ignoreReportComment(data._id)" type="button" class="btn btn-warning">
                      Ignore Report
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </section>
  </div>
</template>

<style scoped>
.thead {
  background: #f6f6f6;
  color: #909090;
}

.active {
  color: #198754!important;
}

tr th {
  padding: 10px !important;
  font-size: 0.9rem;
  font-weight: 600 !important;
}

td {
  color: #909090;
  font-size: 0.96rem;
  font-weight: 400 !important;
}

.header {
  font-size: 1.4rem;
}
</style>