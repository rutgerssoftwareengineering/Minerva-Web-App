import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import GradesContainer, {Tree} from '../containers/gradebook/GradesContainer';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Cookies from 'universal-cookie'
const cookies = new Cookies({ data: [ {members: ['user'] } ]});
cookies.set('gradeInfo', {}, { path: '/' });
cookies.HAS_DOCUMENT_COOKIE = false
Enzyme.configure({ adapter: new Adapter() });

describe('Login component', () => {
    test('renders', () => {
        const wrapper = shallow(<GradesContainer />);
        expect(wrapper.exists()).toBe(true);
    });
    test('Tree exists with no grade data', () => {
            const loginComponent = shallow(<GradesContainer />);
            expect((loginComponent.find({name:'Classes'})).exists()).toBeTruthy()
    });

});