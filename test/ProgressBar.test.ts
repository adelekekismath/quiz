import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ProgressBar from '../src/components/ProgressBar.vue'


describe('ProgressBar Component', () => {
    const mockProgressPercentage = "50%"

    let wrapper

    const createWrapper = (props={}) => {
        return mount (ProgressBar, {
            props: {
                progressPercentage: mockProgressPercentage
            }
        })
    }

    beforeEach(()=> {
        wrapper = createWrapper()
    })

    describe('Initial Rendering', () => {
        it('should display the correct progress width', () => {
            const progressElement = wrapper.find('.progress')
            expect(progressElement.exists()).toBe(true)
            expect(progressElement.attributes('style')).toContain(`width: ${mockProgressPercentage}`)
        })

        it('should display the correct progress percentage text', () => {
            expect(wrapper.text()).toBe(mockProgressPercentage);
        })
    })

    describe('Dynamic rendering', ()=> {
        it('should change progress width on props change', async()  => {
            await wrapper.setProps({progressPercentage: '75%'})
            const progressElement = wrapper.find('.progress')
            expect(progressElement.exists()).toBe(true)
            expect(progressElement.attributes('style')).toContain(`width: ${75}%;`)

        })
        it('should display the correct progress percentage text', async() => {
            await wrapper.setProps({progressPercentage: 75})
            expect(wrapper.text()).toBe('75');
        })
    })
} )