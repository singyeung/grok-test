import Component from "/src/components/";

export default class Boards extends Component {
    id = "Boards";

    route = window.router.reactive;

    isActive = false;

    init() {
        super.init();
        this.$watchRouteUrl(this.route.url);
    }

    $watchRouteUrl(url) {
        this.isActive = url === "";
    }

    get meta() {
        return import.meta;
    }
}
