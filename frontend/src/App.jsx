import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogDetails from "./pages/BlogDetails";
import Editor from "./pages/Editor";
import MyBlogs from "./pages/MyBlogs";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

export default function App(){
 return <Routes>
  <Route path="/login" element={<Login/>}/>
  <Route path="/register" element={<Register/>}/>
  <Route element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
   <Route index element={<Home/>}/>
   <Route path="/blogs/:id" element={<BlogDetails/>}/>
   <Route path="/create" element={<Editor/>}/>
   <Route path="/edit/:id" element={<Editor/>}/>
   <Route path="/my-blogs" element={<MyBlogs/>}/>
   <Route path="/profile" element={<Profile/>}/>
  </Route>
  <Route path="/404" element={<NotFound/>}/>
  <Route path="*" element={<Navigate to="/404" replace/>}/>
 </Routes>
}
