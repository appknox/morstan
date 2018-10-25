import { shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
import DeviceStatus from '@/components/DeviceStatus.vue';


describe('DeviceStatus.vue', () => {

  it('renders device status table when platform props are given', () => {
    const platform = 'Android';
    const platformVersion = '8.1';

    const wrapper = shallowMount(DeviceStatus, {
      propsData: { platform, platformVersion },
    });

    const tableContent = wrapper.find('.devicestatus');
    expect(tableContent.html()).toBe([
      '<div class=\"devicestatus\">',
      '<h3 class=\"devicestatus__title\">Device Information</h3> ',
      '<table class=\"devicestatus__table\"><tbody><tr>',
      '<td>Platform</td> <td>Android</td></tr> ',
      '<tr><td>Version</td> <td>8.1</td>',
      '</tr></tbody></table> ',
      '<!----></div>',
    ].join(''));
  });

  it('doesn\'t render vnc detail when vnc prop is not passed', () => {
    const wrapper = shallowMount(DeviceStatus, {
      propsData: {},
    });

    const vnc = wrapper.find('.devicestatus__vnc');
    expect(vnc.exists()).toBe(false);
  });

  it('renders vnc detail when vnc prop is passed', () => {
    const wrapper = shallowMount(DeviceStatus, {
      propsData: {
        vnc: {
          is_running: true,
        },
      },
    });

    const vnc = wrapper.find('.devicestatus__vnc');
    expect(vnc.exists()).toBe(true);
  });

});
