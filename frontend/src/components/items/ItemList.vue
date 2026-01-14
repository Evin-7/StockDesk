<template>
  <div
    v-if="items.length > 0"
    class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
  >
    <!-- Header -->
    <div
      class="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4 border-b border-gray-200"
    >
      <div class="grid grid-cols-2 gap-4">
        <div
          class="font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide"
        >
          Item
        </div>
        <div
          class="font-AsapCondensedBold text-gray-700 text-sm uppercase tracking-wide text-right"
        >
          Price
        </div>
      </div>
    </div>

    <!-- Rows -->
    <div class="divide-y divide-gray-100">
      <div
        v-for="item in items"
        :key="item._id"
        class="px-8 py-5 hover:bg-gray-50 transition-colors"
      >
        <div class="grid grid-cols-2 gap-4">
          <div class="font-AsapCondensedRegular text-gray-900 text-lg">
            {{ item.name }}
          </div>
          <div
            class="font-AsapCondensedSemiBold text-gray-900 text-lg text-right"
          >
            ${{ item.price }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Empty State -->
  <div
    v-else
    class="bg-white rounded-2xl shadow-lg p-16 text-center border border-gray-200"
  >
    <div class="text-gray-400 font-AsapCondensedRegular text-lg">
      No items yet. Add your first item above!
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "ItemList",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
  