import {
  Column,
  Row,
  DataTable,
} from "../../../shared/presentation/components/data-table";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { SnackShopOrderModel } from "features/shop/core/domain/snackshop-order.model";
import { ExtractBtn } from "../components/extract-btn";
import OrderSelectStatus from "../components/admin-order-select-status";

const columns: Array<Column> = [
  { id: "status", label: "Status" },
  { id: "date", label: "Order Date" },
  { id: "tracker", label: "Tracking No." },
  { id: "name", label: "Client Name" },
  { id: "amount", label: "Amount" },
  { id: "hub", label: "Hub" },
  { id: "mop", label: "Mode of Payment" },
  { id: "invoice", label: "Invoice Number" },
  { id: "action", label: "Action" },
];

const rows: Array<Row> = [];

export function AdminShopOrders() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          List of Orders
        </span>
        <div className="flex">
          <OrderSelectStatus />
          <ExtractBtn />
        </div>
      </div>

      <DataTable
        rowsOrder={[
          {
            rowKey: "dateadded",
            align: "left",
            rowComponent: (row: SnackShopOrderModel) => (
              <Moment format="LLL">{row.dateadded}</Moment>
            ),
          },
          {
            rowKey: "tracking_no",
            align: "left",
          },
          {
            rowKey: "purchase_amount",
            align: "left",
            rowComponent: (row: SnackShopOrderModel) => (
              <NumberFormat
                value={(
                  parseInt(row.purchase_amount) +
                  parseInt(row.distance_price) +
                  parseInt(row.cod_fee)
                ).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱"}
              />
            ),
          },
          {
            rowKey: "generated_raffle_code",
            align: "left",
          },
          {
            rowKey: "application_status",
            align: "left",
          },
        ]}
        columns={columns}
        rows={rows}
      />
    </div>
  );
}
