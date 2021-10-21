import React, { useEffect, useState } from "react";
import axios from "axios";

import * as api from "../../api";

const withAuthor = (Component) => {
  const EnhancedAuthorComp = (props) => {
    const [author, setAuthor] = useState({});

    useEffect(() => {
      const source = axios.CancelToken.source();
      api
        .getUser(props.topic.ref.creator, source)
        .then((res) => {
          if (res.status === 200) setAuthor(res.data);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            return;
          }
          console.log(err);
        });

      return () => {
        source.cancel("Operation canceled");
      };
    }, [props.topic.ref.creator]);

    return <Component {...props} author={author} />;
  };

  return EnhancedAuthorComp;
};

export default withAuthor;
