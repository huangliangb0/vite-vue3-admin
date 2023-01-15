<script lang="ts" setup></script>

<template>
  <a-button v-bind="$attrs">
    <template #icon>
      <slot name="icon"></slot>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </a-button>
</template>
