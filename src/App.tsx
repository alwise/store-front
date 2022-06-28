// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AdminDashboard, LandingPage, POSLayout } from "./Layouts";
import { AdminDashboardCustomers, AdminDashboardSock, AdminDashboardSummary, AdminDashboardUsers, CashSalesPage, CreditSalesPage } from "./Pages";
import {  AuthLogin } from "./Pages/Authentication";
import { Routes as paths } from './Utilities/PageRoutes';

export const App = () => (
  <ChakraProvider theme={theme}>
      <BrowserRouter>
          <Routes  >
              {/* Landing page routes */}
                <Route element={<LandingPage/>}  >
                      <Route  path={paths.landingPage.path}  element={<AuthLogin/>} />
                      {/* <Route path="/register"  element={<AuthLogin/>} /> */}
                </Route>
                {/* Admin Dashboard */}
                <Route path={paths.dashboard.path} element={<AdminDashboard/>} >
                    <Route path={paths.dashboard.pages.stock.path} element={<AdminDashboardSock/>} />
                    <Route  path={paths.dashboard.pages.users.path} element={<AdminDashboardUsers/>} />
                    <Route  path={paths.dashboard.pages.summary.path} element={<AdminDashboardSummary/>} />
                    <Route  path={paths.dashboard.pages.customer.path} element={<AdminDashboardCustomers/>} />
                </Route>

                {/* POS */}
                <Route path={paths.POS.path} element={<POSLayout/>}>
                      <Route path={paths.POS.creditSales.path} element={<CreditSalesPage/>} />
                      <Route path={paths.POS.cashSales.path} element={<CashSalesPage/>} />
                </Route>
          </Routes>
      </BrowserRouter>

   
  </ChakraProvider>
)
