import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Home from '../teacher/containers/Home';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import "isomorphic-fetch";

Enzyme.configure({ adapter: new Adapter() });

describe('Login component', () => {
    test('renders', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.exists()).toBe(true);
    });
});