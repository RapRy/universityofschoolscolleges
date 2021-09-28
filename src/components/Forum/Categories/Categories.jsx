import React, { useEffect } from "react";
import { Container, LinearProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import AddCategoryForm from "../../Globals/Forms/AddCategoryForm";
import { get_categories } from "../../../redux/categoriesReducer";
import Category from "./Category";
import Empty from "../../Globals/Empty/Empty";
import { PanelHeader } from "../../Globals/Headers";

const Categories = () => {
  const { status, categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    const promise = dispatch(get_categories());

    return () => promise.abort();
  }, [dispatch]);

  return (
    <Container>
      <PanelHeader title="Categories" isWhite={false} isSmall={false} />
      <AddCategoryForm />

      {status === "loading" && categories.length === 0 && (
        <LinearProgress style={{ margin: "30px 0" }} />
      )}

      {status === "idle" && categories.length === 0 && (
        <Empty message="No created categories" />
      )}
      {categories.map(
        (cat) => cat.active === 1 && <Category key={cat._id} cat={cat} />
      )}
    </Container>
  );
};

export default Categories;
