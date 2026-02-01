import { routes } from "./Routes";
import { useRoutes } from "react-router-dom";

function AllRoutes() {
  const Routes = useRoutes(routes);
  return <>{Routes}</>;
}
export default AllRoutes;
