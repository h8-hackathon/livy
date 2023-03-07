<script>
import Navbar from '../components/Navbar.vue'
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  components: {
    Navbar
  },
  computed: {
    ...mapState(useCounterStore, ['admins'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchAdmin', 'deleteAdmin'])
  },
  created() {
    this.fetchAdmin()
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
        <h1 class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">List of Admin</h1>
        <div>
          <button type="button" class="btn btn-success" @click.prevent="$router.push(`/admin-add`)">
            + Add New Admin
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
                <th scope="col" width="100px">Admin ID</th>
                <th scope="col" width="100px">Image</th>
                <th scope="col" width="150px">Name</th>
                <th scope="col" width="300px">Email</th>
                <th scope="col" width="100px">Gender</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
                <th scope="col" width="50px"></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(el, index) in admins" :key="index">
                <td>{{ ++index }}</td>
                <td>{{ el.id }}</td>
                <td>
                  <img :src="el.image" alt="Admin's Image" width="150" height="150" />
                </td>
                <td>{{ el.name }}</td>
                <td>{{ el.email }}</td>
                <td>{{ el.gender }}</td>
                <td>{{ el.dob }}</td>
                <td>{{ el.role }}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning text-light m-1"
                    @click.prevent="$router.push(`/admin-edit/${el.id}`)"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger m-1"
                    @click.prevent="deleteAdmin(el.id)"
                  >
                    Delete
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
