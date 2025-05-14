import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Result from '../src/components/Result.vue'


describe('Result Component', ()=> {
    let mockChoices = [
        { question: 'What is the capital of France?', correct_answer: 'Paris', selectedAnswer: 'Paris' },
        { question: 'What is 2 + 2?', correct_answer: '4', selectedAnswer: '3' },
        { question: 'What is the capital of Spain?', correct_answer: 'Madrid', selectedAnswer: 'Madrid' },]

    let mockScore = 2
    let mockQuestions = [
        { question: 'What is the capital of France?', correct_answer: 'Paris', answers: ['London', 'Berlin', 'Madrid'] },
        { question: 'What is 2 + 2?', correct_answer: '4', answers: ['3', '5', '6'] },
        { question: 'What is the capital of Spain?', correct_answer: 'Madrid', answers: ['Barcelona', 'Valencia', 'Seville'] },
    ]

    let wrapper

    const createWrapper = (props = {})=> {
        return mount(Result,  {
            props: {
                score: mockScore,
                choices: mockChoices,
                questions: mockQuestions,
                ...props

            }
        })
    }

    beforeEach(() => {
        wrapper = createWrapper()
    })


        it('should render score correctly',()=> {
            expect(wrapper.text()).toContain("Your Score is : 2/3")
        } )

        it('should emit "reset-quiz" when reset button is clicked', async ()=> {
            await wrapper.find('button.reset-btn').trigger("click")

            expect(wrapper.emitted('reset-quiz')).toBeTruthy()
        } )

        it('should emit "start-new-quiz" when  start new quiz button is clicked', async ()=> {
            await wrapper.find('button.start-btn').trigger("click")

            expect(wrapper.emitted('start-new-quiz')).toBeTruthy()

        } )

        it('should show the correct/icorrect answers correctly', ()=> {
            const correctAnswers = wrapper.findAll('p.correct-ans')
            console.log("correctAnswers",correctAnswers)
            const incorrectAnswers = wrapper.findAll('p').filter((p)=>{return p.text().includes('Incorrect')})

            expect(correctAnswers.length).toBe(2);
            expect(incorrectAnswers.length).toBe(1)
        })

        it('should passes the correct percentage to progressbar', ()=> {
            const progressbar = wrapper.findComponent({name: 'ProgressBar'})
            expect(progressbar.exists()).toBe(true)
            expect(progressbar.props('progressPercentage')).toBe('67%')
        })


})