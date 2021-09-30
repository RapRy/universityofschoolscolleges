import React, { useEffect, useState } from "react";
import axios from "axios";

import * as api from "../../api";

const withHotTopics = (Component) => {
  const EnhancedComponent = (props) => {
    const [hotTopics, setHotTopics] = useState([]);

    useEffect(() => {
      const source = axios.CancelToken.source();
      api
        .getHotTopicsByCategory(props.cat?._id, source)
        .then((res) => {
          if (res.status === 200) setHotTopics(res.data.topics);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log(err.message);
            return;
          }

          console.log(err);
        });

      return () => source.cancel("Operation canceled");
    }, [props.cat?._id]);

    return <Component {...props} hotTopics={hotTopics} />;
  };
  return EnhancedComponent;
};

export default withHotTopics;
