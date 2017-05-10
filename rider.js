export default class Rider {
  constructor({ name, pickUpFloor, dropOffFloor, time }) {
    this.name = name || '';
    this.pickUpFloor = pickUpFloor || null;
    this.dropOffFloor = dropOffFloor || null;
    this.time = time || this.getCurrentTime();
  }

  getCurrentTime() {
    let date = new Date().toString();
    return parseFloat(date.slice(16, 21).replace(':', '.'));
  }
}
