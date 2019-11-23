<template>
  <div>
    <Navbar />
    <div class="container-fluid customnav-pt">
      <div class="row">
        <Alert />
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/AdminSidebar";
import Navbar from "@/components/Navbar";
import Alert from "@/components/AlertMessage";

export default {
  components: {
    Sidebar,
    Navbar,
    Alert
  }
};
</script>
