<script>
export default {}
</script>

<template>
  <section class="vh-100" style="background-color: rgb(243, 212, 54)">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 80px">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <h1 class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign Up</h1>

                  <form class="mx-1 mx-md-4" @submit.prevent="submitHandler">
                    <!-- DI ISI UNTUK GOOGLE -->

                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button class="btn btn-lg btn-primary rounded-pill w-100 p-2" type="submit">
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
                <div
                  class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                >
                  <img
                    src="https://img.freepik.com/free-vector/new-message-concept-landing-page_52683-24771.jpg?t=st=1677779693~exp=1677780293~hmac=f43cbf9ab3d2a773ba6364b1e01317709e0672df640af9cafb7a99588f67111d"
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