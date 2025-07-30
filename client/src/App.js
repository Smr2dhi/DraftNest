import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar     from './components/Navbar';
import Signup     from './pages/Signup';
import Signin     from './pages/Signin';
import Home       from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';  // ← import this

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
       
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/signup"   element={<Signup />} />
          <Route path="/signin"   element={<Signin />} />
          <Route path="/create"   element={<CreatePost />} />
          <Route path="/edit/:id" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetail />} />  {/* new */}
        </Routes>
      </div>

     <footer className="footer bg-dark text-white text-center py-4 mt-5">
  <p className="mb-1">Typed in silence. Echoed on the web.</p>
  <small>&copy; {new Date().getFullYear()}DraftNest . All rights reserved.</small>
</footer>

    </BrowserRouter>
  );
}





