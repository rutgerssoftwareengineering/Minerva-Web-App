import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import NavBar from '../student/containers/NavBar';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('Login component', () => {
    test('renders', () => {
        const wrapper = shallow(<NavBar />);
        expect(wrapper.exists()).toBe(true);
    });
    test('sidebar exists', () => {
            const navBar = shallow(<NavBar />);
            expect((navBar.find('NavLink')).exists()).toBeTruthy()
    });
    test('5 buttons exist on sidebar', () => {
            const navBar = shallow(<NavBar />);
            expect((navBar.find({to:'/forum'}).exists())).toBeTruthy()
    });
});