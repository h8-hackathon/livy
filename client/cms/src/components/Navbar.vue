<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      role: ''
    }
  },
  methods: {
    async logoutHandler() {
      console.log('Test handle log out')
      localStorage.clear()

      await this.$router.push('/login')

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Successfully log out',
        showConfirmButton: false,
        timer: 1800
      })
    }
  },
  created() {
    this.role = localStorage.role
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-red navbar-dark">
    <div class="wrapper"></div>
    <div class="container-md all-show d-flex ">
      <img src="../assets/Logo.png" style="height: 60px; margin-right: 30px" />
      <a class="navbar-brand" href="#" @click.prevent="$router.push(`/`)">Livy Admin</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="container-fluid d-flex align-items-center  justify-content-between">
        <div>
          <div class=" collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href=""
                  @click.prevent="$router.push(`/content`)"><b>Content</b></a>
              </li>

              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href=""
                  @click.prevent="$router.push(`/counselor`)"><b>Counselor</b></a>
              </li>

              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="" @click.prevent="$router.push(`/forum`)"><b>Forum
                    Reports</b></a>
              </li>

              <li v-if="role === 'superadmin'" class="nav-item">
                <a class="nav-link active" aria-current="page" href=""
                  @click.prevent="$router.push(`/admin-list`)"><b>Admin List</b></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="  d-flex align-items-center">
          <h5 class="greet px-4">Hi, <span>Admin!</span></h5>
          <button type="button" class="btn btn-danger btn-sm" @click="logoutHandler">Log Out</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
body {
  background-color: #eee;
}

.navbar-nav>li>a {
  text-transform: capitalize;
  font-size: 1rem;
  font-weight: 300 !important;
  margin-right: 20px;
  color: #fff;
}

.greet {
  text-transform: capitalize;
  font-size: 1rem !important;
  font-weight: 400 !important;
  color: #fff;
  margin-top: 5px;
}

.navbar-toggler {
  padding: 0.2rem 0.5rem;
  font-size: 1.25rem;
  line-height: 1;
  background-color: transparent;
  border: 1px solid white;
}

.nav-link {
  color: #fff !important;
  font-size: 1rem !important;
}

.wrapper {
  width: 100%;
  position: absolute;
  height: 100%;
  background-color: #5a9f63;
  clip-path: polygon(81% 0, 100% 0, 100% 50%, 100% 100%, 71% 100%);
  transition: 1s all;
}

.navbar-brand {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
}

.navbar-red:hover .wrapper {
  clip-path: polygon(81% 0, 100% 0, 100% 50%, 100% 100%, 65% 100%);
}

.navbar-brand:hover {
  color: #fff;
}

.navbar-red {
  background-color: #1fa173;
  color: #fff;
}

.all-show {
  z-index: 10;
}
</style>
