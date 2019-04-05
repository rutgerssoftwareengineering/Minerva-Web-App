import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Main from '../Main';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('Login component', () => {
    test('renders', () => {
        const wrapper = shallow(<Main />);
        expect(wrapper.exists()).toBe(true);
    });
    test('button exists', () => {
            const loginComponent = shallow(<Main />);
            expect((loginComponent.find('button')).exists()).toBeTruthy()
    });
});