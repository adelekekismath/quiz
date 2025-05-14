<template>

    <div class="flex gap-3 mb-10">
        <div class="progress-bar ">
            <div 
                class="progress bg-indigo-400" 
                role="progressbar"
                :aria-valuenow="progressPercentage"
                :style="{ width: `${progressPercentage}` }">
            </div> 
        </div>
        <span>
            {{ progressPercentage}}
        </span>
    </div>

    
</template>


<script setup lang="ts">

    import { defineProps} from 'vue';

    defineProps({
        progressPercentage: {
            type: String,
            required: true,
        }
    })

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