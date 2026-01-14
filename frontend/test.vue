<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-20">
            <div class="flex items-center space-x-12">
              <div class="flex items-center space-x-3">
                <img
                  src="../assets/logos/mainlogo.png"
                  alt="Logo"
                  class="w-[80px] h-[80px] object-contain"
                />
              </div>
              <nav class="hidden md:flex space-x-2">
                <button
                  @click="currentView = 'items'"
                  :class="
                    currentView === 'items'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black hover:bg-gray-100'
                  "
                  class="px-6 py-2.5 rounded-lg font-AsapCondensedSemiBold transition-all"
                >
                  Items
                </button>
                <button
                  @click="currentView = 'customers'"
                  :class="
                    currentView === 'customers'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black hover:bg-gray-100'
                  "
                  class="px-6 py-2.5 rounded-lg font-AsapCondensedSemiBold transition-all"
                >
                  Customers
                </button>
                <button
                  @click="currentView = 'invoices'; invoiceView = 'list'; selectedInvoice = null"
                  :class="
                    currentView === 'invoices'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black hover:bg-gray-100'
                  "
                  class="px-6 py-2.5 rounded-lg font-AsapCondensedSemiBold transition-all"
                >
                  Invoices
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>
  
      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Items View -->
        <div v-if="currentView === 'items'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h1 class="text-4xl font-AsapCondensedBold text-gray-900">Items</h1>
          </div>
  
          <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 class="text-xl font-AsapCondensedBold text-gray-900 mb-6">Add New Item</h2>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <input
                v-model="newItem.name"
                type="text"
                placeholder="Item Name"
                class="px-5 py-3.5 border-2 border-gray-200 rounded-xl font-AsapCondensedRegular focus:outline-none focus:border-green transition-all"
              />
              <input
                v-model="newItem.price"
                type="number"
                placeholder="Price"
                class="px-5 py-3.5 border-2 border-gray-200 rounded-xl font-AsapCondensedRegular focus:outline-none focus:border-green transition-all"
              />
            </div>
            <button
              @click="addItem"
              class="w-full bg-gradient-to-r from-green to-blue text-white py-3.5 rounded-xl font-AsapCondensedBold hover:shadow-lg transform hover:scale-[1.02] transition-all"
            >
              Add Item
            </button>
          </div>
  
          <div v-if="items.length > 0" class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4 border-b border-gray-200">
              <div class="grid grid-cols-2 gap-4">
                <div class="font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide">Item</div>
                <div class="font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide text-right">Price</div>
              </div>
            </div>
            <div class="divide-y divide-gray-100">
              <div
                v-for="item in items"
                :key="item._id"
                class="px-8 py-5 hover:bg-gray-50 transition-colors"
              >
                <div class="grid grid-cols-2 gap-4">
                  <div class="font-AsapCondensedRegular text-gray-900 text-lg">{{ item.name }}</div>
                  <div class="font-AsapCondensedSemiBold text-gray-900 text-lg text-right">${{ item.price }}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="bg-white rounded-2xl shadow-lg p-16 text-center border border-gray-200">
            <div class="text-gray-400 font-AsapCondensedRegular text-lg">No items yet. Add your first item above!</div>
          </div>
        </div>
  
        <!-- Customers View -->
        <div v-if="currentView === 'customers'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h1 class="text-4xl font-AsapCondensedBold text-gray-900">Customers</h1>
          </div>
  
          <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 class="text-xl font-AsapCondensedBold text-gray-900 mb-6">Add New Customer</h2>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <input
                v-model="newCustomer.name"
                type="text"
                placeholder="Customer Name"
                class="px-5 py-3.5 border-2 border-gray-200 rounded-xl font-AsapCondensedRegular focus:outline-none focus:border-green transition-all"
              />
              <input
                v-model="newCustomer.discount"
                type="number"
                placeholder="Discount %"
                class="px-5 py-3.5 border-2 border-gray-200 rounded-xl font-AsapCondensedRegular focus:outline-none focus:border-green transition-all"
              />
            </div>
            <button
              @click="addCustomer"
              class="w-full bg-gradient-to-r from-green to-blue text-white py-3.5 rounded-xl font-AsapCondensedBold hover:shadow-lg transform hover:scale-[1.02] transition-all"
            >
              Add Customer
            </button>
          </div>
  
          <div v-if="customers.length > 0" class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4 border-b border-gray-200">
              <div class="grid grid-cols-2 gap-4">
                <div class="font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide">Customer</div>
                <div class="font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide text-right">Discount</div>
              </div>
            </div>
            <div class="divide-y divide-gray-100">
              <div
                v-for="customer in customers"
                :key="customer._id"
                class="px-8 py-5 hover:bg-gray-50 transition-colors"
              >
                <div class="grid grid-cols-2 gap-4">
                  <div class="font-AsapCondensedRegular text-gray-900 text-lg">{{ customer.name }}</div>
                  <div class="font-AsapCondensedSemiBold text-gray-900 text-lg text-right">{{ customer.discount }}%</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="bg-white rounded-2xl shadow-lg p-16 text-center border border-gray-200">
            <div class="text-gray-400 font-AsapCondensedRegular text-lg">No customers yet. Add your first customer above!</div>
          </div>
        </div>
  
        <!-- Invoices View -->
        <div v-if="currentView === 'invoices'" class="space-y-6">
          <!-- Invoice List -->
          <div v-if="invoiceView === 'list'">
            <div class="flex justify-between items-center mb-6">
              <h1 class="text-4xl font-AsapCondensedBold text-gray-900">Invoices</h1>
              <button
                @click="invoiceView = 'create'"
                class="bg-gradient-to-r from-green to-blue text-white px-8 py-3.5 rounded-xl font-AsapCondensedBold hover:shadow-lg transform hover:scale-[1.02] transition-all"
              >
                New Invoice
              </button>
            </div>
  
            <div v-if="invoices.length > 0" class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4 border-b border-gray-200">
                <div class="grid grid-cols-6 gap-4">
                  <div class="font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide">Invoice #</div>
                  <div class="font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide">Customer</div>
                  <div class="font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide">Date</div>
                  <div class="font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide">Discount</div>
                  <div class="font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide text-right">Total</div>
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
                    <div class="font-AsapCondensedBold text-gray-900 text-lg">#{{ invoices.length - index }}</div>
                    <div class="font-AsapCondensedRegular text-gray-700">{{ invoice.customerId?.name || 'Unknown' }}</div>
                    <div class="font-AsapCondensedRegular text-gray-700">{{ new Date(invoice.createdAt).toLocaleDateString() }}</div>
                    <div class="font-AsapCondensedRegular text-gray-700">{{ invoice.discount }}%</div>
                    <div class="font-AsapCondensedBold text-gray-900 text-lg text-right">${{ invoice.total.toFixed(2) }}</div>
                    <div class="text-right">
                      <button
                        @click="viewInvoice(invoice)"
                        class="px-5 py-2 bg-gray-900 text-white rounded-lg font-AsapCondensedSemiBold hover:bg-gray-800 transition-all"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="bg-white rounded-2xl shadow-lg p-16 text-center border border-gray-200">
              <div class="text-gray-400 font-AsapCondensedRegular text-lg">No invoices yet. Create your first invoice!</div>
            </div>
          </div>
  
          <!-- Create Invoice Form -->
          <div v-else-if="invoiceView === 'create'" class="space-y-6">
            <div class="flex items-center gap-4">
              <button
                @click="invoiceView = 'list'"
                class="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                ← Back
              </button>
              <h1 class="text-4xl font-AsapCondensedBold text-gray-900">Create Invoice</h1>
            </div>
  
            <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 space-y-6">
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-AsapCondensedBold text-gray-700 mb-2">Customer</label>
                  <select
                    v-model="newInvoice.customerId"
                    @change="updateDiscount"
                    class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl font-AsapCondensedRegular focus:outline-none focus:border-green transition-all"
                  >
                    <option value="">Select customer</option>
                    <option
                      v-for="customer in customers"
                      :key="customer._id"
                      :value="customer._id"
                    >
                      {{ customer.name }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-AsapCondensedBold text-gray-700 mb-2">Date</label>
                  <input
                    v-model="invoiceDate"
                    type="date"
                    class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl font-AsapCondensedRegular focus:outline-none focus:border-green transition-all"
                  />
                </div>
              </div>
  
              <div>
                <label class="block text-sm font-AsapCondensedBold text-gray-700 mb-3">Items</label>
                <div class="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div class="grid grid-cols-12 gap-3 text-sm font-AsapCondensedBold text-gray-600 px-2">
                    <div class="col-span-5">Item</div>
                    <div class="col-span-2 text-center">Qty</div>
                    <div class="col-span-2 text-right">Price</div>
                    <div class="col-span-2 text-right">Total</div>
                    <div class="col-span-1"></div>
                  </div>
  
                  <div
                    v-for="(line, index) in newInvoice.items"
                    :key="index"
                    class="grid grid-cols-12 gap-3 items-center bg-white p-3 rounded-lg"
                  >
                    <div class="col-span-5">
                      <select
                        v-model="line.itemId"
                        class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg font-AsapCondensedRegular focus:outline-none focus:border-green"
                      >
                        <option value="">Select item</option>
                        <option v-for="item in items" :key="item._id" :value="item._id">
                          {{ item.name }}
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
                    <div class="col-span-2 text-right font-AsapCondensedRegular text-gray-700">
                      ${{ getItemPrice(line.itemId).toFixed(2) }}
                    </div>
                    <div class="col-span-2 text-right font-AsapCondensedBold text-gray-900">
                      ${{ getLineTotal(line).toFixed(2) }}
                    </div>
                    <div class="col-span-1 text-center">
                      <button
                        v-if="newInvoice.items.length > 1"
                        @click="newInvoice.items.splice(index, 1)"
                        class="text-pink hover:opacity-70 font-AsapCondensedBold text-xl"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
  
                  <button
                    @click="newInvoice.items.push({ itemId: '', quantity: 1 })"
                    class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-green font-AsapCondensedBold hover:border-green hover:bg-green hover:bg-opacity-5 transition-all"
                  >
                    + Add row
                  </button>
                </div>
              </div>
  
              <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 space-y-4 border-2 border-gray-200">
                <div class="flex justify-between items-center">
                  <span class="font-AsapCondensedRegular text-gray-700 text-lg">Subtotal</span>
                  <span class="font-AsapCondensedBold text-gray-900 text-xl">${{ calculateSubtotal().toFixed(2) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="font-AsapCondensedRegular text-gray-700 text-lg">Discount (%)</span>
                  <input
                    v-model.number="invoiceDiscount"
                    type="number"
                    min="0"
                    max="100"
                    class="w-28 px-4 py-2 border-2 border-gray-200 rounded-lg font-AsapCondensedBold text-right focus:outline-none focus:border-green"
                  />
                </div>
                <div class="border-t-2 border-gray-300 pt-4 flex justify-between items-center">
                  <span class="font-AsapCondensedBold text-gray-900 text-2xl">Grand Total</span>
                  <span class="font-AsapCondensedBold text-green text-3xl">${{ calculateGrandTotal().toFixed(2) }}</span>
                </div>
              </div>
  
              <div class="flex gap-3 pt-4">
                <button
                  @click="createInvoice"
                  class="flex-1 bg-gradient-to-r from-green to-blue text-white py-4 rounded-xl font-AsapCondensedBold hover:shadow-lg transform hover:scale-[1.02] transition-all text-lg"
                >
                  Save Invoice
                </button>
                <button
                  @click="invoiceView = 'list'"
                  class="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-AsapCondensedBold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
  
          <!-- Invoice Detail View -->
          <div v-else-if="invoiceView === 'detail' && selectedInvoice" class="space-y-6">
            <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div class="flex justify-between items-start mb-8">
                <div>
                  <div class="text-sm font-AsapCondensedBold text-gray-500 uppercase tracking-wide mb-2">Invoice</div>
                  <h1 class="text-5xl font-AsapCondensedBold text-gray-900 mb-3">#{{ getInvoiceNumber(selectedInvoice) }}</h1>
                  <div class="font-AsapCondensedRegular text-gray-600 text-lg">Date: {{ new Date(selectedInvoice.createdAt).toLocaleDateString() }}</div>
                </div>
                <div class="flex gap-3">
                  <button
                    @click="invoiceView = 'list'"
                    class="px-6 py-3 border-2 border-gray-300 rounded-xl font-AsapCondensedBold text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    Back to invoices
                  </button>
                  <button
                    @click="printInvoice"
                    class="bg-gradient-to-r from-green to-blue text-white px-6 py-3 rounded-xl font-AsapCondensedBold hover:shadow-lg transition-all"
                  >
                    Print PDF
                  </button>
                </div>
              </div>
  
              <div class="bg-gradient-to-br from-blue from-opacity-5 to-green to-opacity-5 rounded-xl p-6 mb-8 border border-gray-200">
                <div class="text-sm font-AsapCondensedBold text-gray-500 uppercase tracking-wide mb-2">Bill To</div>
                <div class="font-AsapCondensedBold text-gray-900 text-2xl mb-2">{{ selectedInvoice.customerId?.name }}</div>
                <div class="font-AsapCondensedRegular text-gray-600">Discount: {{ selectedInvoice.discount }}%</div>
              </div>
  
              <div class="rounded-xl overflow-hidden border-2 border-gray-200 mb-8">
                <table class="w-full">
                  <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th class="px-6 py-4 text-left font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide">Item</th>
                      <th class="px-6 py-4 text-center font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide">Qty</th>
                      <th class="px-6 py-4 text-right font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide">Price</th>
                      <th class="px-6 py-4 text-right font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide">Line Total</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr
                      v-for="(item, index) in selectedInvoice.items"
                      :key="index"
                      class="hover:bg-gray-50 transition-colors"
                    >
                      <td class="px-6 py-4 font-AsapCondensedRegular text-gray-900 text-lg">{{ item.itemId?.name }}</td>
                      <td class="px-6 py-4 text-center font-AsapCondensedRegular text-gray-700">{{ item.quantity }}</td>
                      <td class="px-6 py-4 text-right font-AsapCondensedRegular text-gray-700">${{ item.itemId?.price.toFixed(2) }}</td>
                      <td class="px-6 py-4 text-right font-AsapCondensedBold text-gray-900 text-lg">${{ (item.itemId?.price * item.quantity).toFixed(2) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
  
              <div class="flex justify-end">
                <div class="w-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 space-y-4 border-2 border-gray-200">
                  <div class="text-sm font-AsapCondensedBold text-gray-500 uppercase tracking-wide mb-4">Totals</div>
                  <div class="flex justify-between items-center">
                    <span class="font-AsapCondensedRegular text-gray-700 text-lg">Subtotal</span>
                    <span class="font-AsapCondensedBold text-gray-900 text-xl">${{ calculateInvoiceSubtotal(selectedInvoice).toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="font-AsapCondensedRegular text-gray-700 text-lg">Discount</span>
                    <span class="font-AsapCondensedBold text-gray-900 text-xl">{{ selectedInvoice.discount }}%</span>
                  </div>
                  <div class="border-t-2 border-gray-300 pt-4 flex justify-between items-center">
                    <span class="font-AsapCondensedBold text-gray-900 text-2xl">Total</span>
                    <span class="font-AsapCondensedBold text-green text-3xl">${{ selectedInvoice.total.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  const API_URL = 'http://localhost:3000/api';
  
  export default {
    name: "HomePage",
    data() {
      return {
        currentView: "items",
        invoiceView: "list",
        selectedInvoice: null,
        invoiceDate: new Date().toISOString().split('T')[0],
        items: [],
        newItem: { name: "", price: "" },
        customers: [],
        newCustomer: { name: "", discount: "" },
        invoices: [],
        newInvoice: { customerId: "", items: [{ itemId: "", quantity: 1 }] },
        invoiceDiscount: 0,
      };
    },
    methods: {
      async fetchItems() {
        try {
          const response = await axios.get(`${API_URL}/items`);
          this.items = response.data;
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      },
      async addItem() {
        if (this.newItem.name && this.newItem.price) {
          try {
            const response = await axios.post(`${API_URL}/items`, {
              name: this.newItem.name,
              price: parseFloat(this.newItem.price),
            });
            this.items.push(response.data);
            this.newItem = { name: "", price: "" };
          } catch (error) {
            console.error('Error adding item:', error);
          }
        }
      },
      async fetchCustomers() {
        try {
          const response = await axios.get(`${API_URL}/customers`);
          this.customers = response.data;
        } catch (error) {
          console.error('Error fetching customers:', error);
        }
      },
      async addCustomer() {
        if (this.newCustomer.name && this.newCustomer.discount !== "") {
          try {
            const response = await axios.post(`${API_URL}/customers`, {
              name: this.newCustomer.name,
              discount: parseInt(this.newCustomer.discount),
            });
            this.customers.push(response.data);
            this.newCustomer = { name: "", discount: "" };
          } catch (error) {
            console.error('Error adding customer:', error);
          }
        }
      },
      async fetchInvoices() {
        try {
          const response = await axios.get(`${API_URL}/invoices`);
          this.invoices = response.data;
        } catch (error) {
          console.error('Error fetching invoices:', error);
        }
      },
      getItemPrice(itemId) {
        if (!itemId) return 0;
        const item = this.items.find(i => i._id === itemId);
        return item ? item.price : 0;
      },
      getLineTotal(line) {
        return this.getItemPrice(line.itemId) * (line.quantity || 0);
      },
      calculateSubtotal() {
        return this.newInvoice.items.reduce((sum, line) => sum + this.getLineTotal(line), 0);
      },
      calculateGrandTotal() {
        const subtotal = this.calculateSubtotal();
        return subtotal * (1 - (this.invoiceDiscount || 0) / 100);
      },
      calculateInvoiceSubtotal(invoice) {
        return invoice.items.reduce((sum, item) => sum + (item.itemId?.price || 0) * item.quantity, 0);
      },
      updateDiscount() {
        const customer = this.customers.find(c => c._id === this.newInvoice.customerId);
        this.invoiceDiscount = customer ? customer.discount : 0;
      },

      
    async createInvoice() {
      if (!this.newInvoice.customerId) {
        alert("Please select a customer");
        return;
      }

      const validItems = this.newInvoice.items.filter(
        (item) => item.itemId && item.quantity > 0
      );

      if (validItems.length === 0) {
        alert("Please add at least one valid item");
        return;
      }

      try {
        const response = await axios.post(`${API_URL}/invoices`, {
          customerId: this.newInvoice.customerId,
          items: validItems,
        });

        this.invoices.unshift(response.data);
        this.resetInvoiceForm();
        this.invoiceView = "list";
      } catch (error) {
        console.error("Error creating invoice:", error);
        alert("Failed to create invoice");
      }
    },

    viewInvoice(invoice) {
      this.selectedInvoice = invoice;
      this.invoiceView = "detail";
    },

    getInvoiceNumber(invoice) {
      const index = this.invoices.findIndex((inv) => inv._id === invoice._id);
      return this.invoices.length - index;
    },

    printInvoice() {
      window.print();
    },

    resetInvoiceForm() {
      this.newInvoice = {
        customerId: "",
        items: [{ itemId: "", quantity: 1 }],
      };
      this.invoiceDiscount = 0;
      this.invoiceDate = new Date().toISOString().split("T")[0];
    },
  },

  async mounted() {
    await this.fetchItems();
    await this.fetchCustomers();
    await this.fetchInvoices();
  },
};
</script>