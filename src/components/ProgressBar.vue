<template>

    <div class="progress-bar">
        <div class="progress" :style="{ width: `${percentage}%` }"></div>
    </div>
</template>


<script setup lang="ts">

import { computed , defineProps} from 'vue';

const props = defineProps({
    currentIndex: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    }
});

const percentage = computed(() => {
    if (props.totalQuestions === 0) return 0;
    return (props.currentIndex / props.totalQuestions) * 100;
});


</script>

<style scoped>
.progress-bar {
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
}
.progress {
    height: 10px;
    background-color: #76c7c0;
    transition: width 0.3s ease;
}
</style>