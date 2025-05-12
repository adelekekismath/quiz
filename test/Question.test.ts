import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Question from '../src/components/Question.vue'

describe('Question Component', () => {
  const mockQuestion = {
    question: 'What is the capital of France?',
    correct_answer: 'Paris',
    incorrect_answers: ['London', 'Berlin', 'Madrid']
  }

  let wrapper

  const createWrapper = (props = {}) => {
    return mount(Question, {
      props: {
        question: mockQuestion,
        index: 0,
        ...props
      }
    })
  }

  beforeEach(() => {
    wrapper = createWrapper()
  })

  describe('Initial Rendering', () => {
    it('displays the question text correctly', () => {
      expect(wrapper.find('h3').text()).toBe(mockQuestion.question)
    })

    it('renders all answer options', () => {
      const options = wrapper.findAll('.bg-indigo-50')
      expect(options.length).toBe(mockQuestion.incorrect_answers.length + 1)
    })

    it('shuffles correct and incorrect answers', () => {
      const displayedOptions = wrapper.findAll('label').map(label => label.text())
      
      expect(displayedOptions).toContain(mockQuestion.correct_answer)
      mockQuestion.incorrect_answers.forEach(answer => {
        expect(displayedOptions).toContain(answer)
      })
    })
  })

  describe('Answer Selection', () => {
    it('updates selection when an option is clicked', async () => {
      const firstOption = wrapper.findAll('.bg-indigo-50')[0]
      const optionText = firstOption.find('label').text()
      
      await firstOption.trigger('click')
      
      const radioInput = firstOption.find('input[type="radio"]')
      expect(radioInput.element.checked).toBe(true)
      expect(wrapper.vm.selectedOption).toBe(optionText)
    })

    it('emits event when answer is selected', async () => {
      const firstOption = wrapper.findAll('.bg-indigo-50')[0]
      const optionText = firstOption.find('label').text()
      
      await firstOption.trigger('click')
      
      expect(wrapper.emitted('record-answer')).toBeTruthy()
      expect(wrapper.emitted('record-answer')[0]).toEqual([optionText])
    })

    it('emits event when radio button is changed', async () => {
      const radioInput = wrapper.find('input[type="radio"]')
      const optionText = wrapper.find('label').text()
      
      await radioInput.trigger('change')
      
      expect(wrapper.emitted('record-answer')).toBeTruthy()
      expect(wrapper.emitted('record-answer')[0]).toEqual([optionText])
    })
  })

  describe('Accessibility', () => {
    it('correctly associates labels with radio inputs', () => {
      const inputs = wrapper.findAll('input[type="radio"]')
      const labels = wrapper.findAll('label')
      
      inputs.forEach((input, index) => {
        const inputId = input.attributes('id')
        const labelFor = labels[index].attributes('for')
        expect(inputId).toBe(`option${index}`)
        expect(labelFor).toBe(`option${index}`)
      })
    })

    it('applies correct hover styles to options', () => {
      const options = wrapper.findAll('.bg-indigo-50')
      options.forEach(option => {
        expect(option.classes()).toContain('hover:bg-indigo-100')
        expect(option.classes()).toContain('transition')
      })
    })
  })

  describe('Dynamic Behavior', () => {
    it('reacts to prop changes', async () => {
      const newQuestion = {
        question: 'What is the largest ocean?',
        correct_answer: 'Pacific',
        incorrect_answers: ['Atlantic', 'Indian', 'Arctic']
      }
      
      await wrapper.setProps({ 
        question: newQuestion,
        index: 1
      })
      
      expect(wrapper.find('h3').text()).toBe(newQuestion.question)
      
      const displayedOptions = wrapper.findAll('label').map(label => label.text())
      expect(displayedOptions).toContain(newQuestion.correct_answer)
      newQuestion.incorrect_answers.forEach(answer => {
        expect(displayedOptions).toContain(answer)
      })
    })
  })


})