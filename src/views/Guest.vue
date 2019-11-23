<template>
  <div class="vuebody">
    <div class="wrapper">
      <Navbar />
      <Alert />
      <main class="customnav-pt">
        <router-view></router-view>
      </main>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Alert from "@/components/AlertMessage";
import Footer from "@/components/Footer";

export default {
  components: {
    Navbar,
    Alert,
    Footer
  }
};
</script>
