<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const store = useStore()
const toast = useToast();
// Reactive state for form fields and errors
const state = reactive({
  name: '',
  bankName: '',
  cardType: '',
  cardNumber: '',
  validTill: '',
  cvv: '',
  isDefault: false,
  isGpay: false,
  isArchived: false,
  isLocked: false,
  showNumber: false,
  errors: {}
});

const existingDefaultCardType = 'Card';

const emit = defineEmits(['close']);
const closeModal = () => {
  emit('close');
};

const formatCardNumber = (value) => {
  const cleaned = value.replace(/\D/g, '');

  const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || '';

  return formatted;
};

const validateField = (field) => {
  switch (field) {
    case 'name':
      if (!state.name) {
        state.errors.name = 'Name is required';
      } else if (state.name.length > 35) {
        state.errors.name = 'Name must not exceed 35 characters';
      } else {
        delete state.errors.name;
      }
      break;
    case 'bankName':
      if (!state.bankName) {
        state.errors.bankName = 'Bank name is required';
      } else {
        delete state.errors.bankName;
      }
      break;
    case 'cardType':
      if (!state.cardType) {
        state.errors.cardType = 'Card type is required';
      } else {
        delete state.errors.cardType;
      }
      break;
    case 'cardNumber':
      const cardNumberRegex = /^\d{16}$/;
      if (!cardNumberRegex.test(state.cardNumber)) {
        state.errors.cardNumber = 'Card number must be 16 digits';
      } else {
        delete state.errors.cardNumber;
      }
      break;
    case 'validTill':
      const validTillRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!validTillRegex.test(state.validTill)) {
        state.errors.validTill = 'Valid Till must be in MM/YY format';
      } else {
        const [month, year] = state.validTill.split('/');
        const today = new Date();
        const expDate = new Date(`20${year}`, month - 1);
        if (expDate <= today) {
          state.errors.validTill = 'Expiration date must be in the future';
        } else {
          delete state.errors.validTill;
        }
      }
      break;
    case 'cvv':
      const cvvRegex = /^\d{3,4}$/;
      if (!cvvRegex.test(state.cvv)) {
        state.errors.cvv = 'CVV must be 3-4 digits';
      } else {
        delete state.errors.cvv;
      }
      break;
    case 'isDefault':
      if (state.isDefault && state.cardType === existingDefaultCardType) {
        state.errors.defaultCard = 'The selected card type already has a default card.';
      } else {
        delete state.errors.defaultCard;
      }
      break;
    default:
      break;
  }
};

// Form submission with validation
const saveCard = () => {
  validateField('name');
  validateField('bankName');
  validateField('cardType');
  validateField('cardNumber');
  validateField('validTill');
  validateField('cvv');
  validateField('isDefault');

  if (Object.keys(state.errors).length === 0) {
    state.cardNumber = formatCardNumber(state.cardNumber);
    console.error(state)
    store.dispatch('addCard', state)
    store.dispatch('getCardList');
    toast.success('Card add successfully')
    emit('close');

  } else {
    console.log('Form has errors, not submitting.', state.errors);
  }
};
</script>

<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
      <!-- Modal Header -->
      <div class="border-b p-4 flex justify-between items-center">
        <h5 class="text-lg font-semibold">New Card</h5>
        <button @click="closeModal" class="text-gray-600 hover:text-gray-900 focus:outline-none">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-4">
        <form @submit.prevent="saveCard">
          <!-- Name Field -->
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
            <input type="text" id="name" v-model="state.name" placeholder="i.e. James Carlon"
              @input="validateField('name')"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-500': state.errors.name }" />
            <p v-if="state.errors.name" class="text-red-500 text-sm mt-1">{{ state.errors.name }}</p>
          </div>

          <!-- Bank Name Field -->
          <div class="mb-4">
            <label for="bank_name" class="block text-sm font-medium text-gray-700">Bank Name:</label>
            <input type="text" id="bank_name" v-model="state.bankName" placeholder="i.e. HDFC BANK"
              @input="validateField('bankName')"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-500': state.errors.bankName }" />
            <p v-if="state.errors.bankName" class="text-red-500 text-sm mt-1">{{ state.errors.bankName }}</p>
          </div>

          <!-- Card Type Dropdown -->
          <div class="mb-4">
            <label for="cardtype" class="block text-sm font-medium text-gray-700">Card Type:</label>
            <select id="cardtype" v-model="state.cardType" @change="validateField('cardType')"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-500': state.errors.cardType }">
              <option value="" disabled>Select Card Type</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
            </select>
            <p v-if="state.errors.cardType" class="text-red-500 text-sm mt-1">{{ state.errors.cardType }}</p>
          </div>

          <!-- Card Number Field -->
          <div class="mb-4">
            <label for="cardNumber" class="block text-sm font-medium text-gray-700">Card Number:</label>
            <input type="text" id="cardNumber" v-model="state.cardNumber" placeholder="i.e. 7754 1542 6584 4875"
              @input="validateField('cardNumber')"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-500': state.errors.cardNumber }" />
            <p v-if="state.errors.cardNumber" class="text-red-500 text-sm mt-1">{{ state.errors.cardNumber }}</p>
          </div>

          <!-- Valid Till & CVV Fields -->
          <div class="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label for="validTill" class="block text-sm font-medium text-gray-700">Valid Till:</label>
              <input type="text" id="validTill" v-model="state.validTill" placeholder="MM/YY"
                @input="validateField('validTill')"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-500': state.errors.validTill }" />
              <p v-if="state.errors.validTill" class="text-red-500 text-sm mt-1">{{ state.errors.validTill }}</p>
            </div>
            <div>
              <label for="cvv" class="block text-sm font-medium text-gray-700">CVV:</label>
              <input type="password" id="cvv" v-model="state.cvv" placeholder="---" @input="validateField('cvv')"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-500': state.errors.cvv }" />
              <p v-if="state.errors.cvv" class="text-red-500 text-sm mt-1">{{ state.errors.cvv }}</p>
            </div>
          </div>

          <!-- Default Card Checkbox -->
          <div class="mb-4 flex items-center">
            <input type="checkbox" id="default" v-model="state.isDefault"
              class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              @change="validateField('isDefault')" />
            <label for="default" class="ml-2 block text-sm text-gray-900">Set this card as Default</label>
          </div>
          <p v-if="state.errors.defaultCard" class="text-red-500 text-sm mt-1">{{ state.errors.defaultCard }}</p>

          <!-- GPay Checkbox -->
          <div class="mb-4 flex items-center">
            <input type="checkbox" id="gpay" v-model="state.isGpay"
              class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
            <label for="gpay" class="ml-2 block text-sm text-gray-900">Add this card to Gpay?</label>
          </div>

          <!-- Save & Close Buttons -->
          <div class="flex justify-end mt-4">
            <button type="button" @click="closeModal"
              class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Close
            </button>
            <button type="submit" class="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional styling can go here */
</style>
