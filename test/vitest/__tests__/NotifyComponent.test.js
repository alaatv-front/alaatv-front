import { Notify } from 'quasar'
import { mount } from '@vue/test-utils'
// eslint-disable-next-line
import { describe, expect, it, vi } from 'vitest'
import NotifyComponent from './demo/NotifyComponent.vue'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'

installQuasarPlugin({ plugins: { Notify } })

describe('notify example', () => {
  it('should call notify on click', async () => {
    expect(NotifyComponent).toBeTruthy()

    const wrapper = mount(NotifyComponent, {})
    const spy = vi.spyOn(Notify, 'create')
    expect(spy).not.toHaveBeenCalled()
    wrapper.trigger('click')
    expect(spy).toHaveBeenCalled()
  })
})
