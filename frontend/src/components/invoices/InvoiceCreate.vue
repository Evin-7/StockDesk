<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <button
        @click="$emit('back')"
        class="p-2 hover:bg-gray-100 rounded-lg transition-all"
      >
        ← Back
      </button>
      <h1 class="text-4xl font-AsapCondensedBold text-gray-900">
        Create Invoice
      </h1>
    </div>

    <div
      class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 space-y-6"
    >
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-AsapCondensedBold text-gray-700 mb-2"
            >Customer</label
          >
          <select
            v-model="form.customerId"
            @change="updateDiscount"
            class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl font-AsapCondensedRegular focus:outline-none focus:border-green transition-all"
          >
            <option value="">Select customer</option>
            <option v-for="c in customers" :key="c._id" :value="c._id">
              {{ c.name }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-AsapCondensedBold text-gray-700 mb-2"
            >Date</label
          >
          <input
            v-model="date"
            type="date"
            class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl font-AsapCondensedRegular focus:outline-none focus:border-green transition-all"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-AsapCondensedBold text-gray-700 mb-3"
          >Items</label
        >

        <div class="bg-gray-50 rounded-xl p-4 space-y-3">
          <div
            class="grid grid-cols-12 gap-3 text-sm font-AsapCondensedBold text-gray-600 px-2"
          >
            <div class="col-span-5">Item</div>
            <div class="col-span-2 text-center">Qty</div>
            <div class="col-span-2 text-right">Price</div>
            <div class="col-span-2 text-right">Total</div>
            <div class="col-span-1"></div>
          </div>

          <div
            v-for="(line, index) in form.items"
            :key="index"
            class="grid grid-cols-12 gap-3 items-center bg-white p-3 rounded-lg"
          >
            <div class="col-span-5">
              <select
                v-model="line.itemId"
                class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg font-AsapCondensedRegular focus:outline-none focus:border-green"
              >
                <option value="">Select item</option>
                <option v-for="i in items" :key="i._id" :value="i._id">
                  {{ i.name }}
                </option>
              </select>
            </div>

            <div class="col-span-2">
              <input
                v-model.number="line.quantity"
                type="number"
                min="1"
                class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg font-AsapCondensedRegular text-center focus:outline-none focus:border-green"
              />
            </div>

            <div
              class="col-span-2 text-right font-AsapCondensedRegular text-gray-700"
            >
              ${{ getItemPrice(line.itemId).toFixed(2) }}
            </div>

            <div
              class="col-span-2 text-right font-AsapCondensedBold text-gray-900"
            >
              ${{ getLineTotal(line).toFixed(2) }}
            </div>

            <div class="col-span-1 text-center">
              <button
                v-if="form.items.length > 1"
                @click="form.items.splice(index, 1)"
                class="text-pink hover:opacity-70 font-AsapCondensedBold text-xl"
              >
                ✕
              </button>
            </div>
          </div>

          <!-- Add Row -->
          <button
            @click="form.items.push({ itemId: '', quantity: 1 })"
            class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-green font-AsapCondensedBold hover:border-green hover:bg-green hover:bg-opacity-5 transition-all"
          >
            + Add row
          </button>
        </div>
      </div>

      <div
        class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 space-y-4 border-2 border-gray-200"
      >
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
            >Discount (%)</span
          >
          <input
            v-model.number="discount"
            type="number"
            min="0"
            max="100"
            class="w-28 px-4 py-2 border-2 border-gray-200 rounded-lg font-AsapCondensedBold text-right focus:outline-none focus:border-green"
          />
        </div>

        <div
          class="border-t-2 border-gray-300 pt-4 flex justify-between items-center"
        >
          <span class="font-AsapCondensedBold text-gray-900 text-2xl"
            >Grand Total</span
          >
          <span class="font-AsapCondensedBold text-green text-3xl"
            >${{ total.toFixed(2) }}</span
          >
        </div>
      </div>

      <div class="flex gap-3 pt-4">
        <button
          @click="submit"
          class="flex-1 bg-gradient-to-r from-green to-blue text-white py-4 rounded-xl font-AsapCondensedBold hover:shadow-lg transform hover:scale-[1.02] transition-all text-lg"
        >
          Save Invoice
        </button>

        <button
          @click="$emit('back')"
          class="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-AsapCondensedBold hover:bg-gray-300 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "InvoiceCreate",

  props: {
    customers: Array,
    items: Array,
  },

  emits: ["save", "back"],

  data() {
    return {
      form: { customerId: "", items: [{ itemId: "", quantity: 1 }] },
      discount: 0,
      date: new Date().toISOString().split("T")[0],
    };
  },

  computed: {
    subtotal() {
      return this.form.items.reduce(
        (sum, line) => sum + this.getLineTotal(line),
        0
      );
    },
    total() {
      return this.subtotal * (1 - this.discount / 100);
    },
  },

  methods: {
    getItemPrice(id) {
      const item = this.items.find((i) => i._id === id);
      return item ? item.price : 0;
    },

    getLineTotal(line) {
      return this.getItemPrice(line.itemId) * (line.quantity || 0);
    },

    updateDiscount() {
      const customer = this.customers.find(
        (c) => c._id === this.form.customerId
      );
      this.discount = customer ? customer.discount : 0;
    },

    submit() {
      const validItems = this.form.items.filter(
        (i) => i.itemId && i.quantity > 0
      );

      if (!this.form.customerId || !validItems.length) {
        alert("Select customer and items");
        return;
      }

      this.$emit("save", {
        customerId: this.form.customerId,
        items: validItems,
      });
    },
  },
};
</script>
  