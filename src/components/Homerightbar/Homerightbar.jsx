import React, { useEffect,useState,useContext,useRef } from 'react'
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";
import DisplayOnline from "../../components/DisplayOnline/DisplayOnline";
import "./homerightbar.css";

export default function Homerightbar() {

    const { user } = useContext(AuthContext);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        
      }, []);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
          setOnlineUsers(
            user.followings.filter((f) => users.some((u) => u.userId === f))
          );
        });
      }, [user]);

      const HmeRightbar = () => {
    return (
        <div>

            <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>No one</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>

        <DisplayOnline
        onlineUsers={onlineUsers}
        currentId={user._id}
        />
        
        </div>
    )
}

return (
  <div className="rightbar">
    <div className="rightbarWrapper">
      <HmeRightbar/> 
    </div>
  </div>
);

}