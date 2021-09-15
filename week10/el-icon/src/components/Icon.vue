<template>
  <i class="el-icon" :style="style" v-bind="$attrs">
    <slot></slot>
  </i>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'Icon',
  props: {
    size: {
      type: Number,
    },
    color: {
      type: String,
    }
  },
  setup(props) {
    return {
      style: computed(() => {
        if (!props.size && !props.color) {
          return {}
        }

        return {
          'font-size': props.size ? `${props.size}px` : undefined,
          'color': props.color || undefined
        };
      })
    };
  }
})
</script>


<style lang="css">
.el-icon svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
