<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <div class="flex items-center space-x-6">
          <img
            src="../../assets/logos/mainlogo.png"
            alt="Logo"
            class="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] object-contain"
          />

          <nav class="hidden md:flex space-x-6">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              @click="$emit('changeView', tab.key)"
              :class="
                activeView === tab.key
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500 border-b-2 border-transparent hover:text-black hover:border-gray-300'
              "
              class="pb-2 font-AsapCondensedSemiBold transition-all"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>

        <div class="flex items-center space-x-4">
          <div class="hidden sm:flex items-center space-x-2 text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span class="font-AsapCondensedSemiBold text-black text-lg">
              +91 7510255897
            </span>
          </div>

          <button
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            @click="isOpen = !isOpen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="isOpen" class="md:hidden pb-4">
        <nav class="flex flex-col space-y-4 mt-2">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="selectTab(tab.key)"
            :class="
              activeView === tab.key
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500 border-b-2 border-transparent hover:text-black hover:border-gray-300'
            "
            class="text-left pb-2 font-AsapCondensedSemiBold transition-all"
          >
            {{ tab.label }}
          </button>

          <div
            class="flex items-center space-x-2 pt-4 border-t border-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span class="font-AsapCondensedSemiBold text-black text-lg">
              +91 7510255897
            </span>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>
  
  <script>
export default {
  name: "AppHeader",

  props: {
    activeView: String,
  },

  data() {
    return {
      isOpen: false,
      tabs: [
        { key: "items", label: "Items" },
        { key: "customers", label: "Customers" },
        { key: "invoices", label: "Invoices" },
      ],
    };
  },

  methods: {
    selectTab(key) {
      this.$emit("changeView", key);
      this.isOpen = false;
    },
  },
};
</script>
  