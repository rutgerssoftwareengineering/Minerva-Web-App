import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Login from '../Login';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';


Enzyme.configure({ adapter: new Adapter() });

describe('Login component', () => {
    test('renders', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.exists()).toBe(true);
    });

    test(' button should submit credentials for review', async () => {
        const loginComponent = mount(<Login />);
        loginComponent.find('form').simulate('submit');

    });

    test(' sign in should fail if no credentials are provided', () => {
            const fakeEvent = { preventDefault: () => console.log('preventDefault') };
            const loginComponent = shallow(<Login />);
            expect(loginComponent.find('text').length).toBe(0);
            loginComponent.find('form').simulate('submit', fakeEvent);
            expect(loginComponent.contains(<h3>Login</h3>)).toBeTruthy();
    });
});