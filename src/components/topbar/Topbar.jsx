import "./topbar.css";
import { Link, useHistory} from "react-router-dom";
import { Search, Person, Chat, Notifications,Settings } from "@material-ui/icons";
import { useContext, useEffect, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";




export default function Topbar() {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 

  const logout = async () => {
     try{
     const loggedout = await axios.get("/auth/"+ user._id);
     if(loggedout){
       localStorage.removeItem("user");
       
       history.push("/")
       window.location.reload();
     }
     }catch(err){
       console.log(err);
     }
   
  }


  
 
 
 
  const [search, setsearch] = useState("")

  const handlechange = e =>{
    setsearch(e.target.value)
  };


  const searchnow = () =>{
    history.push(`/profile/${search}`)
  }

  const handlekey = (e) =>{
    if (e.key=== "Enter"){
      searchnow();
    }
  }
   
  

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link  to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Socialization</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input type="search"
            placeholder="Search for friend, post or video"
            className="searchInput"
            value= {search}
            onChange={handlechange}
            onKeyPress = {handlekey}
            
          />
          
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
        <Link to = '/' style={{ textDecoration: "none", color:"white"}}>
          <span className="topbarLink">Home</span>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
         
            <Person className="link"/>
          
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
          <div className="topbarIconItem">
          <Link className="link" to={'/messenger'}>
            <Chat color="white" />
            </Link>
            {/* <span className="topbarIconBadge">2</span> */}
          </div>
          <div className="topbarIconItem">
            <Settings className="link" />
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        <div className="logout">
        <Link className="logoutbtn" onClick={logout} >
          logout
        </Link>
        </div>
      </div>
    </div>
  );
}
