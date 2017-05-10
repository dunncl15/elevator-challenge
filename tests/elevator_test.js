require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});
const assert = require('assert')

const Elevator = require('../elevator').default;
const Rider = require('../rider').default;

describe('Elevator', function() {
  let elevator = new Elevator();

  afterEach(function() {
    elevator.reset();
  });

  it('should bring a rider to a floor above their current floor', () => {
    const rider = new Rider({ name: "Brittany", pickUpFloor: 2, dropOffFloor: 5, time: 14.00 });

    elevator.goToFloor(rider);
    assert.equal(elevator.motionStatus, 'moving');
    assert.deepEqual(elevator.getStops(), [2, 5]);
    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.motionStatus, 'idle')

    elevator.dropOffRider(rider);
    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.floorsTraversed, 5);
  });

  it('should bring a rider to a floor below their current floor', () => {
    const rider = new Rider({ name: "Brittany", pickUpFloor: 8, dropOffFloor: 3, time: 14.00 });

    elevator.goToFloor(rider);
    assert.equal(elevator.motionStatus, 'moving');
    assert.deepEqual(elevator.getStops(), [8, 3]);
    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.motionStatus, 'idle');

    elevator.dropOffRider(rider);
    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.floorsTraversed, 13);
  });

  it('should track the number of floors traversed when currentFloor is lower than drop off floor', () => {
    const rider = new Rider({ name: "Brittany", pickUpFloor: 2, dropOffFloor: 5, time: 14.00 });

    elevator.goToFloor(rider);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.equal(elevator.motionStatus, 'moving');
    assert.deepEqual(elevator.getStops(), [2, 5]);
    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.motionStatus, 'idle');

    elevator.dropOffRider(rider);
    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.floorsTraversed, 5);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)
  })

  it('should track the number of floors traversed when currentFloor is higher than dropOffFloor', () => {
    const rider = new Rider({ name: "Brittany", pickUpFloor: 8, dropOffFloor: 3, time: 14.00 });

    elevator.goToFloor(rider);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.equal(elevator.motionStatus, 'moving');
    assert.deepEqual(elevator.getStops(), [8, 3]);
    assert.equal(elevator.motionStatus, 'idle');

    elevator.dropOffRider(rider);
    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.floorsTraversed, 13);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)

  })

  it('should take Rider 1 up and Rider 2 up', () => {
    const rider1 = new Rider({ name: "Bob", pickUpFloor: 3, dropOffFloor: 9, time: 14 });
    const rider2 = new Rider({ name: "Sue", pickUpFloor: 4, dropOffFloor: 11, time: 14 });

    elevator.goToFloor(rider1);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.deepEqual(elevator.getStops(), [3, 9]);
    assert.equal(elevator.stops, 1)

    elevator.dropOffRider(rider1);
    assert.equal(elevator.stops, 2)
    assert.equal(elevator.floorsTraversed, 9);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)

    elevator.goToFloor(rider2);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.deepEqual(elevator.getStops(), [4, 11]);
    assert.equal(elevator.stops, 3)

    elevator.dropOffRider(rider2);
    assert.equal(elevator.stops, 4)
    assert.equal(elevator.floorsTraversed, 12);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)

  })

  it('should take Rider 1 up and Rider 2 down', () => {
    const rider1 = new Rider({ name: "Bob", pickUpFloor: 3, dropOffFloor: 9, time: 14 });
    const rider2 = new Rider({ name: "Sue", pickUpFloor: 6, dropOffFloor: 2, time: 14 });

    elevator.goToFloor(rider1);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.deepEqual(elevator.getStops(), [3, 9]);
    assert.equal(elevator.stops, 1)

    elevator.dropOffRider(rider1);
    assert.equal(elevator.stops, 2)
    assert.equal(elevator.floorsTraversed, 9);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)

    elevator.goToFloor(rider2);
    assert.equal(elevator.stops, 3)
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.deepEqual(elevator.getStops(), [6, 2]);

    elevator.dropOffRider(rider2);
    assert.equal(elevator.stops, 4)
    assert.equal(elevator.floorsTraversed, 7)
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)
  });

  it('should take Rider 1 down and Rider 2 up', () => {
    const rider1 = new Rider({ name: "Bob", pickUpFloor: 10, dropOffFloor: 4, time: 14.00 });
    const rider2 = new Rider({ name: "Sue", pickUpFloor: 6, dropOffFloor: 13, time: 14.00 });

    elevator.goToFloor(rider1);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.deepEqual(elevator.getStops(), [10, 4]);
    assert.equal(elevator.stops, 1)

    elevator.dropOffRider(rider1);
    assert.equal(elevator.stops, 2)
    assert.equal(elevator.floorsTraversed, 16);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)

    elevator.goToFloor(rider2);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.deepEqual(elevator.getStops(), [6, 13]);
    assert.equal(elevator.stops, 3)

    elevator.dropOffRider(rider2);
    assert.equal(elevator.stops, 4)
    assert.equal(elevator.floorsTraversed, 9)
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)
  })

  it('should take Rider 1 down and Rider 2 down', () => {
    const rider1 = new Rider({ name: "Bob", pickUpFloor: 10, dropOffFloor: 4, time: 14.00 });
    const rider2 = new Rider({ name: "Sue", pickUpFloor: 15, dropOffFloor: 5, time: 14.00 });

    elevator.goToFloor(rider1);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.deepEqual(elevator.getStops(), [10, 4]);
    assert.equal(elevator.stops, 1)

    elevator.dropOffRider(rider1);
    assert.equal(elevator.stops, 2)
    assert.equal(elevator.floorsTraversed, 16);
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)

    elevator.goToFloor(rider2);
    assert.equal(elevator.riders.length, 1)
    assert.equal(elevator.requests.length, 1)
    assert.deepEqual(elevator.getStops(), [15, 5]);
    assert.equal(elevator.stops, 3)

    elevator.dropOffRider(rider2);
    assert.equal(elevator.stops, 4)
    assert.equal(elevator.floorsTraversed, 21)
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.requests.length, 0)
  })

  it('should return to floor 0 when there are no riders and current time is before 12:00 p.m.', () => {
    const rider = new Rider({ name: "Brittany", pickUpFloor: 2, dropOffFloor: 5, time: 6.00 });

    elevator.goToFloor(rider);
    assert.equal(elevator.stops, 1)
    assert.deepEqual(elevator.getStops(), [2, 5]);
    assert.equal(elevator.currentFloor, 5);

    elevator.dropOffRider(rider);
    assert.equal(elevator.floorsTraversed, 10);
    assert.equal(elevator.currentFloor, 0);
    assert.equal(elevator.stops, 3)
  })

  it('should stay at the dropoff floor when there are no riders and the current time is after 12:00 p.m.', () => {
    const rider = new Rider({ name: "Robbie", pickUpFloor: 2, dropOffFloor: 5, time: 18.00 });

    elevator.goToFloor(rider);
    assert.deepEqual(elevator.getStops(), [2, 5]);
    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.stops, 1)

    elevator.dropOffRider(rider);
    assert.equal(elevator.floorsTraversed, 5);
    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.stops, 2)
  })

});
