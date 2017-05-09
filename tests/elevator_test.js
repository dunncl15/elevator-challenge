require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});
const assert = require('assert')

const Elevator = require('../elevator').default;

describe('Elevator', function() {
  let elevator = new Elevator();

  afterEach(function() {
    elevator.reset();
  });

  it('should bring a rider to a floor above their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [2, 5]);
  });

  it('should bring a rider to a floor below their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 8, dropOffFloor: 3 };
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [8, 3]);
  });

  it.only('should track the number of floors traversed when currentFloor is lower than drop off floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };
    elevator.goToFloor(mockUser);
    assert.deepEqual(elevator.getStops(), [2, 5]);
    assert.equal(elevator.floorsTraversed, 5);
  })

  it('should track the number of floors traversed when currentFloor is higher than dropOffFloor', () => {
    let mockUser = { name: "Brittany", currentFloor: 8, dropOffFloor: 3 };
    elevator.goToFloor(mockUser);
    assert.deepEqual(elevator.getStops(), [8, 3]);
    assert.equal(elevator.floorsTraversed, 13);
  })

  it('should drop off multiple riders in order of request', () => {
    let mockUser1 = { name: "Bob", currentFloor: 3, dropOffFloor: 9 };
    let mockUser2 = { name: "Sue", currentFloor: 6, dropOffFloor: 2 };

    elevator.goToFloor(mockUser1);
    assert.deepEqual(elevator.getStops(), [3, 9]);
    assert.equal(elevator.floorsTraversed, 12);
    assert.equal(elevator.currentFloor, 9);

    elevator.goToFloor(mockUser2);
    assert.deepEqual(elevator.getStops(), [6, 2]);
    assert.equal(elevator.floorsTraversed, 7)
    assert.equal(elevator.currentFloor, 2);
  })
});
