import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import StudentApp from '../student/containers/StudentApp';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import "isomorphic-fetch";
/*import Cookies from 'universal-cookie';
const cookies = new Cookies({ data: [ {members: ['user'] } ]});
cookies.set('userId', {}, { path: '/' });*/
Enzyme.configure({ adapter: new Adapter() });

describe('Student App component', () => {
    test('renders', () => {
        const wrapper = shallow(<StudentApp />);
        expect(wrapper.exists()).toBe(true);
    });
    test('Router exists', () => {
            const studentApp = shallow(<StudentApp />);
            expect((studentApp.find('Router').exists())).toBeTruthy()
    });
});