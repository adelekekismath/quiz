
import { expect, describe, it, beforeEach } from "vitest";
import {mount} from '@vue/test-utils';
import ConfigurateQuizView from '../src/views/ConfigurateQuizView.vue'
import { createRouter, createMemoryHistory } from 'vue-router';
import { routes } from '../src/router/index.ts';
import { createPinia } from 'pinia';
import { wrap } from "module";


describe('ConfigirateQuiz View', ()=>{
    let wrapper
    let router
    let pinia

    const createWrapper = ()=> {
        pinia = createPinia()
        router = createRouter({
            history: createMemoryHistory(),
            routes
        })
        router.push('/configurate-quiz')

        return mount(ConfigurateQuizView, {
            global: {
                plugins: [router, pinia],
            },
        } )
    }
    
    beforeEach(() => {
        wrapper = createWrapper()
    })


    describe('should display the correctly the form element',()=>{
        it('should display the pseudo input', () => {
            expect(wrapper.find('[aria-label="pseudo"').exists()).toBe(true)
        })
        it('should display the number of questions input', () => {
            expect(wrapper.find('[aria-label="number-of-questions"]').exists()).toBe(true)
        })
        it('should display the difficulty select', () => {
            expect(wrapper.find('[aria-label="difficulty"]').exists()).toBe(true)
        })
        it('should display the category select', () => {
            expect(wrapper.find('[aria-label="category"]').exists()).toBe(true)
        }
        )
        it('should display the start quiz button', () => {
            expect(wrapper.find('[aria-label="start-quiz"]').exists()).toBe(true)
        }
        )      
        
    })


    describe('should bind correctly the input value', () => {
        
        it('should bind correctly the pseudo value', ()=> {
            const pseudoInput = wrapper.find('[aria-label="pseudo"]')
            pseudoInput.setValue("monPseudo")
            expect(wrapper.vm.pseudo).toBe("monPseudo")
        })

        it('should bind correctly the number of questions value', ()=> {
            const numberOfQuestionsInput = wrapper.find('[aria-label="number-of-questions"]')
            numberOfQuestionsInput.setValue(15)
            expect(wrapper.vm.numberOfQuestions).toBe("15")
        })

        it('should bind correctly the difficulty value', ()=> {
            const difficultySelect = wrapper.find('[aria-label="difficulty"]')
            difficultySelect.setValue("easy")
            expect(wrapper.vm.difficulty).toBe("easy")
        })
        it('should bind correctly the category value', ()=> {
            const categorySelect = wrapper.find('[aria-label="category"]')
            categorySelect.setValue("9")
            expect(wrapper.vm.category).toBe("9")
        }
        )

    })
})