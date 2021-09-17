import React, { useEffect, useState } from "react";
import axios from "axios";

import * as api from "../../api";

const withParticipants = (Component) => {
  const EnhancedParticipantsComp = (props) => {
    const { topic } = props;
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const source = axios.CancelToken.source();
      const formData = { postId: topic._id, creatorId: topic.ref.creator };
      const abortController = new AbortController();
      api
        .getParticipants(formData, source)
        .then((res) => {
          if (res.status === 200) setUsers(res.data.users);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log(err.message);
            return;
          }
          console.log(err);
        });

      return () => {
        abortController.abort();
        source.cancel("Operation canceled");
      };
    }, [topic._id, topic.ref.creator]);

    return <Component {...props} participants={users} />;
  };

  return EnhancedParticipantsComp;
};

export default withParticipants;
