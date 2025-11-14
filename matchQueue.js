// Simple FIFO matching queue with partner tracking
export class MatchQueue {
  constructor() {
    this.queue = []; // waiting socket ids
    this.partnerMap = new Map(); // socketId -> partnerId
  }

  enqueue(id) {
    if (!id) return;
    if (this.partnerMap.has(id)) return;
    if (!this.queue.includes(id)) this.queue.push(id);
  }

  dequeuePair() {
    if (this.queue.length >= 2) {
      const a = this.queue.shift();
      const b = this.queue.shift();
      this.partnerMap.set(a, b);
      this.partnerMap.set(b, a);
      return [a, b];
    }
    return null;
  }

  getPartner(id) {
    return this.partnerMap.get(id) || null;
  }

  breakPair(id) {
    const partner = this.partnerMap.get(id);
    if (partner) {
      this.partnerMap.delete(id);
      this.partnerMap.delete(partner);
    }
    return partner || null;
  }

  remove(id) {
    this.queue = this.queue.filter(x => x !== id);
    return this.breakPair(id);
  }

  isQueued(id) {
    return this.queue.includes(id);
  }
}
