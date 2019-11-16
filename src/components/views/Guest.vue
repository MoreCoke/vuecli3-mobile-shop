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
import Navbar from "../Navbar";
import Alert from "../AlertMessage";
import Footer from "../Footer";
export default {
  components: {
    Navbar,
    Alert,
    Footer
  }
};
</script>