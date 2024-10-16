<script setup>
const isActive = ref(true)
import { defineProps } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true,
  },
});

</script>

<template>
  <div v-if="isOpen" class="sidebar bg-[#0c3f62] w-1/5 h-screen p-8 relative text-white">
    <!-- Sidebar Brand -->
    <div class="flex items-center mb-6">
      <img src="/assets/gd-logo.png" alt="logo" class="w-16 h-16">
      <span class="ml-3 text-xl font-bold">GIRIRAJ DIGITAL</span>
    </div>
    <p class="text-center text-sm opacity-75 mb-6">Software & Web Development Company - Umbraco Gold Partner</p>

    <!-- Sidebar Menu -->
    <ul class="space-y-5 ps-0 py-5">
      <li class="border-b border-blue-100 border-opacity-15 pb-2 group">
        <a href="#" class="flex justify-between items-center text-decoration-none w-full text-white hover:text-blue-400">
            <div class="flex items-center">
                <Icon name="heroicons:home" class="me-2" size="18" />
                <span>Home</span>
            </div>
            <Icon name="heroicons:arrow-right" class="me-2" size="18" />
        </a>
      </li>
      <li class="border-b border-blue-100 border-opacity-15 pb-2 group">
        <a href="#" class="flex justify-between items-center text-decoration-none w-full text-white hover:text-blue-400" :class="{'text-blue-400': isActive}">
            <div class="flex items-center">
                <Icon name="heroicons:credit-card" class="me-2" size="18" />
                <span>Cards</span>
            </div>
            <Icon name="heroicons:arrow-right" class="me-2" size="18" />

        </a>
      </li>
      <li class="border-b border-blue-100 border-opacity-15 pb-2 group">
        <a href="#" class="flex justify-between items-center text-decoration-none w-full text-white hover:text-blue-400">
            <div class="flex items-center">
                <Icon name="heroicons:adjustments-horizontal" class="me-2" size="18" />
                <span>Transactions</span>
            </div>
          <Icon name="heroicons:arrow-right" class="me-2" size="18" />
        </a>
      </li>
      <li class="border-b border-blue-100 border-opacity-15 pb-2 group">
        <a href="#" class="flex justify-between items-center text-decoration-none w-full text-white hover:text-blue-400">
            <div class="flex items-center">
                <Icon name="heroicons:cog-8-tooth" class="me-2" size="18" />
                <span>Setting</span>
            </div>
          <Icon name="heroicons:arrow-right" class="me-2" size="18" />
        </a>
      </li>
    </ul>

    <!-- Sidebar Footer -->
    <div class="absolute bottom-5 left-0 w-full px-5">
      <a href="#" class="flex items-center text-decoration-none text-white hover:text-blue-400">
        <Icon name="heroicons:arrow-right-end-on-rectangle-solid" class="me-2" size="18" /> Logout
      </a>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
    position: fixed;
    left: 0;
    top: 0;
    transition: all 0.3s ease-in-out;
    z-index: 99;
}
.closeBtn {
  display: none;
}

@media only  screen and (max-width:1024px){
  .sidebar{
    width: 50%;
  }
  .closeBtn {
  display: block;
}
}

@media only  screen and (max-width:550px){
  .sidebar{
    width: 60%;
  }
}

</style>
