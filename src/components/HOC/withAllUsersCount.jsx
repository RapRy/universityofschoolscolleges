import React, { useEffect, useState } from "react";
import * as api from "../../api";
import axios from "axios";

const withAllUsersCount = (Component) => {
  const EnhancedAllUsersCount = (props) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const source = axios.CancelToken.source();
      api
        .getRegisteredCount(source)
        .then((res) => {
          if (res.status === 200) setCount(res.data.count);
        })
        .catch((err) => console.log(err));

      return () => source.cancel();
    }, []);

    return <Component {...props} allUsersCount={count} />;
  };

  return EnhancedAllUsersCount;
};

export default withAllUsersCount;
