import _ from "lodash";
import axios from "axios";

import Page from "/src/pages/";
import ModalComponent from "/src/components/modal/";

export default class ContactPage extends Page {
    id = "contactData";
    message = "";
    submitted = false;

    async init() {
        super.init();
        this.message = _.capitalize("hello from contact");
        await this.setChildren({
            modal1: new ModalComponent(this.$refs.modal1Container),
            modal2: new ModalComponent(this.$refs.modal2Container),
        });
        this.children.modal1.setContent("Modal 1");
        this.children.modal2.setContent("Modal 2");
        this.message = await axios
            .get("https://jsonplaceholder.typicode.com/posts/1")
            .then((res) => res.data.title);
        this.ready = true;
    }

    submit() {
        if (this.message.trim()) {
            this.submitted = true;
            _.delay(() => {
                this.submitted = false;
                this.message = "";
            }, 2000);
        }
    }

    openModal1() {
        this.children.modal1.open();
    }

    openModal2() {
        this.children.modal2.open();
    }

    get meta() {
        return import.meta;
    }
}
