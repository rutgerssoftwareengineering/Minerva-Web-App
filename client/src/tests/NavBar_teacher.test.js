import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import NavBar from '../teacher/containers/NavBar';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Cookies from 'universal-cookie';
const cookies = new Cookies({ data: [ {members: ['user'] } ]});
cookies.set('gradeInfo', {}, { path: '/' });
Enzyme.configure({ adapter: new Adapter() });

describe('NavBar component for teacher page', () => {
    test('renders', () => {
        const wrapper = shallow(<NavBar />);
        expect(wrapper.exists()).toBe(true);
    });
    test('sidebar exists', () => {
            const navBar = shallow(<NavBar />);
            expect((navBar.find('NavLink')).exists()).toBeTruthy()
    });
    test('link to /forum exists', () => {
            const navBar = shallow(<NavBar />);
            expect((navBar.find({to:'/forum'}).exists())).toBeTruthy()
    });
    test('link to /quizzes exists', () => {
            const navBar = shallow(<NavBar />);
            expect((navBar.find({to:'/quizzes'}).exists())).toBeTruthy()
    });
    test('link to /announcements exists', () => {
            const navBar = shallow(<NavBar />);
            expect((navBar.find({to:'/announcements/view'}).exists())).toBeTruthy()
    });
    test('link to /home exists', () => {
        const navBar = shallow(<NavBar />);
        expect((navBar.find({to:'/home'}).exists())).toBeTruthy()
    });
    test('logout exists', () => {
        const navBar = shallow(<NavBar />);
        expect((navBar.find({to:'/home'}).exists())).toBeTruthy()
    });
});