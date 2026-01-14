<template>
  <div class="min-h-screen bg-grey flex items-center justify-center px-4">
    <div class="bg-white rounded-lg shadow-sm p-10 max-w-md w-full text-center">
      <div class="flex flex-col items-center mb-6">
        <img
          src="../assets/logos/mainlogo.png"
          alt="Logo"
          class="w-14 h-14 object-contain mb-3"
        />
        <h1 class="text-2xl font-AsapCondensedBold text-black">StockDesk</h1>
      </div>

      <h2 class="text-6xl font-AsapCondensedBold text-black mb-2">404</h2>
      <p class="text-black opacity-60 font-AsapCondensedRegular mb-8">
        Sorry, the page you are looking for does not exist.
      </p>

      <button
        @click="$router.push('/')"
        class="w-full bg-black text-white py-3 rounded-lg font-AsapCondensedSemiBold hover:bg-gray-800 transition"
      >
        Go to Dashboard
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
