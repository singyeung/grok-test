import { get } from "/src/utils/api/";

import Page from "/src/pages/";
import FragmentA from "./fragment-a/";

export default class AboutPage extends Page {
    id = "aboutData";
    userName = "";

    counting = 1;

    async init() {
        super.init();
        await this.setChildren({
            fragmentA: new FragmentA(this.$refs.fragmentA),
        });

        this.ready = true;

        this.refresh();
    }

    refresh() {
        get(
            `https://jsonplaceholder.typicode.com/users/${this.counting++}`,
        ).then(({ name }) => {
            this.userName = name;
        });
    }

    toggleSection() {
        this.children.fragmentA.toggle();
    }

    get meta() {
        return import.meta;
    }
}
