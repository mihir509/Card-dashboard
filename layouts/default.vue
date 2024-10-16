<script setup>

const isSidebarOpen = ref(true);

function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
}


</script>

<template>
    <div class="dashboard">
        <Sidebar :isOpen="isSidebarOpen" />
        <div class="right-content">
            <Navbar @toggle-sidebar="toggleSidebar" />
            <slot />
            <Footer />
        </div>
    </div>
</template>

<style scoped>
.dashboard {
    background-color: #eceff1;
    width: 100%;
    height: 100vh;
    display: flex;
}
.dashboard:has(.sidebar + .right-content) .right-content{
 width:calc(100% - 20%);
 height: 100%;
 background-color: rgb(236 239 241);
 margin-left: auto;
 transition: width .3s ease;
}
@media only screen and  (max-width:1024px){
    .right-content{
        width: 100% !important;
    }
}
</style>