import {describe, it, expect, beforeEach, vi} from 'vitest';
import {mount} from '@vue/test-utils';
import HomeView from '../src/views/HomeView.vue';
import {routes} from '../src/router/index.ts';
import { createRouter, createMemoryHistory } from 'vue-router';


describe('Home View', () => {

    let router 

    beforeEach(async ()=>{
        router = createRouter({
            history: createMemoryHistory(),
            routes
        })

        router.push('/')
        await router.isReady()
    })

    it('should go to configurate page when clicked on start quiz btn', async () =>{
        const mockPush = vi.fn();
        router.push = mockPush;
        const wrapper = mount(HomeView, {
            global: {
                plugins: [router]
            }
        });

        const link = wrapper.findComponent({name: 'RouterLink'})
        expect(link.exists()).toBe(true)
        expect(link.props('to')).toBe('/configurate-quiz')

    })

    
})