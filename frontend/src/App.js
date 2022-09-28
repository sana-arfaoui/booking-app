import{BrowserRouter, Routes , Route} from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel"
import Login from "./pages/login/Login";
import Logout from "./components/logout/Logout.js";
import New from "./pages/new/New";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<New/>}/>
        <Route path="/logout" element={<Logout/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
