import { useNavigate } from "react-router-dom";
import { StockOrderHead } from "../components";

export function StockOrderDashboard() {
  return (
    <>
      <StockOrderHead
        StockOrderBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin/stock-order/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "Dashboard", url: "/admin/stock-order/dashboard" },
          ],
        }}
      />
    </>
  );
}
