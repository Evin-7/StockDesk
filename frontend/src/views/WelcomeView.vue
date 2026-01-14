<template>
  <div
    class="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#f8fafc] px-4 sm:px-6"
  >
    <!-- Grid Background -->
    <div
      class="absolute inset-0 z-0 opacity-40"
      style="
        background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
        background-size: 30px 30px;
      "
    ></div>

    <!-- Decorative Shapes -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        class="absolute -top-10 -left-10 w-40 sm:w-64 h-40 sm:h-64 bg-green/20 rounded-full blur-2xl"
      ></div>
      <div
        class="absolute -top-20 left-10 sm:left-20 w-60 sm:w-80 h-60 sm:h-80 bg-blue/10 rounded-full blur-3xl"
      ></div>

      <div
        class="absolute -top-10 -right-10 w-72 sm:w-96 h-40 sm:h-64 bg-green/15 rounded-[100px] rotate-12"
      ></div>

      <div
        class="absolute -bottom-20 -right-20 w-72 sm:w-[450px] h-72 sm:h-[450px] bg-green/20 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-20 -right-10 w-56 sm:w-72 h-[350px] sm:h-[500px] bg-blue/5 rounded-full rotate-45"
      ></div>

      <div
        class="absolute bottom-10 left-10 w-32 sm:w-48 h-32 sm:h-48 border-[10px] sm:border-[12px] border-green/10 rounded-[40px] rotate-45"
      ></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 flex flex-col items-center text-center max-w-3xl">
      <!-- Logo -->
      <div
        class="mb-8 sm:mb-12 p-4 sm:p-6 bg-white shadow-sm rounded-2xl animate-fade-in border border-gray-100"
      >
        <img
          src="../assets/logos/mainlogo.png"
          alt="StockDesk Logo"
          class="w-24 h-24 sm:w-32 sm:h-32 object-contain"
        />
      </div>

      <!-- Heading -->
      <h1
        class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-AsapCondensedBold text-[#1e293b] mb-4 tracking-tight animate-slide-up"
      >
        Welcome to
        <span class="text-blue/100">StockDesk</span>
      </h1>

      <!-- Subtitle -->
      <p
        class="text-base sm:text-lg md:text-xl lg:text-2xl font-AsapCondensedRegular text-gray-500 mb-10 sm:mb-12 max-w-xl animate-slide-up delay-200"
      >
        Manage inventory, customers, and invoices with
        <span class="text-blue/100 font-AsapCondensedBold">speed</span>,
        <span class="text-blue/100 font-AsapCondensedBold">clarity</span>, and
        <span class="text-blue/100 font-AsapCondensedBold">confidence</span>.
      </p>

      <!-- CTA -->
      <div
        class="p-1 sm:p-1.5 border-4 border-green/20 rounded-[20px] sm:rounded-[24px] animate-slide-up delay-300"
      >
        <button
          @click="goHome"
          class="bg-blue hover:opacity-90 text-white px-10 sm:px-14 md:px-16 py-3 sm:py-4 rounded-[16px] sm:rounded-[18px] font-AsapCondensedBold text-lg sm:text-xl md:text-2xl transition-all active:scale-95"
        >
          Enter Dashboard
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { useRouter } from "vue-router";

export default {
  name: "WelcomeView",
  setup() {
    const router = useRouter();
    const goHome = () => router.push("/home");
    return { goHome };
  },
};
</script>
  
  <style scoped>
/* Brand Colors */
.text-green {
  color: #108a55;
}
.text-blue {
  color: #3b82f6;
}

/* Background utilities */
.bg-green\/10 {
  background-color: rgba(16, 138, 85, 0.1);
}
.bg-green\/15 {
  background-color: rgba(16, 138, 85, 0.15);
}
.bg-green\/20 {
  background-color: rgba(16, 138, 85, 0.2);
}
.bg-blue\/5 {
  background-color: rgba(59, 130, 246, 0.05);
}
.bg-blue\/10 {
  background-color: rgba(59, 130, 246, 0.1);
}
.border-green\/10 {
  border-color: rgba(16, 138, 85, 0.1);
}
.border-green\/20 {
  border-color: rgba(16, 138, 85, 0.2);
}

/* Animations */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}
.delay-200 {
  animation-delay: 0.2s;
}
.delay-300 {
  animation-delay: 0.4s;
}

/* Fonts */
.font-AsapCondensedBold {
  font-family: "Asap Condensed", sans-serif;
  font-weight: 700;
}
.font-AsapCondensedRegular {
  font-family: "Asap Condensed", sans-serif;
  font-weight: 400;
}
</style>
  