import { get } from "/src/utils/api/";

import AgGridTable from "/src/components/ag-grid/";

export default class WorksOrderTable extends AgGridTable {
    id = "WorksOrderTable";

    columnDefs = [
        {
            field: "hms_wo_no",
            suppressSizeToFit: false,
            pinned: "left",
            lockPinned: true,
            headerName: `Works Order No.`,
        },
        { field: "ha_ref", headerName: `HA Ref.` },
        { field: "wo_no_other", headerName: `W.O. No. Other` },
        { field: "project_title", headerName: `Project Title`, suppressSizeToFit: false, },
        { field: "hospital_code", headerName: `Hospital` },
        { field: "order_type", headerName: `Order Type` },
    ];

    selectionColumnDef = {
        pinned: "left",
    };

    rowSelection = {
        mode: "multiRow",
        hideDisabledCheckboxes: true,
        selectAll: "filtered",
        isRowSelectable: () => true,
    };

    constructor(container) {
        super(container, {
            autoResize: true,
            honorScroll: true,
        });
    }

    async init() {
        super.init();

        const data = await get(`/api/ha/wo/list`);

        this.setData(data);
    }

    get meta() {
        return import.meta;
    }
}
