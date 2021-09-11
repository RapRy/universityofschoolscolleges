import React, { useEffect, useState } from "react";
import axios from "axios";

import * as api from "../../api";

const withLastCommentor = (Component) => {
  const EnhancedCommentor = (props) => {
    const [commentor, setCommentor] = useState({});

    useEffect(() => {
      const source = axios.CancelToken.source();
      if (props.topic.meta.replies.length > 0) {
        api
          .getUser(
            props.topic.meta.replies[props.topic.meta.replies.length - 1],
            source
          )
          .then((res) => {
            if (res.status === 200) setCommentor(res.data);
          })
          .catch((err) => {
            if (axios.isCancel(err)) {
              console.log(err.message);
              return;
            }

            if (err.response.status === 404) {
              setCommentor({});
              return;
            }

            console.log(err);
          });
      }
      return () => source.cancel("Operation canceled");
    }, [props.topic.meta.replies]);

    return <Component {...props} lastCommentor={commentor} />;
  };

  return EnhancedCommentor;
};

export default withLastCommentor;
