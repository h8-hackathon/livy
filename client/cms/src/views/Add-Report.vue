<script>
export default {}
</script>

<template>
  <section class="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="new-job-section" style="margin: auto">
    <div class="justify-content-between align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1
        class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
        style="margin: auto; text-align: center"
      >
        Form - Add Forum Report
      </h1>
    </div>
    <div class="row" style="margin: auto; width: 50%">
      <div class="">
        <form id="new-job-form" @submit.prevent="submitFormHandler">
          <div class="mb-3">
            <label for="product-name">Note <span class="text-danger fw-bold">*</span></label>
            <input type="text" class="form-control" autocomplete="off" required v-model="name" />
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
                @click.prevent="$router.push(`/forum`)"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>