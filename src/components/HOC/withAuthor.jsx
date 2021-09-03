import React, { useEffect, useState } from "react";

import * as api from "../../api";

const withAuthor = (Component) => {
  const EnhancedAuthorComp = (props) => {
    const [author, setAuthor] = useState({});

    useEffect(() => {
      api
        .getUser(props.topic.ref.creator)
        .then((res) => {
          if (res.status === 200) setAuthor(res.data);
        })
        .catch((err) => console.log(err));
    }, [props.topic.ref.creator]);

    return <Component {...props} author={author} />;
  };

  return EnhancedAuthorComp;
};

export default withAuthor;
