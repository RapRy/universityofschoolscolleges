import React, { useEffect, useState } from "react";

import * as api from "../../api";

const withParticipants = (Component) => {
  const EnhancedParticipantsComp = (props) => {
    const { topic } = props;
    const [users, setUsers] = useState([]);

    useEffect(() => {
      api
        .getParticipants(topic._id)
        .then((res) => {
          const filteredUsers = res.data.users.filter(
            (user) => user._id !== topic.ref.creator
          );
          setUsers(filteredUsers);
        })
        .catch((err) => console.log(err));
    }, [topic._id, topic.ref.creator]);

    return <Component {...props} participants={users} />;
  };

  return EnhancedParticipantsComp;
};

export default withParticipants;
