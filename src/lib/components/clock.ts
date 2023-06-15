export class Clock {
    start_time: number = 0;

    constructor() {
        this.start_time = 0
    }

    reset_time() {
        this.start_time = 0
    }

    start() {
        this.start_time = Date.now()
    }

    current_time(): number {
        if (this.start_time == 0) return 0
        return Date.now() - this.start_time
    }
}