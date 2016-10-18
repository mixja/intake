import * as Utils from 'utils/http'
import Immutable from 'immutable'
import PersonEditPage from 'PersonEditPage'
import React from 'react'
import {mount} from 'enzyme'

describe('PersonEditPage', () => {
  beforeEach(() => {
    const xhrSpyObject = jasmine.createSpyObj('xhrSpyObj', ['done'])
    spyOn(Utils, 'request').and.returnValue(xhrSpyObject)
  })

  describe('render', () => {
    it('renders the card header', () => {
      const props = { params: { id: 1 } }
      const wrapper = mount(<PersonEditPage {...props} />)
      expect(wrapper.find('.card-header').text()).toEqual('Edit Person')
    })

    it('renders the person label fields', () => {
      const props = { params: { id: 1 } }
      const wrapper = mount(<PersonEditPage {...props} />)
      expect(wrapper.find('label').length).toEqual(9)
      expect(wrapper.find('label').nodes.map((element) => element.textContent)).toEqual([
        'First Name',
        'Last Name',
        'Gender',
        'Date of birth',
        'Social security number',
        'Address',
        'City',
        'State',
        'Zip'
      ])
    })

    it('renders the person input fields', () => {
      const props = { params: { id: 1 } }
      const wrapper = mount(<PersonEditPage {...props} />)
      wrapper.setState({
        person: Immutable.fromJS({
          first_name: 'Kevin',
          last_name: 'McCallister',
          gender: 'male',
          date_of_birth: '11/16/1990',
          ssn: '111223333',
          address: {
            street_address:'671 Lincoln Avenue',
            city:'Winnetka',
            state: 'IL',
            zip: 60093,
          },
        }),
      })

      expect(wrapper.find('#first_name').props().value).toEqual('Kevin')
      expect(wrapper.find('#last_name').props().value).toEqual('McCallister')
      expect(wrapper.find('#gender').props().value).toEqual('male')
      expect(wrapper.find('#date_of_birth').props().value).toEqual('11/16/1990')
      expect(wrapper.find('#ssn').props().value).toEqual('111223333')
      expect(wrapper.find('#street_address').props().value).toEqual('671 Lincoln Avenue')
      expect(wrapper.find('#city').props().value).toEqual('Winnetka')
      expect(wrapper.find('#state').props().value).toEqual('IL')
      expect(wrapper.find('#zip').props().value).toEqual(60093)
    })

    it('renders the save and cancel buttons', () => {
      const props = { params: { id: 1 } }
      const wrapper = mount(<PersonEditPage {...props} />)
      expect(wrapper.find('button.btn-primary').text()).toEqual('Save')
      expect(wrapper.find('button.btn-default').text()).toEqual('Cancel')
    })
  })

  describe('fetch', () => {
    it('GETs the person data to the server', () => {
      const props = { params: { id: 1 } }
      const wrapper = mount(<PersonEditPage {...props} />)
      wrapper.instance().fetch()
      expect(Utils.request).toHaveBeenCalled()
      expect(Utils.request.calls.argsFor(0)[0]).toEqual('GET')
      expect(Utils.request.calls.argsFor(0)[1]).toEqual('/people/1.json')
    })
  })
})

