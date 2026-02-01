import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import ChatBox from "../Component/chatBox";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <ChatBox />
      <Footer />
    </>
  );
}
export default Layout;
