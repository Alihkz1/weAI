import { computed, ref } from "vue";

export function useIsMobile() {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  function update() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }

  window.addEventListener("resize", update);

  const isMobile = computed(() => width.value < 768);

  const unmount = () => window.removeEventListener("resize", update);

  return { isMobile, unmount };
}
