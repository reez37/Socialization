import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";

import CloseFriend from "../closeFriend/CloseFriend";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";

export default function Sidebar() {

  const [users, setusers] = useState([]);
  const getusers = async () => {
    try{
  const userslist = await axios.get("/users/alluser");
    setusers(userslist.data);
  } catch(err){
    console.log(err);
  }
};

useEffect(() => {
  getusers();
}, [])

 
  
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
      <h4>All User</h4>

        <hr className="sidebarHr" /> 
        <ul className="sidebarFriendList">
          {users.map((u) => (
            <div className="shadow">
            <Link  className = "profilelink" to={`/profile/${u.username}`}>
            
            <CloseFriend  key={u.id} user={u} />
            
            </Link>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
