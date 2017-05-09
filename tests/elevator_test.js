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
    let mockUser = { name: "Brittany", pickUpFloor: 2, dropOffFloor: 5 };

    elevator.goToFloor(mockUser);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.equal(elevator.motionStatus, 'moving');
    assert.deepEqual(elevator.getStops(), [2, 5]);
    assert.equal(elevator.motionStatus, 'idle')
    assert.equal(elevator.floorsTraversed, 5);
    assert.equal(elevator.currentFloor, 5);

    elevator.dropOffRider(mockUser);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)
  });

  it('should bring a rider to a floor below their current floor', () => {
    let mockUser = { name: "Brittany", pickUpFloor: 8, dropOffFloor: 3 };

    elevator.goToFloor(mockUser);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.equal(elevator.motionStatus, 'moving');
    assert.deepEqual(elevator.getStops(), [8, 3]);
    assert.equal(elevator.motionStatus, 'idle');
    assert.equal(elevator.floorsTraversed, 13);
    assert.equal(elevator.currentFloor, 3);

    elevator.dropOffRider(mockUser);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)
  });

  it('should track the number of floors traversed when currentFloor is lower than drop off floor', () => {
    let mockUser = { name: "Brittany", pickUpFloor: 2, dropOffFloor: 5 };

    elevator.goToFloor(mockUser);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.equal(elevator.motionStatus, 'moving');
    assert.deepEqual(elevator.getStops(), [2, 5]);
    assert.equal(elevator.motionStatus, 'idle');
    assert.equal(elevator.floorsTraversed, 5);
    assert.equal(elevator.currentFloor, 5);

    elevator.dropOffRider(mockUser);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)
  })

  it('should track the number of floors traversed when currentFloor is higher than dropOffFloor', () => {
    let mockUser = { name: "Brittany", pickUpFloor: 8, dropOffFloor: 3 };

    elevator.goToFloor(mockUser);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.equal(elevator.motionStatus, 'moving');
    assert.deepEqual(elevator.getStops(), [8, 3]);
    assert.equal(elevator.motionStatus, 'idle');
    assert.equal(elevator.floorsTraversed, 13);
    assert.equal(elevator.currentFloor, 3);

    elevator.dropOffRider(mockUser);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)

  })

  it('should take Rider 1 up and Rider 2 up', () => {
    let mockUser1 = { name: "Bob", pickUpFloor: 3, dropOffFloor: 9 };
    let mockUser2 = { name: "Sue", pickUpFloor: 4, dropOffFloor: 11 };

    elevator.goToFloor(mockUser1);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.deepEqual(elevator.getStops(), [3, 9]);
    assert.equal(elevator.floorsTraversed, 9);
    assert.equal(elevator.stops, 1)

    elevator.dropOffRider(mockUser1);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)

    elevator.goToFloor(mockUser2);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.deepEqual(elevator.getStops(), [4, 11]);
    assert.equal(elevator.floorsTraversed, 12);
    assert.equal(elevator.stops, 2)

    elevator.dropOffRider(mockUser2);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)

  })

  it('should take Rider 1 up and Rider 2 down', () => {
    let mockUser1 = { name: "Bob", pickUpFloor: 3, dropOffFloor: 9 };
    let mockUser2 = { name: "Sue", pickUpFloor: 6, dropOffFloor: 2 };

    elevator.goToFloor(mockUser1);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.deepEqual(elevator.getStops(), [3, 9]);
    assert.equal(elevator.floorsTraversed, 9);
    assert.equal(elevator.stops, 1)

    elevator.dropOffRider(mockUser1);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)

    elevator.goToFloor(mockUser2);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.deepEqual(elevator.getStops(), [6, 2]);
    assert.equal(elevator.floorsTraversed, 7)
    assert.equal(elevator.stops, 2)

    elevator.dropOffRider(mockUser2);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)
  });

  it('should take Rider 1 down and Rider 2 up', () => {
    let mockUser1 = { name: "Bob", pickUpFloor: 10, dropOffFloor: 4 };
    let mockUser2 = { name: "Sue", pickUpFloor: 6, dropOffFloor: 13 };

    elevator.goToFloor(mockUser1);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.deepEqual(elevator.getStops(), [10, 4]);
    assert.equal(elevator.floorsTraversed, 16);
    assert.equal(elevator.stops, 1)

    elevator.dropOffRider(mockUser1);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)

    elevator.goToFloor(mockUser2);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.deepEqual(elevator.getStops(), [6, 13]);
    assert.equal(elevator.floorsTraversed, 9)
    assert.equal(elevator.stops, 2)

    elevator.dropOffRider(mockUser2);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)
  })

  it('should take Rider 1 down and Rider 2 down', () => {
    let mockUser1 = { name: "Bob", pickUpFloor: 10, dropOffFloor: 4 };
    let mockUser2 = { name: "Sue", pickUpFloor: 15, dropOffFloor: 5 };

    elevator.goToFloor(mockUser1);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.deepEqual(elevator.getStops(), [10, 4]);
    assert.equal(elevator.floorsTraversed, 16);
    assert.equal(elevator.stops, 1)

    elevator.dropOffRider(mockUser1);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)

    elevator.goToFloor(mockUser2);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.deepEqual(elevator.getStops(), [15, 5]);
    assert.equal(elevator.floorsTraversed, 21)
    assert.equal(elevator.stops, 2)

    elevator.dropOffRider(mockUser2);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)
  })

});
