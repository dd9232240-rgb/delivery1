import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Rotas from "./rotas";
import "./styles/global.css";


import { setupWorker } from "msw/browser";
import { handlers } from "./mocks/handlers";
const worker = setupWorker(...handlers);

await worker.start();

const router = createBrowserRouter([{ path: "/*", element: <Rotas /> }]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);