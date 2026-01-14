<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <AppHeader :activeView="currentView" @changeView="changeView" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="currentView === 'items'" class="space-y-6">
        <h1 class="text-4xl font-AsapCondensedBold text-gray-900">Items</h1>
        <ItemForm @add="handleAddItem" />
        <ItemList :items="items" />
      </div>

      <div v-if="currentView === 'customers'" class="space-y-6">
        <h1 class="text-4xl font-AsapCondensedBold text-gray-900">Customers</h1>
        <CustomerForm @add="handleAddCustomer" />
        <CustomerList :customers="customers" />
      </div>

      <div v-if="currentView === 'invoices'" class="space-y-6">
        <InvoiceList
          v-if="invoiceView === 'list'"
          :invoices="invoices"
          @create="invoiceView = 'create'"
          @view="viewInvoice"
        />

        <InvoiceCreate
          v-if="invoiceView === 'create'"
          :customers="customers"
          :items="items"
          @save="handleCreateInvoice"
          @back="invoiceView = 'list'"
        />

        <InvoiceDetail
          v-if="invoiceView === 'detail' && selectedInvoice"
          :invoice="selectedInvoice"
          :number="getInvoiceNumber(selectedInvoice)"
          @back="invoiceView = 'list'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader.vue";

import ItemForm from "@/components/items/ItemForm.vue";
import ItemList from "@/components/items/ItemList.vue";

import CustomerForm from "@/components/customers/CustomerForm.vue";
import CustomerList from "@/components/customers/CustomerList.vue";

import InvoiceList from "@/components/invoices/InvoiceList.vue";
import InvoiceCreate from "@/components/invoices/InvoiceCreate.vue";
import InvoiceDetail from "@/components/invoices/InvoiceDetail.vue";

import { getItems, createItem } from "@/services/item.service";
import { getCustomers, createCustomer } from "@/services/customer.service";
import { getInvoices, createInvoice } from "@/services/invoice.service";

export default {
  name: "HomeView",

  components: {
    AppHeader,
    ItemForm,
    ItemList,
    CustomerForm,
    CustomerList,
    InvoiceList,
    InvoiceCreate,
    InvoiceDetail,
  },

  data() {
    return {
      currentView: "items",
      invoiceView: "list", 
      selectedInvoice: null,

      items: [],
      customers: [],
      invoices: [],
    };
  },

  methods: {
    changeView(view) {
      this.currentView = view;

      if (view === "invoices") {
        this.invoiceView = "list";
        this.selectedInvoice = null;
      }
    },

    async loadItems() {
      try {
        const { data } = await getItems();
        this.items = data;
      } catch (error) {
        console.error("Error loading items:", error);
      }
    },

    async handleAddItem(item) {
      try {
        const { data } = await createItem(item);
        this.items.push(data);
      } catch (error) {
        console.error("Error adding item:", error);
      }
    },

    async loadCustomers() {
      try {
        const { data } = await getCustomers();
        this.customers = data;
      } catch (error) {
        console.error("Error loading customers:", error);
      }
    },

    async handleAddCustomer(customer) {
      try {
        const { data } = await createCustomer(customer);
        this.customers.push(data);
      } catch (error) {
        console.error("Error adding customer:", error);
      }
    },

    async loadInvoices() {
      try {
        const { data } = await getInvoices();
        this.invoices = data;
      } catch (error) {
        console.error("Error loading invoices:", error);
      }
    },

    async handleCreateInvoice(payload) {
      try {
        const { data } = await createInvoice(payload);
        this.invoices.unshift(data);
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
  },

  async mounted() {
    await this.loadItems();
    await this.loadCustomers();
    await this.loadInvoices();
  },
};
</script>
