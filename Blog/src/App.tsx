import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/ui/Footer";
import FooterComponent from "./components/ui/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64 pt-20">
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  );
}

export default App;
