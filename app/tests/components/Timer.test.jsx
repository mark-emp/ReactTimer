var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Timer = require('Timer');

describe('Timer', () => {
  it('should exist', () => {
    expect(Timer).toExist();
  });
  describe('handleStatusChange', () => {
    it('should render timer with initial count of 0 and status stopped', () => {
      var timer = TestUtils.renderIntoDocument(<Timer/>);
      expect(timer.state.count).toBe(0);
      expect(timer.state.timerStatus).toBe('stopped');
    });
    it('should set state to started and begin to count', (done) => {
      var timer = TestUtils.renderIntoDocument(<Timer/>);
      timer.handleStatusChange('started');
      expect(timer.state.timerStatus).toBe('started');
      setTimeout(() => {
        expect(timer.state.count).toBe(2);
        done();
      }, 2001);
    });
    it('should retain count when paused', (done) => {
      var timer = TestUtils.renderIntoDocument(<Timer/>);
      timer.handleStatusChange('started');
      setTimeout(() => {
        timer.handleStatusChange('paused');
        expect(timer.state.timerStatus).toBe('paused');
        expect(timer.state.count).toBe(3)
        done();
      }, 3001);
    });
    it('should reset the count to zero when stopped', (done) => {
      var timer = TestUtils.renderIntoDocument(<Timer/>);
      timer.handleStatusChange('started');
      setTimeout(() => {
        timer.handleStatusChange('stopped');
        expect(timer.state.timerStatus).toBe('stopped');
        expect(timer.state.count).toBe(0);
        done()
      }, 1001)
    })
  });
});
