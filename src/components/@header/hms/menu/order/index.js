import Component from "/src/components/";

export default class Order extends Component {
    id = "Order";

    items = [
        { id: 'cmms', text: 'CMMS' },
        { id: 'works-order', text: 'Works Order' },
    ];

    route = window.router.reactive;

    activating = null;

    async init() {
        await super.init();
        this.$watchRouteUrl(this.route.url);
    }

    $watchRouteUrl(url) {
        this.activating = ['cmms', 'works-order'].includes(url) ? url : null;
    }

    get meta() {
        return import.meta;
    }
}
