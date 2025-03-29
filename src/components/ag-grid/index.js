import _ from "lodash";
import agGrid from "ag-grid-enterprise";
import Component from "../";

export default class AgGridTable extends Component {
    api = null;

    _headerStickyHeight = parseFloat(
        document.querySelector("header").dataset.stickyOffset.replace("px", ""),
    );

    _resize = _.debounce(() => {
        const rect = this.$el.getBoundingClientRect();
        const absoluteY = rect.top + window.scrollY;
        const elementTop = window.innerHeight - absoluteY;
        const footerHeight = document.querySelector("footer").offsetHeight;
        const height = elementTop - footerHeight - 1 + this._headerStickyHeight;
        this.$el.style.height = `${height}px`;
    }, 200);

    _wheel = (e) => {
        const gridViewport = this.$el.querySelector(".ag-body-viewport");
        const { scrollTop, scrollHeight, clientHeight } = gridViewport;

        if (scrollHeight === clientHeight || e.deltaX !== 0) return;

        const needAdjustScroll =
            (window.scrollY > this._headerStickyHeight &&
                scrollTop + clientHeight !== scrollHeight) ||
            (window.scrollY < this._headerStickyHeight &&
                scrollTop + clientHeight === scrollHeight);

        if (needAdjustScroll) {
            e.preventDefault();
            window.scrollBy(0, this._headerStickyHeight - window.scrollY);
            return;
        }

        const canScrollGrid =
            window.scrollY === this._headerStickyHeight &&
            ((e.deltaY > 0 && scrollTop + clientHeight < scrollHeight) ||
                (e.deltaY < 0 && scrollTop > 0));

        e.preventDefault();
        if (!canScrollGrid) {
            window.scrollBy(0, e.deltaY);
        } else {
            gridViewport.scrollBy(0, e.deltaY);
        }
    };

    defaultColDef = {
        // no header menu & right click context menu
        suppressHeaderMenuButton: true,
        suppressHeaderContextMenu: true,
        // // checkbox select filtered only
        // headerCheckboxSelectionFilteredOnly: true,
        // auto resize column width by content
        suppressSizeToFit: true,
        // no need stick label when scroll horizontally
        suppressStickyLabel: true,
        // default line height
        // cellStyle: {
        //     lineHeight: '1rem',
        //     paddingTop: '14px',
        //     paddingBottom: '14px'
        // },
        // default enable filter & floating filter
        // filter: 'agTextColumnFilter',
        // floatingFilter: true,
        // filterParams: {
        //     // default operator is OR
        //     defaultJoinOperator: 'OR',
        //     // default allow 100 conditions in filter
        //     maxNumConditions: 100,
        //     // filtering when typing search bar
        //     applyMiniFilterWhileTyping: true,
        // },
    };

    constructor(container, params) {
        agGrid.LicenseManager.setLicenseKey(
            "Using_this_{AG_Grid}_Enterprise_key_{AG-065857}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Faith_Tech_Solutions_Limited}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{FTSL}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{FTSL}_need_to_be_licensed___{FTSL}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{26_August_2025}____[v3]_[01]_MTc1NjE2MjgwMDAwMA==d40f38f4e569c3403b80209fc9db1d8e",
        );
        params.autoResize = params.autoResize || false;
        params.honorScroll = params.honorScroll || false;
        super(container, params);
    }

    init() {
        super.init();
        this.$el.style.height = "0";
        if (this.params.autoResize) {
            this.$watch("$store.alpine", this._resize);
            window.addEventListener("resize", this._resize, { passive: true });
        }
        if (this.params.honorScroll) {
            window.addEventListener("wheel", this._wheel, { passive: false });
        }
        this.api = agGrid.createGrid(this.$el, this.getGridOptions());
    }

    getGridOptions() {
        return {
            gridId: _.uniqueId(this.id),
            loading: true,
            // column configs
            defaultColDef: this.defaultColDef,
            columnDefs: this.columnDefs ?? [],
            // checkbox configs
            selectionColumnDef: this.selectionColumnDef,
            rowSelection: this.rowSelection,
            // events
            onRowDataUpdated: (event) => {
                // deselect all rows
                event.api.deselectAll();

                // re-calculate all columns sizes
                const fitCellContentsColumns = [];
                event.api.getColumns().forEach((column) => {
                    console.log(column);
                    if (column.colDef.suppressSizeToFit) {
                        fitCellContentsColumns.push(column.getId());
                    }
                });
                event.api.autoSizeColumns(fitCellContentsColumns, false);
                event.api.sizeColumnsToFit();

                // finish loading
                event.api.setGridOption("loading", false);
            },
        };
    }

    setData(data) {
        this.api.setGridOption("rowData", data);
    }

    get importCSS() {
        return [new URL("./index.css", import.meta.url).pathname];
    }

    async terminate() {
        await super.terminate();
        if (this.params.autoResize) {
            window.removeEventListener("resize", this._resize);
        }
        if (this.params.honorScroll) {
            window.removeEventListener("wheel", this._wheel);
        }
        this.api.destroy();
        this.api = null;
    }
}
