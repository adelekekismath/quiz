import { defineStore } from 'pinia'
import  type { QuizMeta } from '@/utils/types'

export const useQuizMetaStore = defineStore('quizMeta', {
  state: (): QuizMeta => ( {
    pseudo: '',
    category: '',
    difficulty: '',
    numberOfQuestions: 0,
  }),
  actions: {
    setMeta({ pseudo, category, difficulty, numberOfQuestions }: QuizMeta) {
      this.pseudo = pseudo
      this.category = category
      this.difficulty = difficulty
      this.numberOfQuestions = numberOfQuestions
    },
    resetMeta() {
      this.category = ''
      this.difficulty = ''
      this.numberOfQuestions = 0
    },
  },
})
