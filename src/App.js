import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Event from "./components/eventpage/Event_page";
import NotFound from './components/notfound/index.js';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute>
              <Event />
            </ProtectedRoute>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route element={NotFound} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
