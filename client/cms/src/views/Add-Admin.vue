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
      name: '',
      email: '',
      gender: '',
      dob: '',
      image: '',
      role: ''
    }
  },
  computed: {},
  methods: {
    ...mapActions(useCounterStore, ['addAdmin']),
    handleAddAdmin() {
      this.addAdmin({
        name: this.name,
        email: this.email,
        gender: this.gender,
        dob: this.dob,
        image: this.image,
        role: this.role
      })
    }
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
          Form - Admin
        </h1>
      </div>
      <div class="row" style="margin: auto; width: 50%">
        <div class="">
          <form id="new-job-form" @submit.prevent="handleAddAdmin">
            <div class="mb-3">
              <label for="product-name">Name <span class="text-danger fw-bold">*</span></label>
              <input
                type="text"
                class="form-control"
                id="admin-name"
                autocomplete="off"
                v-model="name"
              />
            </div>

            <div class="mb-3">
              <label for="product-name">Email <span class="text-danger fw-bold">*</span></label>
              <input
                type="email"
                class="form-control"
                id="admin-email"
                autocomplete="off"
                v-model="email"
              />
            </div>

            <div class="mb-3">
              <label for="product-category"
                >Gender <span class="text-danger fw-bold">*</span></label
              >
              <select id="admin-gender" class="form-select" v-model="gender">
                <option value="" selected disabled>-- Select Type --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="product-name"
                >Date of Birth <span class="text-danger fw-bold">*</span></label
              >
              <input
                type="date"
                class="form-control"
                id="admin-DOB"
                placeholder="Enter input here"
                autocomplete="off"
                v-model="dob"
              />
            </div>

            <div class="mb-3">
              <label for="product-name">Image <span class="text-danger fw-bold">*</span></label>
              <input
                type="text"
                class="form-control"
                id="admin-image"
                autocomplete="off"
                v-model="image"
              />
            </div>

            <div class="mb-3">
              <label for="product-category"
                >Admin Type <span class="text-danger fw-bold">*</span></label
              >
              <select id="admin-type" class="form-select" v-model="role">
                <option value="" selected disabled>-- Select Type --</option>
                <option value="superadmin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="counselor">Counselor</option>
              </select>
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
                  @click.prevent="$router.push(`/admin-list`)"
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
