<template>
    <svg :class="['size-4 text-slate-400 transition-transform duration-200', open ? 'rotate-180' : '']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6" />
    </svg>
</template>

<script setup lang="ts">
defineProps<{ open: boolean }>();
</script>
