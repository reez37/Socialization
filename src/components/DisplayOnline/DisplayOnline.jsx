import axios from "axios";
import { useEffect, useState } from "react";
import "./DisplyOnline.css";

export default function ChatOnline({ onlineUsers, currentId}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);



  return (
    <div className="chatOnliness">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriends" >
          <div className="chatOnlineImgContainers">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadges"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}
