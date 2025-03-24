import Alpine from "alpinejs";

export default class Store {
    get name() {
        throw new Error("Store name not defined");
    }

    get data() {
        throw new Error("Store data not defined");
    }

    get isPersisted() {
        return false;
    }

    constructor() {
        this.reset();
    }

    reset(force = false) {
        if (this.isPersisted) {
            if (force || this.get() === null) {
                localStorage.setItem(
                    this.name,
                    typeof this.data === "object" ? JSON.stringify(this.data) : this.data,
                );
            }
        } else {
            Alpine.store(this.name, this.data);
        }
    }

    set(key, value) {
        const data = this.get(null);
        data[key] = value;
        if (this.isPersisted) {
            localStorage.setItem(
                this.name,
                typeof this.data === "object" ? JSON.stringify(data) : data,
            );
        } else {
            Alpine.store(this.name, data);
        }
    }

    get(key = null) {
        let data;
        if (this.isPersisted) {
            data =
                typeof this.data === "object"
                    ? JSON.parse(localStorage.getItem(this.name))
                    : localStorage.getItem(this.name);
        } else {
            data = Alpine.store(this.name);
        }
        return key ? data[key] : data;
    }
}
