import Page from "/src/pages/";
import CardComponent from "/src/components/card/";

export default class HomePage extends Page {
    id = "homeData";
    count = 0;
    time = "";

    async init() {
        super.init();
        await this.setChildren({
            card1: new CardComponent(this.$refs.card1Container),
            card2: new CardComponent(this.$refs.card2Container),
        });
        this.updateTime();
    }

    increment() {
        this.count++;
    }

    decrement() {
        this.count--;
    }

    updateTime() {
        this.time = new Date().toLocaleTimeString();
    }

    toggleCard1() {
        this.children.card1.toggle();
    }

    get meta() {
        return import.meta;
    }

    get importCSS() {
        return ["./index.css"];
    }
}
