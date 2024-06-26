import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/loginPage/LoginPage";
import Navbar from "./Components/navbar/Navbar";
import Footer from "./Components/footer/Footer";
import Home from "./Pages/Home/home";
import Posts from "./Pages/Posts/posts";
import Profile from "./Pages/profile/Profile";
import Chat from "./Pages/chat/Chat";
import Post from "./Pages/post/Post";
import PostDetails from "./Components/postDetails/PostDetails";
import ClientHome from "./Pages/clientHome/ClientHome";
import AddPost from "./Pages/addPost/AddPost";
import RoleRegister from "./Pages/roleRegister/RoleRegister";
import Register from "./Pages/register/Register";
import FreelancerPostsPage from "./Pages/freelancerPostsPage/FreelancerPostsPage";
import ShowApplicant from "./Pages/showApplicant/ShowApplicant";
import Landing from "./Pages/landing/Landing";
import MlPage from "./Pages/mlPage/MlPage";
import Admin from "./Components/Admin/admin";
import ManageUsers from "./Components/manageUsers/ManageUsers";
import Reports from "./Components/reports/Reports";
import ResetPassword from "./Components/resetPassword/ResetPassword";
import FreelancerProfile from "./Components/freelancerProfile/FreelancerProfile";
import UpdatePost from "./Components/updatePost/UpdatePost";

function App() {
 
  const Layout = ({ children }) => (
    <div className="app">
      <Navbar />
      {children}
      {/* <Footer /> */}
    </div>
  );

  return (
    <ChakraProvider>
      <Router>
        <Routes>
       

          <Route path="/" element={<Landing/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/ml" element={<MlPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/users" element={<ManageUsers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reset-password" element={<ResetPassword />} />





          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/freelancer" element={<Home />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/showPost" element={<Post />} />
                  <Route path="/postDetails/:_id" element={<PostDetails />} />
                  <Route path="/client" element={<ClientHome />} />
                  <Route path="/addPost" element={<AddPost />} />
                  <Route path="/freelancer-posts" element={<FreelancerPostsPage />} />
                  <Route path="/applicant/:_id" element={<ShowApplicant />} />
                  <Route path="/freelancer-profile/:freelancerId" element={<FreelancerProfile/>} />
                  <Route path="/updatePost/:postId" element={<UpdatePost/>} />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            }
          />
          

        </Routes>
      </Router>
    </ChakraProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
export default App;