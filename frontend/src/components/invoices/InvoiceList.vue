<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-AsapCondensedBold text-gray-900">Invoices</h1>
      <button
        @click="$emit('create')"
        class="bg-gradient-to-r from-green to-blue text-white px-8 py-3.5 rounded-xl font-AsapCondensedBold hover:shadow-lg transform hover:scale-[1.02] transition-all"
      >
        New Invoice
      </button>
    </div>

    <div
      v-if="invoices.length"
      class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
    >
      <div
        class="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4 border-b border-gray-200"
      >
        <div class="grid grid-cols-6 gap-4">
          <div
            class="font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide"
          >
            Invoice #
          </div>
          <div
            class="font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide"
          >
            Customer
          </div>
          <div
            class="font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide"
          >
            Date
          </div>
          <div
            class="font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide"
          >
            Discount
          </div>
          <div
            class="font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide text-right"
          >
            Total
          </div>
          <div></div>
        </div>
      </div>

      <div class="divide-y divide-gray-100">
        <div
          v-for="(invoice, index) in invoices"
          :key="invoice._id"
          class="px-8 py-5 hover:bg-gray-50 transition-colors"
        >
          <div class="grid grid-cols-6 gap-4 items-center">
            <div class="font-AsapCondensedBold text-gray-900 text-lg">
              #{{ invoices.length - index }}
            </div>

            <div class="font-AsapCondensedRegular text-gray-700">
              {{ invoice.customerId?.name || "Unknown" }}
            </div>

            <div class="font-AsapCondensedRegular text-gray-700">
              {{ new Date(invoice.createdAt).toLocaleDateString() }}
            </div>

            <div class="font-AsapCondensedRegular text-gray-700">
              {{ invoice.discount }}%
            </div>

            <div
              class="font-AsapCondensedBold text-gray-900 text-lg text-right"
            >
              ${{ invoice.total.toFixed(2) }}
            </div>

            <div class="text-right">
              <button
                @click="$emit('view', invoice)"
                class="px-5 py-2 bg-gray-900 text-white rounded-lg font-AsapCondensedSemiBold hover:bg-gray-800 transition-all"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="bg-white rounded-2xl shadow-lg p-16 text-center border border-gray-200"
    >
      <div class="text-gray-400 font-AsapCondensedRegular text-lg">
        No invoices yet. Create your first invoice!
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "InvoiceList",

  props: {
    invoices: Array,
  },
};
</script>
  