
import { expect, describe, it, beforeEach } from "vitest";
import {mount} from '@vue/test-utils';
import ConfigurateQuizView from '../src/views/ConfigurateQuizView.vue'
import { createRouter, createMemoryHistory } from 'vue-router';
import { routes } from '../src/router/index.ts';
import { createPinia } from 'pinia';


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


    it('should display the correctly the pseudo',()=>{
        expect(wrapper.find('[aria-label="pseudo"').exists()).toBe(true)
    })
})