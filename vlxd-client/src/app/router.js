import { createBrowserRouter } from "react-router-dom";
import AdminMainLayout from "./layout/admin.main.layout";
import { PathnameUrl } from "./constants/common";
import Login from "./pages/auth";
import AccountManagement from "./pages/admin/account";
import AgencyManagement from "./pages/admin/agency/agency.management.page";
import ProductManagement from "./pages/admin/product/product.management.page";
import DeliveryHistoryManagement from "./pages/admin/delivery-history";
import DeliveryHistoryDriver from "./pages/driver/delivery-history";
import { isAuthenticated } from "./loaders/authentication";
import DriverMainLayout from "./layout/driver.main.layout";
import Home from "./pages/driver/home";
import Expense from "./pages/driver/expense";
import ExpenseAdmin from "./pages/admin/expense/expense.admin";

const router = createBrowserRouter([
  {
    path: "/",
    loader: isAuthenticated,
    children: [
      {
        path: "",
        element: (
          <DriverMainLayout>
            <Home />
          </DriverMainLayout>
        ),
      },
      {
        path: "delivery-history",
        element: (
          <DriverMainLayout>
            <DeliveryHistoryDriver />
          </DriverMainLayout>
        ),
      },
      {
        path: "expense",
        element: (
          <DriverMainLayout>
            <Expense />
          </DriverMainLayout>
        ),
      },
    ],
  },
  {
    path: "/admin",
    loader: isAuthenticated,
    children: [
      {
        path: PathnameUrl.DELIVERY_HISTORY_MANAGEMENT,
        element: (
          <AdminMainLayout>
            <DeliveryHistoryManagement />
          </AdminMainLayout>
        ),
      },
      {
        path: PathnameUrl.ACCOUNT_MANAGEMENT,
        element: (
          <AdminMainLayout>
            <AccountManagement />
          </AdminMainLayout>
        ),
      },
      {
        path: PathnameUrl.AGENCY_MANAGEMENT,
        element: (
          <AdminMainLayout>
            <AgencyManagement />
          </AdminMainLayout>
        ),
      },
      {
        path: PathnameUrl.PRODUCT_MANAGEMENT,
        element: (
          <AdminMainLayout>
            <ProductManagement />
          </AdminMainLayout>
        ),
      },
      {
        path: PathnameUrl.EXPENSE_MANAGEMENT,
        element: (
          <AdminMainLayout>
            <ExpenseAdmin />
          </AdminMainLayout>
        ),
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
