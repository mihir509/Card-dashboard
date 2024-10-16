<script setup>
    import { useStore } from 'vuex'


    const store = useStore();
    const isModalOpen = ref(false);
    const showNumber = ref(false);
    const lock = ref(false);
    const archive = ref(false);
    const gpay = ref(false);
    const defaultstate = ref(false);
    const activeIndex = ref(0);
    const debitActiveIndex = ref(0);
    const  isLockActive = ref(false);
    const  isdefaultkActive = ref(false);
    const  isgpayActive = ref(false);
    const  isarchiveActive = ref(false);
    const isdbtLockActive = ref(false);
    const isdbtdefaultActive = ref(false);
    const isdbtArchiveActive = ref(false);
    const isdbtgpayActive = ref(false);
    import { useToast } from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-sugar.css';

    const toast = useToast()

    onMounted(() => {
        store.state.cardList
    })

    const cardlist = computed(() => {
        if (store) {
            return store.state?.cardList
        }
    })

    const creditCardList = computed(() => store.state?.cardList.filter(card => card.cardType === 'Credit Card'));
    const debitCardList = computed(() => store.state?.cardList.filter(card => card.cardType === 'Debit Card'));

    const activeCard = computed(() => creditCardList.value[activeIndex.value]);
    const debactiveCard = computed(() => debitCardList.value[debitActiveIndex.value]);


    const onSlideChange = (swiper) => {
        activeIndex.value = swiper.activeIndex; // Update the active index
    };

    const onSlideChangeDebit = (swiper) => {
        debitActiveIndex.value = swiper.debitActiveIndex
    }

    const lockData = (card) => {
        const cardToUpdate = creditCardList.value.find(c => c.name === card.name);
        cardToUpdate.isLocked = !cardToUpdate.isLocked
        cardToUpdate.isDefault = false
        cardToUpdate.isGpay = false
        cardToUpdate.isArchived = false
        store.dispatch('updateCard', cardToUpdate)
        toast.success('Lock your card successfully!')
        isLockActive.value = ! isLockActive.value
        isarchiveActive.value = false,
        isdefaultkActive.value = false,
        isgpayActive.value = false
    }

    const archiveData = (card) => {
        const cardToUpdate = creditCardList.value.find(c => c.name === card.name);
        cardToUpdate.isArchived = !cardToUpdate.isArchived
        cardToUpdate.isLocked = false
        cardToUpdate.isDefault = false
        cardToUpdate.isGpay = false
        store.dispatch('updateCard', cardToUpdate)
        toast.success('Archive your card successfully'),
        isarchiveActive.value =  !isarchiveActive.value,
        isLockActive.value = false,
        isdefaultkActive.value = false,
        isgpayActive.value = false
    }

    const defaultstateData = (card) => {
        const cardToUpdate = creditCardList.value.find(c => c.name === card.name);
        cardToUpdate.isDefault = !cardToUpdate.isDefault
        cardToUpdate.isArchived = false
        cardToUpdate.isLocked = false
        cardToUpdate.isGpay = false
        store.dispatch('updateCard', cardToUpdate)
        toast.success('Default your card successfully'),
        isdefaultkActive.value = !isdefaultkActive.value,
        isLockActive.value = false,
        isarchiveActive.value = false,
        isgpayActive.value = false
    }

    const gpayData = (card) => {
        const cardToUpdate = creditCardList.value.find(c => c.name === card.name);
        cardToUpdate.isGpay = !cardToUpdate.isGpay
        cardToUpdate.isDefault = false
        cardToUpdate.isArchived = false
        cardToUpdate.isLocked = false
        store.dispatch('updateCard', cardToUpdate)
        toast.success('Gpay add to your card successfully'),
        isgpayActive.value = !isgpayActive.value,
        isLockActive.value = false,
        isarchiveActive.value = false,
        isdefaultkActive.value = false
    }



    const deblockData = (debcard) => {
       
        const cardToUpdate = debitCardList.value.find(c => c.name === debcard.name);
        cardToUpdate.isLocked = !cardToUpdate.isLocked
        cardToUpdate.isDefault = false
        cardToUpdate.isGpay = false
        cardToUpdate.isArchived = false
        store.dispatch('updateCard', cardToUpdate)
        toast.success('Lock your card successfully')
        store.dispatch('getCardList');
        isdbtLockActive.value = ! isdbtLockActive.value
        isdbtdefaultActive.value = false,
        isdbtArchiveActive.value = false,
        isdbtgpayActive.value = false
        
    }

    const debarchiveData = (debcard) => {
        console.error(debcard)
        const cardToUpdate = debitCardList.value.find(c => c.name === debcard.name);
        cardToUpdate.isArchived = !archive.isArchived
        cardToUpdate.isDefault = false
        cardToUpdate.isGpay = false
        cardToUpdate.isLocked = false
        store.dispatch('updateCard', cardToUpdate)
        toast.success('Archive your card successfully');
        isdbtArchiveActive.value = !isdbtArchiveActive.value,
        isdbtLockActive.value = false,
        isdbtdefaultActive.value = false,
        isdbtgpayActive.value = false
    }

    const debgpayData = (debcard) => {
        const cardToUpdate = debitCardList.value.find(c => c.name === debcard.name);

        cardToUpdate.isGpay = !cardToUpdate.isGpay
        cardToUpdate.isDefault = false
        cardToUpdate.isArchived = false
        cardToUpdate.isLocked = false
        store.dispatch('updateCard', cardToUpdate)
        toast.success('Gpay add to your card successfully')
        isdbtgpayActive.value = !isdbtgpayActive.value,
        isdbtArchiveActive.value = false,
        isdbtLockActive.value = false,
        isdbtdefaultActive.value = false
    }

    const debdefaultstateData = (debcard) => {
        const cardToUpdate = debitCardList.value.find(c => c.name === debcard.name);
        cardToUpdate.isDefault = !cardToUpdate.isDefault
        cardToUpdate.isGpay = false
        cardToUpdate.isArchived = false
        cardToUpdate.isLocked = false
        store.dispatch('updateCard', cardToUpdate)
        toast.success('Default your card successfully')
        isdbtdefaultActive.value = !isdbtdefaultActive.value,
        isdbtgpayActive.value = false,
        isdbtArchiveActive.value = false,
        isdbtLockActive.value = false
    }

    const toggleShowDebitNumber = (debcard) => {
        const cardToUpdate = debitCardList.value.find(c => c.name === debcard.name);
        if (cardToUpdate) {
            cardToUpdate.showNumber = !cardToUpdate.showNumber; // Toggle show number
        }
    }

    const toggleShowCreditNumber = (card) => {
        const cardToUpdate = creditCardList.value.find(c => c.name === card.name);
        if (cardToUpdate) {
            cardToUpdate.showNumber = !cardToUpdate.showNumber; // Toggle show number
        }

    }

    const openAddCard = () => {
        isModalOpen.value = true
    }

    const closeModal = () => {
        isModalOpen.value = false
    }
</script>

<template>
    <div class="mainbody">
        <nav class="mb-2 text-sm px-5 pt-5">
            <ol class="list-reset flex text-gray-600 space-x-2">
                <li><a href="#" class="hover:text-blue-500">Home</a></li>
                <li>></li>
                <li>Cards</li>
            </ol>
        </nav>
        <div class="px-5 py-4 min-h-screen">
            <div class="w-100 mb-6">
                <div class="card bg-white border-2 border-gray-300 rounded-none shadow-none">
                    <div class="card-head lg:px-8 px-4 border-b border-gray-300 flex justify-between items-center">
                        <ul class="flex space-x-5 ">
                            <li><button class="border-b-2 border-b-sky-400 py-3 text-[#4bb8e4]">Saved Cards</button>
                            </li>
                            <li><button class="text-[#8f9faa] py-3">CD Cards</button></li>
                        </ul>
                        <button class="bg-[#0fa1db] text-sm text-white py-1.5 px-3 fs-5 flex items-center"
                            @click="openAddCard">
                            <Icon name="heroicons:plus" class="me-1" size="16" /> <span>Add Card</span>
                        </button>
                    </div>

                    <div class="card-body lg:px-8 px-4 py-5">
                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <!-- Left Sidebar -->
                            <div class="col-span-8 lg:col-span-4  py-4 ">

                                <div class="bg-slate-100 py-4 px-5 flex items-center justify-between mb-4">
                                    <h3 class="font-semibold flex items-center text-[#4bb8e4]">
                                        <Icon name="heroicons:squares-2x2" class="me-2" size="18" />
                                        Card Details
                                    </h3>
                                    <Icon name="heroicons:chevron-down" class="me-2" size="18" />
                                </div>

                                <div class="bg-slate-100 py-4 px-5 flex items-center justify-between ">
                                    <h3 class="font-semibold flex items-center text-[#4bb8e4]">
                                        <Icon name="heroicons:squares-2x2" class="me-2" size="18" />
                                        Todays Transactions
                                    </h3>
                                    <Icon name="heroicons:chevron-down" class="me-2" size="18" />
                                </div>
                                <div class="bg-white border-2 border-t-0 border-gray-300 px-4">
                                    <ul class="space-y-4">
                                        <li class="flex justify-between items-start py-3 border-b-2 border-sky-200">
                                            <div class="flex justify-start items-start ">
                                                <div
                                                    class="w-[30px] h-[30px] mt-1 me-3 bg-[#c2e2ee] flex justify-center p-1 items-center rounded-full">
                                                    <Icon name="heroicons:arrow-down-tray" class="text-[#0fa1db]"
                                                        size="18" />
                                                </div>
                                                <div>
                                                    <p class="font-semibold text-sm">Ordered Food</p>
                                                    <p class="text-xs text-gray-500 mb-1">20th May 2022</p>
                                                    <p class="text-[#4bb8e4] text-xs">Charges applies on Credit card</p>
                                                </div>
                                            </div>
                                            <span class="text-red-500 text-xs">- $150.50</span>
                                        </li>
                                        <li class="flex justify-between items-start py-3 border-b-2 border-sky-200">
                                            <div class="flex justify-start items-start ">
                                                <div
                                                    class="w-[30px] h-[30px] mt-1 me-3 bg-[#c2e2ee] flex justify-center p-1 items-center rounded-full">
                                                    <Icon name="heroicons:arrow-down-tray" class="text-[#0fa1db]"
                                                        size="18" />
                                                </div>
                                                <div>
                                                    <p class="font-semibold text-sm">Ordered Food</p>
                                                    <p class="text-xs text-gray-500 mb-1">20th May 2022</p>
                                                    <p class="text-[#4bb8e4] text-xs">Charges applies on Credit card</p>
                                                </div>
                                            </div>
                                            <span class="text-green-500 text-xs">- $150.50</span>
                                        </li>
                                        <li class="flex justify-between items-start py-3 border-b-2 border-sky-200">
                                            <div class="flex justify-start items-start ">
                                                <div
                                                    class="w-[30px] h-[30px] mt-1 me-3 bg-[#c2e2ee] flex justify-center p-1 items-center rounded-full">
                                                    <Icon name="heroicons:arrow-down-tray" class="text-[#0fa1db]"
                                                        size="18" />
                                                </div>
                                                <div>
                                                    <p class="font-semibold text-sm">Ordered Food</p>
                                                    <p class="text-xs text-gray-500 mb-1">20th May 2022</p>
                                                    <p class="text-[#4bb8e4] text-xs">Charges applies on Credit card</p>
                                                </div>
                                            </div>
                                            <span class="text-red-500 text-xs">- $150.50</span>
                                        </li>
                                        <li class="flex justify-between items-start py-3 border-b-2 border-sky-200">
                                            <div class="flex justify-start items-start ">
                                                <div
                                                    class="w-[30px] h-[30px] mt-1 me-3 bg-[#c2e2ee] flex justify-center p-1 items-center rounded-full">
                                                    <Icon name="heroicons:arrow-down-tray" class="text-[#0fa1db]"
                                                        size="18" />
                                                </div>
                                                <div>
                                                    <p class="font-semibold text-sm">Ordered Food</p>
                                                    <p class="text-xs text-gray-500 mb-1">20th May 2022</p>
                                                    <p class="text-[#4bb8e4] text-xs">Charges applies on Credit card</p>
                                                </div>
                                            </div>
                                            <span class="text-green-500 text-xs">- $150.50</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Right Content -->
                            <div class="col-span-8 lg:col-span-8 space-y-6 py-5" v-if="cardlist">
                                <!-- Credit Card Section -->
                                <div class="" v-if="creditCardList">
                                    <div class="flex justify-between items-center">
                                        <h3 class="text-xl font-semibold text-[#4bb8e4] card-heading relative">Credit
                                            Card</h3>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mt-4">
                                        <div class="col-span-10 lg:col-span-7">
                                            <button
                                                class="bg-[#d1edf8] ms-auto mb-3 px-2 py-1 text-cyan-700 text-xs flex items-center"
                                                @click="toggleShowCreditNumber(activeCard)">
                                                <Icon name="heroicons:eye" class="me-1" size="14" /> Show Card Number
                                            </button>
                                            <Swiper :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperPagination]"
                                                :slides-per-view="1" :loop="true" :pagination="{
                                                clickable: true,
                                                dynamicBullets: true
                                                }" :effect="'creative'" @slideChange="onSlideChange">
                                                <SwiperSlide v-for="(activeCard) in creditCardList" :key="activeCard">
                                                    <div class="text-white p-6 rounded-md"
                                                        :class="{ 'bg-[#0FA1DB]': activeCard.isDefault || activeCard.isGpay, 'bg-[#0C3F62]': !activeCard.isDefault && !activeCard.isLocked && !activeCard.isArchived, 'bg-[#6A94A5]': activeCard.isLocked || activeCard.isArchived }">
                                                        <div class="">
                                                            <div class="flex  justify-between items-center mb-4">
                                                                <ul class="flex">
                                                                    <li class="opacity-0 pointer-events-none w-[1px]">
                                                                        <Icon name="heroicons:lock-closed" class="me-1"
                                                                            size="18" />
                                                                    </li>
                                                                    <li v-if="activeCard.isLocked" class="lock">
                                                                        <Icon name="heroicons:lock-closed" class="me-1"
                                                                            size="18" />
                                                                    </li>
                                                                    <li v-if="activeCard.isArchived" class="archive">
                                                                        <Icon name="heroicons:credit-card" class="me-1"
                                                                            size="18" />
                                                                    </li>
                                                                    <li v-if="activeCard.isDefault" class="default">
                                                                        <Icon name="heroicons:check" class="me-1"
                                                                            size="18" />
                                                                    </li>
                                                                    <li v-if="activeCard.isGpay" class="gpay"><img
                                                                            src="/assets/g-pay.png" alt=""
                                                                            class="w-[60%]"> </li>
                                                                </ul>
                                                                <img src="/assets/hdfc.png" alt="Bank logo">
                                                            </div>
                                                            <div class>
                                                                <h4 class="text-xl font-semibold mb-2">{{
                                                                    activeCard.name }}
                                                                </h4>
                                                                <div class="text-xl">
                                                                    <span class="spacing"
                                                                        v-if="activeCard.showNumber">{{
                                                                        activeCard.cardNumber }}</span>
                                                                    <span v-else>• • • • &nbsp; • • • • &nbsp; • • • •
                                                                        &nbsp;
                                                                        {{ activeCard.cardNumber.slice(-4) }}</span>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div class="mt-4 flex justify-between items-center">
                                                            <div class="text-sm"><strong>Valid Till : </strong>{{
                                                                activeCard.validTill }}</div>
                                                            <div class="text-sm"><strong>CVV : </strong> • • •</div>
                                                            <div class="mb-4"><img src="/assets/mastercard.png" alt="">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            </Swiper>
                                        </div>
                                        <div class="col-span-10 lg:col-span-5">
                                            <button
                                                class="bg-[#d1edf8] ms-auto mb-3 px-2 py-1 pointer-events-none text-cyan-700 text-xs flex items-center opacity-0 hidden-btn">
                                                <Icon name="heroicons:eye" class="me-1" size="14" /> Show Card Number
                                            </button>
                                            <div
                                                class="flex cards-btn flex-wrap justify-center items-center bg-[#c2e2ee] p-7 rounded-lg gap-y-8 gap-x-6">
                                                <button
                                                    class="text-cyan-700 text-sm  xt-center flex flex-col items-center justify-center flex-auto" :class='{"active":isLockActive}'
                                                    @click="lockData(activeCard)">
                                                    <div
                                                        class="w-[40px] h-[40px] text-white mt-1 me-3 bg-sky-400 flex justify-center p-1 items-center rounded-full">
                                                        <Icon name="heroicons:lock-closed" class="" size="18" />
                                                    </div>
                                                    Lock Card
                                                </button>
                                                <button
                                                    class="text-cyan-700 text-sm text-center flex flex-col items-center justify-center flex-auto" :class='{"active":isarchiveActive}'
                                                    @click="archiveData(activeCard)">
                                                    <div
                                                        class="w-[40px] h-[40px] text-white mt-1 me-3 bg-sky-400 flex justify-center p-1 items-center rounded-full">
                                                        <Icon name="heroicons:credit-card" class="" size="18" />
                                                    </div>
                                                    Archive
                                                </button>
                                                <button
                                                    class="text-cyan-700 text-sm text-center flex flex-col items-center justify-center flex-auto" :class='{"active":isdefaultkActive}'
                                                    @click="defaultstateData(activeCard)">
                                                    <div
                                                        class="w-[40px] h-[40px] text-white mt-1 me-3 bg-sky-400 flex justify-center p-1 items-center rounded-full">
                                                        <Icon name="heroicons:check" class="" size="18" />
                                                    </div>
                                                    Set As Default
                                                </button>
                                                <button
                                                    class="text-cyan-700 text-sm text-center flex flex-col items-center justify-center flex-auto" :class='{"active":isgpayActive}'
                                                    @click="gpayData(activeCard)">
                                                    <div
                                                        class="w-[40px] h-[40px] text-white mt-1 me-3  flex justify-center p-1 items-center rounded-full">
                                                        <img src="/assets/main-gpay.png" class="rounded-full"
                                                            alt="gpay">
                                                    </div>
                                                    Add to GPay
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div class="" v-if="debitCardList">
                                    <div class="flex justify-between items-center">
                                        <h3 class="text-xl font-semibold text-[#4bb8e4] card-heading relative">Debit
                                            Card</h3>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-12 lg:gap-8 gap-2 mt-4">
                                        <div class="col-span-10 lg:col-span-7">
                                            <button
                                                class="bg-[#d1edf8] ms-auto mb-3 px-2 py-1 text-cyan-700 text-xs flex items-center"
                                                @click="toggleShowDebitNumber(debactiveCard)">
                                                <Icon name="heroicons:eye" class="me-1" size="14" /> Show Card Number
                                            </button>
                                            <Swiper :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperPagination]"
                                                :slides-per-view="1" :loop="true" :effect="'creative'" 
                                                :pagination="{
                                                clickable: true,
                                                dynamicBullets: true
                                                }"
                                                 @slideChange="onSlideChangeDebit">
                                                <SwiperSlide v-for="(debactiveCard) in debitCardList"
                                                    :key="debactiveCard">
                                                    <div class="text-white p-6 rounded-md"
                                                        :class="{ 'bg-[#0FA1DB]': debactiveCard.isDefault || debactiveCard.isGpay, 'bg-[#0C3F62]': !debactiveCard.isDefault && !debactiveCard.isLocked && !debactiveCard.isArchived, 'bg-[#6A94A5]': debactiveCard.isLocked || debactiveCard.isArchived }">
                                                        <div class="">
                                                            <div class="flex  justify-between items-center mb-4">
                                                                <ul class="flex">
                                                                    <li v-if="debactiveCard.isLocked" class="lock">
                                                                        <Icon name="heroicons:lock-closed" class="me-1"
                                                                            size="18" />
                                                                    </li>
                                                                    <li v-if="debactiveCard.isArchived" class="archive">
                                                                        <Icon name="heroicons:credit-card" class="me-1"
                                                                            size="18" />
                                                                    </li>
                                                                    <li v-if="debactiveCard.isDefault" class="default">
                                                                        <Icon name="heroicons:check" class="me-1"
                                                                            size="18" />
                                                                    </li>
                                                                    <li v-if="debactiveCard.isGpay" class="gpay"><img
                                                                            src="/assets/g-pay.png" alt=""> </li>
                                                                </ul>
                                                                <img src="/assets/hdfc.png" alt="Bank logo">
                                                            </div>
                                                            <div class>
                                                                <h4 class="text-xl font-semibold mb-2">{{
                                                                    debactiveCard.name }}
                                                                </h4>
                                                                <div class="text-xl">
                                                                    <span class="spacing"
                                                                        v-if="debactiveCard.showNumber">{{
                                                                        debactiveCard.cardNumber }}</span>
                                                                    <span v-else>• • • • &nbsp; • • • • &nbsp; • • • •
                                                                        &nbsp;
                                                                        {{ debactiveCard.cardNumber.slice(-4) }}</span>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div class="mt-4 flex justify-between items-center">
                                                            <div class="text-sm"><strong>Valid Till : </strong>{{
                                                                debactiveCard.validTill }}</div>
                                                            <div class="text-sm"><strong>CVV : </strong> • • •</div>
                                                            <div class="mb-4"><img src="/assets/mastercard.png" alt="">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            </Swiper>
                                        </div>
                                        <div class="col-span-10 lg:col-span-5 ">
                                            <button
                                                class="bg-slate-200 ms-auto mb-3 px-2 py-1 pointer-events-none text-cyan-700 text-xs flex items-center opacity-0 hidden-btn">
                                                <Icon name="heroicons:eye" class="me-1" size="14" /> Show Card Number
                                            </button>
                                            <div
                                                class="flex flex-wrap justify-center items-center bg-[#c2e2ee] p-7 rounded-lg gap-y-8 gap-x-6 cards-btn">
                                                <button
                                                    class="text-cyan-700 text-sm  xt-center flex flex-col items-center justify-center flex-auto" :class='{"active":isdbtLockActive}'
                                                    @click="deblockData(debactiveCard)">
                                                    <div
                                                        class="w-[40px] h-[40px] text-white mt-1 me-3 bg-sky-400 flex justify-center p-1 items-center rounded-full">
                                                        <Icon name="heroicons:lock-closed" class="" size="18" />
                                                    </div>
                                                    Lock Card
                                                </button>
                                                <button
                                                    class="text-cyan-700 text-sm text-center flex flex-col items-center justify-center flex-auto" :class='{"active":isdbtArchiveActive}'
                                                    @click="debarchiveData(debactiveCard)">
                                                    <div
                                                        class="w-[40px] h-[40px] text-white mt-1 me-3 bg-sky-400 flex justify-center p-1 items-center rounded-full">
                                                        <Icon name="heroicons:credit-card" class="" size="18" />
                                                    </div>
                                                    Archive
                                                </button>
                                                <button
                                                    class="text-cyan-700 text-sm text-center flex flex-col items-center justify-center flex-auto" :class='{"active":isdbtdefaultActive}'
                                                    @click="debdefaultstateData(debactiveCard)">
                                                    <div
                                                        class="w-[40px] h-[40px] text-white mt-1 me-3 bg-sky-400 flex justify-center p-1 items-center rounded-full">
                                                        <Icon name="heroicons:check" class="" size="18" />
                                                    </div>
                                                    Set As Default
                                                </button>
                                                <button
                                                    class="text-cyan-700 text-sm text-center flex flex-col items-center justify-center flex-auto" :class='{"active":isdbtgpayActive}'
                                                    @click="debgpayData(debactiveCard)">
                                                    <div
                                                        class="w-[40px] h-[40px] text-white mt-1 me-3  flex justify-center p-1 items-center rounded-full">
                                                        <img src="/assets/main-gpay.png" alt="gpay"
                                                            class="rounded-full">
                                                    </div>
                                                    Add to GPay
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <!-- Add Card Modal -->
            <CardAdd v-if="isModalOpen" @close="closeModal" />
        </div>
    </div>

</template>

<style scoped>
    .mainbody {
        background-color: #eceff1;
        ;
    }

    .spacing {
        letter-spacing: 2px;
    }

    .card-heading:before {
        content: "";
        width: 75%;
        height: 2px;
        position: absolute;
        left: 0;
        background: #4bb8e4;
        bottom: -5px;
    }

    .cards-btn button.active div{
        background-color: #0c3f62;
    }
    @media only screen and (max-width:1024px) {
        .hidden-btn {
            display: none;
        }
    }




    /* Additional styles or overrides can be added here if needed */
</style>