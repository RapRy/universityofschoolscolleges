import React, { useEffect, useState } from "react";
import axios from "axios";

import * as api from "../../api";

const withLatestTopics = (Component) => {
  const EnhancedComponent = (props) => {
    const [latestTopics, setLatestTopics] = useState([]);

    useEffect(() => {
      const source = axios.CancelToken.source();
      api
        .getLatestTopicsByCategory(props.cat?._id, source)
        .then((res) => {
          if (res.status === 200) setLatestTopics(res.data.topics);
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

    return <Component {...props} latestTopics={latestTopics} />;
  };
  return EnhancedComponent;
};

export default withLatestTopics;
