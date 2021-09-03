import React, { useEffect, useState } from "react";

import * as api from "../../api";

const withCategory = (Component) => {
  const EnhancedCategoryComp = (props) => {
    const [category, setCategory] = useState({});

    useEffect(() => {
      api
        .getCategory(props.topic.ref.category)
        .then((res) => {
          if (res.status === 200) setCategory(res.data.category);
        })
        .catch((err) => console.log(err));
    }, [props.topic.ref.category]);

    return <Component {...props} category={category} />;
  };

  return EnhancedCategoryComp;
};

export default withCategory;
