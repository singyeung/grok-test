import agGrid from "ag-grid-enterprise";
import Component from "/src/components/";

export default class WorksOrderTable extends Component {
    id = "WorksOrderTable";

    styles = { height: "0", minHeight: "380px" };

    gridOptions = {
        rowData: [
            { make: "Tesla", model: "Model Y", price: 64950, electric: true },
            { make: "Ford", model: "F-Series", price: 33850, electric: false },
            { make: "Toyota", model: "Corolla", price: 29600, electric: false },
        ],
        // Column Definitions: Defines the columns to be displayed.
        columnDefs: [
            { field: "make" },
            { field: "model" },
            { field: "price" },
            { field: "electric" },
        ],
    };

    debounceResize = _.debounce(this.resize, 200);

    init() {
        super.init();

        agGrid.createGrid(this.$el, this.gridOptions);
    }

    resize() {
        const rect = this.$el.getBoundingClientRect();
        const absoluteY = rect.top + window.scrollY;
        const height =
            window.innerHeight - absoluteY - document.querySelector("footer").offsetHeight - 1;
        this.styles.height = `${height}px`;
    }

    $watch$storeAlpine() {
        this.debounceResize();
    }

    get meta() {
        return import.meta;
    }
}
