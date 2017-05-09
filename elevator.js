export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.floorsTraversed = 0;
    this.direction = '';
    this.stops = 0;
    this.requests = [];
    this.riders = [];
    this.motionStatus = 'idle';
  }

  goToFloor(rider) {
    const { name, pickUpFloor, dropOffFloor } = rider;
    this.requests.push({ pickUpFloor, dropOffFloor });
    this.riders.push({ name });
    this.motionStatus = 'moving';
  }

  getFloorsTraversed(request) {
    const { pickUpFloor, dropOffFloor } = request;
    this.floorsTraversed = Math.abs(this.currentFloor - pickUpFloor) + Math.abs(pickUpFloor - dropOffFloor)
    this.currentFloor = dropOffFloor;
    this.motionStatus = 'idle';
    this.removeRequest(request)
  }

  dropOffRider(rider) {
    return this.riders = this.riders.filter(rider => rider !== rider)
  }

  removeRequest(request) {
    return this.requests = this.requests.filter(request => request !== request)
  }

  getStops() {
    return this.requests.reduce((acc, request) => {
      acc = [];
      this.getFloorsTraversed(request)
      acc.push(request.pickUpFloor, request.dropOffFloor)
      this.stops++;
      return acc;
    }, []);
  }

  reset() {
    this.constructor();
  }

}
