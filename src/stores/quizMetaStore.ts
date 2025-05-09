import { defineStore } from 'pinia'

export const useQuizMetaStore = defineStore('quizMeta', {
  state: () => ({
    pseudo: '',
    category: '',
    difficulty: '',
    numberOfQuestions: 0,
  }),
  actions: {
    setMeta({ pseudo, category, difficulty, numberOfQuestions }: { pseudo: string, category: string, difficulty: string, numberOfQuestions: number }) {
      this.pseudo = pseudo
      this.category = category
      this.difficulty = difficulty
      this.numberOfQuestions = numberOfQuestions
    },
    resetMeta() {
      this.pseudo = ''
      this.category = ''
      this.difficulty = ''
      this.numberOfQuestions = 0
    },
  },
})
