export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.previousFloor = null;
    this.floorsTraversed = 0;
    this.stops = 0;
    this.requests = [];
    this.riders = [];
    this.motionStatus = 'idle';
  }

  currentFloor() {
    return this.currentFloor;
  }

  goToFloor(rider) {
    this.requests.push(rider);
    this.currentFloor = rider.dropOffFloor;
    if(this.requests.length > 1) {
      this.previousFloor = this.requests[this.requests.length - 2].dropOffFloor;
    }
  }

  getFloorsTraversed(request) {
    const { currentFloor, dropOffFloor } = request;
    if (!this.previousFloor) {
      currentFloor > dropOffFloor ? currentFloor + Math.abs(currentFloor - dropOffFloor) : this.floorsTraversed = request.dropOffFloor
    } else {

    }
  }

  // getFloorsTraversed(request) {
  //   const { currentFloor, dropOffFloor } = request;
  //   if(this.previousFloor) {
  //     if (this.previousFloor > currentFloor && currentFloor > dropOffFloor) {
  //       this.floorsTraversed = (this.previousFloor - currentFloor) + (currentFloor - dropOffFloor);
  //     }
  //   } else if (currentFloor > dropOffFloor) {
  //     this.floorsTraversed = currentFloor + (currentFloor - dropOffFloor);
  //   } else {
  //     this.floorsTraversed = currentFloor + dropOffFloor;
  //   }
  // }

  getStops() {
    return this.requests.reduce((stops, request) => {
      stops = [];
      this.getFloorsTraversed(request)
      stops.push(request.currentFloor, request.dropOffFloor)
      return stops;
    }, []);
  }

  reset() {
    this.currentFloor = 0;
    this.previousFloor = null;
    this.floorsTraversed = 0;
    this.stops = 0;
    this.requests = [];
    this.riders = [];
    this.motionStatus = 'idle';
  }
}
