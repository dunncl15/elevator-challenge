export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.floorsTraversed = 0;
    this.stops = 0;
    this.requests = [];
    this.riders = [];
    this.motionStatus = 'idle';
  }

  goToFloor(rider) {
    this.requests.push(rider);
    this.riders.push(rider);
    this.motionStatus = 'moving';
  }

  getFloorsTraversed(request) {
    const { pickUpFloor, dropOffFloor } = request;
    this.floorsTraversed = Math.abs(this.currentFloor - pickUpFloor) + Math.abs(pickUpFloor - dropOffFloor);
    this.currentFloor = dropOffFloor
    this.motionStatus = 'idle';
    this.removeRequest(request);
  }

  dropOffRider(rider) {
    this.riders = this.riders.filter(rider => rider !== rider);
    this.checkTime(rider.dropOffFloor, rider.time)
  }

  removeRequest(request) {
    this.requests = this.requests.filter(request => request !== request)
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

  checkTime(dropOffFloor, time) {
    if (time < 12 && !this.riders.length) {
      this.stops++;
      this.floorsTraversed = this.floorsTraversed + dropOffFloor;
      return this.currentFloor = 0;
    }
    return this.currentFloor;
  }

  reset() {
    this.constructor();
  }

}
