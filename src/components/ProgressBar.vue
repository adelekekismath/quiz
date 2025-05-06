<template>

    <div class="flex gap-3">
        <div class="progress-bar">
            <div class="progress bg-indigo-400" :style="{ width: `${percentage}%` }"></div> 
        </div>
        {{ percentage.toFixed(0) }}%
    </div>

    
</template>


<script setup lang="ts">

import { computed } from 'vue';

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
    height: 100%;
    transition: width 0.3s ease;
}
</style>