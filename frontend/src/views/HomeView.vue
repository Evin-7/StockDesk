<template>
  <div class="min-h-screen bg-grey">
    <!-- Header -->
    <header class="bg-white border-b border-0.5">
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <div class="flex items-center space-x-12">
            <div class="flex items-center space-x-3">
              <img
                src="../assets/logos/mainlogo.png"
                alt="Logo"
                class="w-[80px] h-[80px] object-contain"
              />
            </div>
            <nav class="hidden md:flex space-x-8">
              <button
                @click="currentView = 'items'"
                :class="
                  currentView === 'items'
                    ? 'text-black font-AsapCondensedSemiBold'
                    : 'text-black opacity-60 font-AsapCondensedRegular'
                "
                class="hover:opacity-100 transition"
              >
                Items
              </button>
              <button
                @click="currentView = 'customers'"
                :class="
                  currentView === 'customers'
                    ? 'text-black font-AsapCondensedSemiBold'
                    : 'text-black opacity-60 font-AsapCondensedRegular'
                "
                class="hover:opacity-100 transition"
              >
                Customers
              </button>
              <button
                @click="currentView = 'invoices'"
                :class="
                  currentView === 'invoices'
                    ? 'text-black font-AsapCondensedSemiBold'
                    : 'text-black opacity-60 font-AsapCondensedRegular'
                "
                class="hover:opacity-100 transition"
              >
                Invoices
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Items View -->
      <div
        v-if="currentView === 'items'"
        class="bg-white rounded-lg shadow-sm p-8"
      >
        <h2 class="text-3xl font-AsapCondensedBold text-black mb-6">Items</h2>

        <!-- Add Item Form -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <input
            v-model="newItem.name"
            type="text"
            placeholder="Item Name"
            class="px-4 py-3 border border-gray-300 rounded-lg font-AsapCondensedRegular focus:outline-none focus:border-green"
          />
          <input
            v-model="newItem.price"
            type="number"
            placeholder="Price"
            class="px-4 py-3 border border-gray-300 rounded-lg font-AsapCondensedRegular focus:outline-none focus:border-green"
          />
        </div>
        <button
          @click="addItem"
          class="w-full bg-black text-white py-3 rounded-lg font-AsapCondensedSemiBold hover:bg-gray-800 transition mb-8"
        >
          Add Item
        </button>

        <!-- Items Table -->
        <div v-if="items.length > 0">
          <div class="grid grid-cols-2 gap-4 pb-3 border-b border-0.5 mb-3">
            <div
              class="font-AsapCondensedSemiBold text-black opacity-60 text-sm"
            >
              Item
            </div>
            <div
              class="font-AsapCondensedSemiBold text-black opacity-60 text-sm text-right"
            >
              Price
            </div>
          </div>
          <div
            v-for="item in items"
            :key="item.id"
            class="grid grid-cols-2 gap-4 py-4 border-b border-0.5 last:border-0"
          >
            <div class="font-AsapCondensedRegular text-black">
              {{ item.name }}
            </div>
            <div class="font-AsapCondensedRegular text-black text-right">
              ${{ item.price }}
            </div>
          </div>
        </div>
        <div
          v-else
          class="text-center py-8 text-black opacity-60 font-AsapCondensedRegular"
        >
          No items yet
        </div>
      </div>

      <!-- Customers View -->
      <div
        v-if="currentView === 'customers'"
        class="bg-white rounded-lg shadow-sm p-8"
      >
        <h2 class="text-3xl font-AsapCondensedBold text-black mb-6">
          Customers
        </h2>

        <!-- Add Customer Form -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <input
            v-model="newCustomer.name"
            type="text"
            placeholder="Customer Name"
            class="px-4 py-3 border border-gray-300 rounded-lg font-AsapCondensedRegular focus:outline-none focus:border-green"
          />
          <input
            v-model="newCustomer.discount"
            type="number"
            placeholder="Discount %"
            class="px-4 py-3 border border-gray-300 rounded-lg font-AsapCondensedRegular focus:outline-none focus:border-green"
          />
        </div>
        <button
          @click="addCustomer"
          class="w-full bg-black text-white py-3 rounded-lg font-AsapCondensedSemiBold hover:bg-gray-800 transition mb-8"
        >
          Add Customer
        </button>

        <!-- Customers Table -->
        <div v-if="customers.length > 0">
          <div class="grid grid-cols-2 gap-4 pb-3 border-b border-0.5 mb-3">
            <div
              class="font-AsapCondensedSemiBold text-black opacity-60 text-sm"
            >
              Customer
            </div>
            <div
              class="font-AsapCondensedSemiBold text-black opacity-60 text-sm text-right"
            >
              Discount
            </div>
          </div>
          <div
            v-for="customer in customers"
            :key="customer.id"
            class="grid grid-cols-2 gap-4 py-4 border-b border-0.5 last:border-0"
          >
            <div class="font-AsapCondensedRegular text-black">
              {{ customer.name }}
            </div>
            <div class="font-AsapCondensedRegular text-black text-right">
              {{ customer.discount }}%
            </div>
          </div>
        </div>
        <div
          v-else
          class="text-center py-8 text-black opacity-60 font-AsapCondensedRegular"
        >
          No customers yet
        </div>
      </div>

      <!-- Invoices View -->
      <div
        v-if="currentView === 'invoices'"
        class="bg-white rounded-lg shadow-sm p-8"
      >
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-3xl font-AsapCondensedBold text-black">Invoices</h2>
          <button
            @click="showInvoiceForm = !showInvoiceForm"
            class="bg-black text-white px-6 py-2.5 rounded-lg font-AsapCondensedSemiBold hover:bg-gray-800 transition"
          >
            New Invoice
          </button>
        </div>

        <!-- Create Invoice Form -->
        <div v-if="showInvoiceForm" class="mb-8 p-6 bg-grey rounded-lg">
          <h3 class="font-AsapCondensedBold text-black mb-4">Create Invoice</h3>

          <div class="space-y-4">
            <select
              v-model="newInvoice.customerId"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg font-AsapCondensedRegular focus:outline-none focus:border-green"
            >
              <option value="">Select Customer</option>
              <option
                v-for="customer in customers"
                :key="customer.id"
                :value="customer.id"
              >
                {{ customer.name }} ({{ customer.discount }}% discount)
              </option>
            </select>

            <div class="space-y-2">
              <div
                v-for="(line, index) in newInvoice.items"
                :key="index"
                class="flex gap-2"
              >
                <select
                  v-model="line.itemId"
                  class="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-AsapCondensedRegular focus:outline-none focus:border-green"
                >
                  <option value="">Select Item</option>
                  <option v-for="item in items" :key="item.id" :value="item.id">
                    {{ item.name }} - ${{ item.price }}
                  </option>
                </select>
                <input
                  v-model="line.quantity"
                  type="number"
                  placeholder="Qty"
                  min="1"
                  class="w-24 px-4 py-3 border border-gray-300 rounded-lg font-AsapCondensedRegular focus:outline-none focus:border-green"
                />
                <button
                  @click="newInvoice.items.splice(index, 1)"
                  class="px-4 py-3 bg-pink text-white rounded-lg hover:opacity-80 transition"
                >
                  ✕
                </button>
              </div>
              <button
                @click="newInvoice.items.push({ itemId: '', quantity: 1 })"
                class="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg font-AsapCondensedRegular text-black opacity-60 hover:opacity-100 transition"
              >
                + Add Item
              </button>
            </div>

            <div class="flex gap-2">
              <button
                @click="createInvoice"
                class="flex-1 bg-green text-white py-3 rounded-lg font-AsapCondensedSemiBold hover:bg-blue transition"
              >
                Create Invoice
              </button>
              <button
                @click="
                  showInvoiceForm = false;
                  resetInvoiceForm();
                "
                class="px-6 py-3 bg-gray-200 text-black rounded-lg font-AsapCondensedSemiBold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <!-- Invoices Table -->
        <div v-if="invoices.length > 0">
          <div class="grid grid-cols-5 gap-4 pb-3 border-b border-0.5 mb-3">
            <div
              class="font-AsapCondensedSemiBold text-black opacity-60 text-sm"
            >
              Invoice #
            </div>
            <div
              class="font-AsapCondensedSemiBold text-black opacity-60 text-sm"
            >
              Customer
            </div>
            <div
              class="font-AsapCondensedSemiBold text-black opacity-60 text-sm"
            >
              Date
            </div>
            <div
              class="font-AsapCondensedSemiBold text-black opacity-60 text-sm"
            >
              Discount
            </div>
            <div
              class="font-AsapCondensedSemiBold text-black opacity-60 text-sm text-right"
            >
              Total
            </div>
          </div>
          <div
            v-for="invoice in invoices"
            :key="invoice.id"
            class="grid grid-cols-5 gap-4 py-4 border-b border-0.5 last:border-0"
          >
            <div class="font-AsapCondensedSemiBold text-black">
              #{{ invoice.id }}
            </div>
            <div class="font-AsapCondensedRegular text-black">
              {{ getCustomerName(invoice.customerId) }}
            </div>
            <div class="font-AsapCondensedRegular text-black">
              {{ invoice.date }}
            </div>
            <div class="font-AsapCondensedRegular text-black">
              {{ invoice.discount }}%
            </div>
            <div class="font-AsapCondensedSemiBold text-black text-right">
              ${{ invoice.total.toFixed(2) }}
            </div>
          </div>
        </div>
        <div
          v-else
          class="text-center py-8 text-black opacity-60 font-AsapCondensedRegular"
        >
          No invoices yet
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      currentView: "items",
      showInvoiceForm: false,

      // Items
      items: [],
      newItem: {
        name: "",
        price: "",
      },

      // Customers
      customers: [],
      newCustomer: {
        name: "",
        discount: "",
      },

      // Invoices
      invoices: [],
      newInvoice: {
        customerId: "",
        items: [{ itemId: "", quantity: 1 }],
      },
    };
  },

  methods: {
    // Items
    addItem() {
      if (this.newItem.name && this.newItem.price) {
        this.items.push({
          id: Date.now(),
          name: this.newItem.name,
          price: parseFloat(this.newItem.price),
        });
        this.newItem = { name: "", price: "" };
      }
    },

    // Customers
    addCustomer() {
      if (this.newCustomer.name && this.newCustomer.discount !== "") {
        this.customers.push({
          id: Date.now(),
          name: this.newCustomer.name,
          discount: parseInt(this.newCustomer.discount),
        });
        this.newCustomer = { name: "", discount: "" };
      }
    },

    // Invoices
    createInvoice() {
      if (!this.newInvoice.customerId || this.newInvoice.items.length === 0) {
        alert("Please select a customer and add at least one item");
        return;
      }

      const customer = this.customers.find(
        (c) => c.id === parseInt(this.newInvoice.customerId)
      );
      let subtotal = 0;

      this.newInvoice.items.forEach((line) => {
        if (line.itemId) {
          const item = this.items.find((i) => i.id === parseInt(line.itemId));
          if (item) {
            subtotal += item.price * parseInt(line.quantity);
          }
        }
      });

      const discount = customer ? customer.discount : 0;
      const total = subtotal * (1 - discount / 100);

      this.invoices.unshift({
        id: this.invoices.length + 1,
        customerId: parseInt(this.newInvoice.customerId),
        date: new Date().toISOString().split("T")[0],
        discount: discount,
        total: total,
      });

      this.resetInvoiceForm();
      this.showInvoiceForm = false;
    },

    resetInvoiceForm() {
      this.newInvoice = {
        customerId: "",
        items: [{ itemId: "", quantity: 1 }],
      };
    },

    getCustomerName(customerId) {
      const customer = this.customers.find((c) => c.id === customerId);
      return customer ? customer.name : "Unknown";
    },
  },

  mounted() {
    this.items = [
      { id: 1, name: "iPhone 15 Pro", price: 4599 },
      { id: 2, name: "Samsung Galaxy 2025", price: 5399 },
      { id: 3, name: "Nokia 5310", price: 1500 },
      { id: 4, name: "Motorola", price: 3000 },
    ];

    this.customers = [
      { id: 1, name: "Ahmed", discount: 10 },
      { id: 2, name: "Ajay", discount: 5 },
      { id: 3, name: "Chandra", discount: 20 },
    ];

    this.invoices = [
      { id: 4, customerId: 2, date: "2026-01-14", discount: 5, total: 12154.3 },
      { id: 3, customerId: 1, date: "2026-01-14", discount: 10, total: 9450.0 },
      {
        id: 2,
        customerId: 3,
        date: "2026-01-09",
        discount: 20,
        total: 17116.8,
      },
      { id: 1, customerId: 2, date: "2026-01-08", discount: 5, total: 8738.1 },
    ];
  },
};
</script>