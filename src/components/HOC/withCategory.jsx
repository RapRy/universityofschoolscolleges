import React, { useEffect, useState } from "react";
import axios from "axios";

import * as api from "../../api";

const withCategory = (Component) => {
  const EnhancedCategoryComp = (props) => {
    const [category, setCategory] = useState({});

    useEffect(() => {
      const source = axios.CancelToken.source();
      api
        .getCategory(props.topic.ref.category, source)
        .then((res) => {
          if (res.status === 200) setCategory(res.data.category);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log(err.message);
            return;
          }
          console.log(err);
        });

      return () => source.cancel("Operation canceled");
    }, [props.topic.ref.category]);

    return <Component {...props} category={category} />;
  };

  return EnhancedCategoryComp;
};

export default withCategory;
