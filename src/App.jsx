import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Recipes from "./pages/Recipes";
import WriteRecipe from "./pages/WriteRecipe";
import UpdateRecipe from "./pages/UpdateRecipe";
import DeleteRecipe from "./pages/DeleteRecipe";
import RecipePage from "./pages/RecipePage";
import RecipesList from "./pages/RecipesList";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/recipes" element={<Recipes />}></Route>
        <Route path="/edit-recipes" element={<RecipesList />}></Route>
        <Route path="/recipe/:id" element={<RecipePage />}></Route>
        <Route path="/create-recipe" element={<WriteRecipe />} />
        <Route path="/edit-recipe/:id" element={<UpdateRecipe />} />
        <Route path="/delete-recipe" element={<DeleteRecipe />} />
      </Routes>

      <Footer></Footer>
    </>
  );
}

export default App;
