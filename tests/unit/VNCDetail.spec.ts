import { shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
import VNCDetail from '@/components/VNCDetail.vue';


describe('VNCDetail.vue', () => {

  it('renders error container when props.isRunning is false', () => {
    const isRunning = false;
    const wrapper = shallowMount(VNCDetail, {
      propsData: { isRunning },
    });

    const vncdetail = wrapper.find('.vncdetail');
    expect(vncdetail.classes()).toContain('vncdetail--error');

    const state = wrapper.find('.vncdetail__state');
    expect(state.text()).toBe('Not Running');
  });

  it('renders success container when props.isRunning is true', () => {
    const isRunning = true;
    const wrapper = shallowMount(VNCDetail, {
      propsData: { isRunning },
    });
    const vncdetail = wrapper.find('.vncdetail');
    expect(vncdetail.classes()).toContain('vncdetail--success');

    const state = wrapper.find('.vncdetail__state');
    expect(state.text()).toBe('Running');
  });

  it('calls restartVNC on bubtton click', () => {
    const wrapper = shallowMount(VNCDetail, {
      propsData: {},
    });

    const restartVNCStub = sinon.stub();
    wrapper.setMethods({ restartVNC: restartVNCStub });
    wrapper.find('.vncdetail__button').trigger('click');

    expect(restartVNCStub.called).toBe(true);
  });

});
