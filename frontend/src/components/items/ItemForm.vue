<template>
  <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
    <h2 class="text-xl font-AsapCondensedBold text-gray-900 mb-6">
      Add New Item
    </h2>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <input
        v-model="form.name"
        type="text"
        placeholder="Item Name"
        class="px-5 py-3.5 border-2 border-gray-200 rounded-xl font-AsapCondensedRegular focus:outline-none focus:border-green transition-all"
      />

      <input
        v-model="form.price"
        type="number"
        placeholder="Price"
        class="px-5 py-3.5 border-2 border-gray-200 rounded-xl font-AsapCondensedRegular focus:outline-none focus:border-green transition-all"
      />
    </div>

    <button
      @click="submit"
      class="w-full bg-gradient-to-r from-green to-blue text-white py-3.5 rounded-xl font-AsapCondensedBold hover:shadow-lg transform hover:scale-[1.02] transition-all"
    >
      Add Item
    </button>
  </div>
</template>
  
  <script>
export default {
  name: "ItemForm",
  emits: ["add"],

  data() {
    return {
      form: {
        name: "",
        price: "",
      },
    };
  },

  methods: {
    submit() {
      if (!this.form.name || !this.form.price) return;

      this.$emit("add", {
        name: this.form.name,
        price: parseFloat(this.form.price),
      });

      this.form = { name: "", price: "" };
    },
  },
};
</script>
  