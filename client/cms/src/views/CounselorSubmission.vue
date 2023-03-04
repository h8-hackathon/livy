<script>
import Navbar from '../components/Navbar.vue'
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
import Card from '../components/Card.vue'
import axios from 'axios'
let baseUrl = 'https://api.livy.chat'

export default {
  props: ['counselor'],
  components: {
    Navbar
  },
  computed: {
    ...mapState(useCounterStore, ['counselors'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchCounselors', 'updateStatusCounselor']),
    // acceptCounselor(id) {},
    async acceptCounselor(id) {
      await axios.patch(
        baseUrl + `/counselor/${id}`,
        {
          headers: {
            access_token: localStorage.access_token
          }
        }
      )
      await this.fetchCounselors()
      await this.$router.push('/forum')
    }
  },
  created() {
    this.fetchCounselors()
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
        <h1 class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Counselor Submisson List</h1>
      </div>
      <div class="row">
        <div class="col-12">
          <table class="table align-middle">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Photo</th>
                <th scope="col">Status</th>
                <th scope="col">Submission</th>
                <th scope="col">Counselor's Name</th>
                <th scope="col">Counselor's Email</th>
                <th scope="col">Counselor's DoB</th>
                <th scope="col">Counselor's User ID</th>
                <th scope="col">Action</th>
                <th scope="col" width="50px"></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(el, index) in counselors" :key="index">
                <td>{{ ++index }}</td>
                <td>{{ el.User.image }}</td>
                <td>{{ el.status }}</td>
                <td>{{ el.submissions }}</td>
                <td>{{ el.User.name }}</td>
                <td>{{ el.User.email }}</td>
                <td>{{ el.User.dob }}</td>
                <td>{{ el.UserId }}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-success text-light"
                    @click.prevent="acceptCounselor(el.id)"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger m-2"
                    @click.prevent="rejectCounselor(el.id)"
                  >
                    Delete / Reject
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
