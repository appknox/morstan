import Vue from 'vue';
import { config, mount, shallowMount, createLocalVue } from '@vue/test-utils';
import sinon from 'sinon';
import DeviceConnect from '@/components/DeviceConnect.vue';

config.logModifiedComponents = false;

describe('DeviceConnect.vue', () => {

  it('disables connect button when url or token are invalid', () => {
    const wrapper = mount(DeviceConnect);

    let urlInput = wrapper.find('input[name="url"]');
    urlInput.setValue('');
    let tokenInput = wrapper.find('input[name="token"]');
    tokenInput.setValue('');
    let btn = wrapper.find('.deviceconnect__button');
    expect(btn.attributes('disabled')).toBe('disabled');

    urlInput = wrapper.find('input[name="url"]');
    urlInput.setValue('');
    tokenInput = wrapper.find('input[name="token"]');
    tokenInput.setValue('1234');
    btn = wrapper.find('.deviceconnect__button');
    expect(btn.attributes('disabled')).toBe('disabled');

    urlInput = wrapper.find('input[name="url"]');
    urlInput.setValue('1.2.3.4');
    tokenInput = wrapper.find('input[name="token"]');
    tokenInput.setValue('');
    btn = wrapper.find('.deviceconnect__button');
    expect(btn.attributes('disabled')).toBe('disabled');
  });

  it('enables connect button when url & token are valid', () => {
    const wrapper = mount(DeviceConnect);

    const urlInput = wrapper.find('input[name="url"]');
    urlInput.setValue('http://localhost:3000');
    const tokenInput = wrapper.find('input[name="token"]');
    tokenInput.setValue('token123');
    const btn = wrapper.find('.deviceconnect__button');
    expect(btn.attributes('disabled')).toBe(undefined);
  });

  it('calls getStatus on connect button click', () => {
    const wrapper = shallowMount(DeviceConnect);

    const urlInput = wrapper.find('input[name="url"]');
    urlInput.setValue('http://localhost:3000');
    const tokenInput = wrapper.find('input[name="token"]');
    tokenInput.setValue('token123');

    const btn = wrapper.find('.deviceconnect__button');
    btn.trigger('click');

    const getStatusStub = sinon.stub();
    wrapper.setMethods({ getStatus: getStatusStub });
    btn.trigger('click');
    expect(getStatusStub.called).toBe(true);
  });

});
