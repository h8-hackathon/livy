<script>
import Navbar from '../components/Navbar.vue'
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
import axios from 'axios'

// let baseUrl = 'https://api.livy.chat'
let baseUrl = 'http://localhost:4002'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      status: 'pending'
    }
  },
  computed: {
    ...mapState(useCounterStore, ['counselors'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchCounselors', 'updateStatusCounselor', 'deleteCounselor']),

    handleAcceptCounselor(id) {
      this.updateStatusCounselor('accepted', id)
    },

    handleRejectCounselor(id) {
      this.deleteCounselor(id)
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
    <section class="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="company-section" style="margin: auto">
      <div class="d-flex justify-content-between flex-wrap  flex-md-nowrap pt-3 align-items-center mt-5  mb-4 ">
        <h1 class="header">Counselor Submisson List</h1>
      </div>
      <div class="table-responsive">
        <table class="table align-middle table-borderless" style="min-width: max-content;">
          <!-- Untuk Table Jobs -->
          <thead>
            <tr class="thead  ">
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
              <td>
                <img :src="el.User.image" alt="Counselor's Image" width="150" height="150" />
              </td>
              <td>{{ el.status }}</td>
              <td>{{ el.submissions }}</td>
              <td>{{ el.User.name }}</td>
              <td>{{ el.User.email }}</td>
              <td>{{ el.User.dob }}</td>
              <td>{{ el.UserId }}</td>
              <td>
                <button type="button" class="btn btn-success text-light m-1"
                  @click.prevent="handleAcceptCounselor(el.UserId)">
                  Accept
                </button>
                <button type="button" class="btn btn-danger m-1" @click.prevent="handleRejectCounselor(el.id)">
                  Delete/Reject
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
.thead {
  background: #f6f6f6;
  color: #909090;
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
