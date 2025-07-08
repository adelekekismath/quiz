<template>
    <div class="bg-gradient-to-br from-indigo-50 to-white">  
        <div
            v-if="!isQuizDone"
            class="flex items-center justify-center h-screen "
        >
            <div class="max-w-3xl w-full bg-white p-8 rounded-xl shadow-xl ">
                <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-indigo-800">
                    Quiz time, {{ pseudo }}! You've got this !!!!!
                </h2>
                <div class="text-xl font-semibold" :class="{
                    'text-green-600': timeLeft > 60,
                    'text-yellow-500': timeLeft <= 60 && timeLeft > 30,
                    'text-red-500': timeLeft <= 30
                }">
                    {{ formattedTime }}
                </div>
            </div>

            <div
                v-if="state === 'loading'"
                class="max-w-xl mx-auto text-center py-12"
            >
                <p class="text-xl text-indigo-700 font-medium">
                Chargement des questions personnalisées en cours...
                </p>
                <p class="text-sm text-gray-500 mt-2">
                Merci de patienter quelques instants.
                </p>
            </div>

            <div
                v-else-if="state === 'error'"
                class="max-w-xl mb-8 mx-auto text-center py-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6"
            >
                <p class="text-lg font-semibold text-yellow-800">
                Problème de chargement des questions personnalisées
                </p>
                <p class="text-sm text-gray-600 mt-2">
                Les questions par défaut ont été chargées à la place. Elles ne
                correspondent peut-être pas à vos critères.
                </p>
            </div>

            <div v-if="!(state === 'loading')">
                <ProgressBar :progressPercentage="String(progressPercentage)" />

                <Question
                    v-for="(question, index) in questions"
                    v-show="index === currentQuestionIndex"
                    :key="index"
                    :question="question"
                    :index="index"
                    @record-answer="recordAnswer"
                />

                <div class="flex justify-between  mt-8">
                <button 
                    @click="quitQuiz"
                    class="bg-indigo-600 self-start hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition duration-300"
                >
                    Quit quiz
                </button>
                <button
                    @click="goToNextQuestion()"
                    :disabled="!enableNextButton"
                    class="bg-indigo-600 self-end hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition duration-300"
                >
                    {{
                    currentQuestionIndex === questions.length - 1
                        ? "Finish"
                        : "Next Question"
                    }}
                </button>

                



                </div>
            </div>
            </div>
  </div>

  <div v-else class="max-w-2xl mx-auto px-4 py-8">
    <Result
      :score="score"
      :choices="choices"
      :questions="questions"
      @reset-quiz="resetQuiz"
      @start-new-quiz="startNewQuiz"
    />
  </div>
    </div>
  
</template>

<script setup lang="ts">
import { useQuiz } from "@/composables/useQuiz";
    import ProgressBar from "@/components/ProgressBar.vue";
    import Question from "@/components/Question.vue";
    import Result from "@/components/Result.vue";
    import { onMounted, TransitionGroup } from "vue";
    import { useQuizMetaStore } from "@/stores/quizMetaStore";

    const pseudo = useQuizMetaStore().pseudo;
    const quiz = useQuiz();
    const {
        isQuizDone,
        state,
        startNewQuiz,
        resetQuiz,
        questions,
        score,
        choices,
        recordAnswer,
        progressPercentage,
        goToNextQuestion,
        currentQuestionIndex,
        enableNextButton,
        loadQuestions,
        quitQuiz,
        formattedTime,
        isTimeUp,
        timeLeft,
        startTimer,
        timeUp,
    } = quiz;

    onMounted(() => {
        loadQuestions();
    });
</script>


