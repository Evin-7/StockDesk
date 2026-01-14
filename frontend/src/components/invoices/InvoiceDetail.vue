<template>
  <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
    <div class="flex justify-between items-start mb-8">
      <div>
        <div
          class="text-sm font-AsapCondensedBold text-gray-500 uppercase tracking-wide mb-2"
        >
          Invoice
        </div>
        <h1 class="text-5xl font-AsapCondensedBold text-gray-900 mb-3">
          #{{ number }}
        </h1>
        <div class="font-AsapCondensedRegular text-gray-600 text-lg">
          Date: {{ new Date(invoice.createdAt).toLocaleDateString() }}
        </div>
      </div>

      <div class="flex gap-3">
        <button
          @click="$emit('back')"
          class="px-6 py-3 border-2 border-gray-300 rounded-xl font-AsapCondensedBold text-gray-700 hover:bg-gray-50 transition-all"
        >
          Back
        </button>

        <button
          @click="printInvoice"
          class="bg-gradient-to-r from-green to-blue text-white px-6 py-3 rounded-xl font-AsapCondensedBold hover:shadow-lg transition-all"
        >
          Print Invoice
        </button>
      </div>
    </div>

    <div
      class="bg-gradient-to-br from-blue from-opacity-5 to-green to-opacity-5 rounded-xl p-6 mb-8 border border-gray-200"
    >
      <div
        class="text-sm font-AsapCondensedBold text-gray-500 uppercase tracking-wide mb-2"
      >
        Bill To
      </div>
      <div class="font-AsapCondensedBold text-gray-900 text-2xl mb-2">
        {{ invoice.customerId?.name }}
      </div>
      <div class="font-AsapCondensedRegular text-gray-600">
        Discount: {{ invoice.discount }}%
      </div>
    </div>

    <div class="rounded-xl overflow-hidden border-2 border-gray-200 mb-8">
      <table class="w-full">
        <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            <th
              class="px-6 py-4 text-left font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide"
            >
              Item
            </th>
            <th
              class="px-6 py-4 text-center font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide"
            >
              Qty
            </th>
            <th
              class="px-6 py-4 text-right font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide"
            >
              Price
            </th>
            <th
              class="px-6 py-4 text-right font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide"
            >
              Line Total
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="(i, idx) in invoice.items"
            :key="idx"
            class="hover:bg-gray-50 transition-colors"
          >
            <td
              class="px-6 py-4 font-AsapCondensedRegular text-gray-900 text-lg"
            >
              {{ i.itemId?.name }}
            </td>
            <td
              class="px-6 py-4 text-center font-AsapCondensedRegular text-gray-700"
            >
              {{ i.quantity }}
            </td>
            <td
              class="px-6 py-4 text-right font-AsapCondensedRegular text-gray-700"
            >
              ${{ i.itemId?.price.toFixed(2) }}
            </td>
            <td
              class="px-6 py-4 text-right font-AsapCondensedBold text-gray-900 text-lg"
            >
              ${{ (i.itemId?.price * i.quantity).toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-end">
      <div
        class="w-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 space-y-4 border-2 border-gray-200"
      >
        <div
          class="text-sm font-AsapCondensedBold text-gray-500 uppercase tracking-wide mb-4"
        >
          Totals
        </div>

        <div class="flex justify-between items-center">
          <span class="font-AsapCondensedRegular text-gray-700 text-lg"
            >Subtotal</span
          >
          <span class="font-AsapCondensedBold text-gray-900 text-xl"
            >${{ subtotal.toFixed(2) }}</span
          >
        </div>

        <div class="flex justify-between items-center">
          <span class="font-AsapCondensedRegular text-gray-700 text-lg"
            >Discount</span
          >
          <span class="font-AsapCondensedBold text-gray-900 text-xl"
            >{{ invoice.discount }}%</span
          >
        </div>

        <div
          class="border-t-2 border-gray-300 pt-4 flex justify-between items-center"
        >
          <span class="font-AsapCondensedBold text-gray-900 text-2xl"
            >Total</span
          >
          <span class="font-AsapCondensedBold text-green text-3xl"
            >${{ invoice.total.toFixed(2) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "InvoiceDetail",

  props: {
    invoice: Object,
    number: Number,
  },
  methods: {
    printInvoice() {
      window.print();
    },
  },

  computed: {
    subtotal() {
      return this.invoice.items.reduce(
        (sum, i) => sum + i.itemId?.price * i.quantity,
        0
      );
    },
  },
};
</script>
  