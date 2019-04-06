import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Home from '../teacher/containers/Home';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import "isomorphic-fetch";
import Cookies from 'universal-cookie';
const cookies = new Cookies({ data: [ {members: ['user'] } ]});
cookies.set('gradeInfo', {}, { path: '/' });
Enzyme.configure({ adapter: new Adapter() });

describe('Home component for teacher page', () => {
    test('renders', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.exists()).toBe(true);
    });
});