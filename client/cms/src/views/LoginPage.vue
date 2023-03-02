<script>
import { RouterLink } from 'vue-router'
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions(useCounterStore, ['googleLoginHandler'])
  }
}
</script>

<template>
  <section class="vh-100" style="background-color: rgb(47, 126, 216)">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 80px">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <h1 class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log In</h1>

                  <form class="mx-1 mx-md-4" @submit.prevent="submitHandler">
                    <!-- GOOGLE LOGIN -->
                    <div
                      id="google-button"
                      style="padding: 20px; display: flex; justify-content: center"
                    >
                      <GoogleLogin :callback="googleLoginHandler" />
                    </div>

                    <!-- LOGIN BUTTON -->
                    <!-- <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button class="btn btn-lg btn-primary rounded-pill w-100 p-2" type="submit">
                        Log In
                      </button>
                    </div> -->
                  </form>

                  <div
                    id="google-button"
                    style="padding: 20px; display: flex; justify-content: center"
                  >
                    <GoogleLogin :callback="googleLoginHandler" />
                  </div>

                  <div class="col-12" style="padding: 20px; display: flex; justify-content: center">
                    <!-- REGISTER -->
                    <!-- <p class="medium mb-0">
                      Don't have account?
                      <a href="" @click.prevent="$router.push('/register')">Create an account</a>
                    </p> -->
                  </div>
                </div>
                <div
                  class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                >
                  <img
                    src="https://img.freepik.com/free-vector/co-workers-concept-landing-page_52683-24774.jpg?w=740&t=st=1677779698~exp=1677780298~hmac=5596c8aff55f07a465badff38a1ef4f592d2a21620eac5d224668d2dca261c90"
                    width="750"
                    class="img-fluid"
                    alt="Sample image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>