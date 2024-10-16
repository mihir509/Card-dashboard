<script setup>
const emit = defineEmits(['toggle-sidebar'])
</script>

<template>
<nav class="flex justify-between items-center px-5 py-3 bg-white navbar">
    <div class="flex items-center">
        <!-- Sidebar Toggle Icon -->
        <Icon name="heroicons:bars-3-solid" class="text-info text-3xl mr-2 cursor-pointer sidebar-toggle" size="28" @click="emit('toggle-sidebar')"  />
        <span class="font-bold text-info text-2xl">Cards</span>
    </div>
    <div class="relative">
        <!-- User Icon with Dropdown -->
        <button class="border-0 bg-transparent focus:outline-none flex items-center">
            <Icon name="heroicons:user-circle" class="text-info text-3xl cursor-pointer" size="28"  />
        </button>
    </div>
</nav>

</template>

<style scoped>
.navbar {
  box-shadow: 2px 2px 2px 2px #ccc;
}

/* Ensure correct color styling */
.text-info {
  color: #6a94a5 !important;
}

button {
  outline: none;
}
@media only screen and  (max-width:1024px){
  .sidebar-toggle{
  position: absolute;
  right: 50px;
}
}

</style>
