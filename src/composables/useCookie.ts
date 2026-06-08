import { ref, watch } from "vue";

export function useCookie(name: string, defaultValue: string) {
  function read(): string {
    const match = document.cookie.match(
      new RegExp("(?:^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)"),
    );
    return match ? decodeURIComponent(match[1]) : defaultValue;
  }

  function write(value: string) {
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
  }

  const state = ref(read());

  watch(state, (value) => write(value));

  return state;
}
