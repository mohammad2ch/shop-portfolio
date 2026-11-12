import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      items: [], // مثل [{ id: 1, qty: 2 }]
      isOpen: false, // پنل سبد باز است؟

      // یکی اضافه کن (اگر نبود، با تعداد ۱ بساز) و پنل را باز کن
      add: (id) =>
        set((state) => {
          const found = state.items.find((i) => i.id === id);
          return {
            items: found
              ? state.items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
              : [...state.items, { id, qty: 1 }],
            isOpen: true,
          };
        }),

      // یکی کم کن (اگر به صفر رسید، حذف می‌شود)
      decrease: (id) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
            .filter((i) => i.qty > 0),
        })),

      setOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: "cart",
      // فقط خود سبد ذخیره شود، نه باز یا بسته بودن پنل
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export default useCartStore;