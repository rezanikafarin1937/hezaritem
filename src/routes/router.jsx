import {
  Getproduct,
  Product,
  EditProduct,
  DeleteProduct,
  Register,
  Manager,
  ShowUser,
  EditUser,
  DeleteUser,
  InfiniteLoadingProducts,
  InsertProduct
 
} from "../components";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

export const router = createBrowserRouter([
  {
    
    path: "/",
    element: <MainLayout />,
    errorElement: <h3>Error element</h3>,
    children: [
      {
        path: "/products/show/:id",
        element: <Product />,
        errorElement: <h3>error element</h3>,
      },
    
      {
        path: "/insert-product",
        element: <InsertProduct />,
        errorElement: <h3>error element</h3>,
      },
    
      {
        path: "/",
        element: <InfiniteLoadingProducts />,
        errorElement: <h3>error element</h3>,
      },
    
      {
        path: "/:catId",
        element: <InfiniteLoadingProducts />,
        errorElement: <h3>error element</h3>,
      },
      // {
      //   path: "/:catId/:title",
      //   element: <InfiniteLoadingProducts />,
      //   errorElement: <h3>error element</h3>,
      // },

      // {
      //   path: "/search/:title",
      //   element: <InfiniteLoadingProducts />,
      //   errorElement: <h3>error element</h3>,
      // },




      {
        path: "/products/edit/:id",
        element: <EditProduct />,
        errorElement: <h3>error element</h3>,
      },
      {
        path: "/products/delete/:id",
        element: <DeleteProduct />,
        errorElement: <h3>error element</h3>,
      },
      {
        path: "/register",
        element: <Register />,
        errorElement: <h3>error element</h3>,
      },

    ],
    
    
  },



  {
    path: "/manager",
    element: <Manager />,
    errorElement: <h3>error element</h3>,
  },

  {
    path: "/show-user/:id",
    element: <ShowUser />,
    errorElement: <h3>error element</h3>,
  },

  {
    path: "/edit-user/:id",
    element: <EditUser />,
    errorElement: <h3>error element</h3>,
  },

  {
    path: "/delete-user/:id",
    element: <DeleteUser />,
    errorElement: <h3>error element</h3>,
  },




  
]);
