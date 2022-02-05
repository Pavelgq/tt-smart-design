import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { CreateForm } from "./pages/CreateForm/CreateForm";
import { NotFound } from "./pages/NotFound/NotFound";
import { Products } from "./pages/Products/Products";

export function RoutesList(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Products />} />
        <Route path="add" element={<CreateForm />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
