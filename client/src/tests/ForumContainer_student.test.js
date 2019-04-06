import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import ForumContainer from '../student/containers/ForumContainer';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
/*import Cookies from 'universal-cookie';
const cookies = new Cookies({ data: [ {members: ['user'] } ]});
cookies.set('userId', {}, { path: '/' });*/
Enzyme.configure({ adapter: new Adapter() });

describe('Forum container component for student page', () => {
    test('renders', () => {
        const wrapper = shallow(<ForumContainer />);
        expect(wrapper.exists()).toBe(true);
    });
    /*test('button exists', () => {
            const forumCont = shallow(<ForumContainer />);
            expect((forumCont.find({className:'forum'}).exists())).toBeTruthy()
    });*/
});