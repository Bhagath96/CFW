import React from 'react'
import Test from './Test';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure,mount } from 'enzyme';
configure({adapter: new Adapter()});
describe('Test component', () => {
    it('Should render test component', () => {
        const component = shallow(<Test/>)
        console.log(component.debug());
        expect(component.exists()).toBe(true);
    }); 
});
describe('with valid inputs', () => {
  it('calls the onsubmit function', () => {
      const mockOnsubmit=jest.fn()
      const component = shallow(<Test/>)
    //   const {getByLabelText,getByRole} =shallow(<Test onSubmit={''}/>)
    //   component.find(getByLabelText("First Name")).simulate("change",{
    //       target:{value:"gopuck"}
    //   })

    let prevented=false
    component.simulate("handleSubmit",()=>({
     
        preventDefault:()=>({
            prevented:true
        })
    
    }))
    expect(prevented).toBe(true);
    
});
        it('should change the state after change the input value', () => {
            const newValue = 'testing component';
            const wrapper = mount(<Test />);
            console.log(wrapper.debug());
            const input = wrapper.find('input');
            input.simulate('change', { target: { value: newValue }});
            expect(wrapper.state().basicValue).toEqual(newValue);
         }); 
  
})
describe('with invalid firstName', () => {
    it.todo('renders the input validation error')
  
})
describe('with invalid Last name', () => {
    it.todo('renders the input validation error')
  
})

