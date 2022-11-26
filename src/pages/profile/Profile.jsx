import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import {  Button, Modal } from 'react-bootstrap'
import { CameraAlt, Cancel } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";


export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [cFile, setcFile] = useState(null);
  const [dpFile, setdpFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false)
  const [dpmodalOpen, setdpModalOpen] = useState(false)
  const { user: currentUser } = useContext(AuthContext);

  const username = useParams().username;
    console.log(currentUser._id);

  useEffect(() => {
    const fetchUser = async (e) => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
      console.log(res.data);
      
    };
    fetchUser();
  }, [username]);

//get profile pic
  const dpupload = async (e) =>{
    e.preventDefault();
    const newPost = {
     
      userId:currentUser._id,
    };
    if (dpFile) {
      const data = new FormData();
      const fileName = Date.now() + dpFile.name;
      data.append("name", fileName);
      data.append("file", dpFile);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/users/"+ user._id+"/dp", newPost);
      window.location.reload();
    } catch (err) {}
  };


//get cover pic

const cupload = async (e) =>{
  e.preventDefault();
  const newPost = {
    userId:currentUser._id,
    
  };
  if (cFile) {
    const data = new FormData();
    const fileName = Date.now() + cFile.name;
    data.append("name", fileName);
    data.append("file", cFile);
    newPost.img = fileName;
    console.log(newPost);
    try {
      await axios.post("/upload", data);
    } catch (err) {}
  }
  try {
    await axios.post("/users/"+ user._id+"/cover", newPost);
    window.location.reload();
  } catch (err) {}
};





function closeModal() {
  setModalOpen(false)
}

function closedpModal() {
  setdpModalOpen(false)
}
 

  return (
    <>
    
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
            
           
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
             <Button  onClick={() => setModalOpen(true)} className="coverbtn">
             <CameraAlt/>  Update Cover Picture</Button>
             
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""/>
             <Button onClick={() => setdpModalOpen(true)} className="dpbtn">
        <CameraAlt/></Button>
             
        
             
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
      
        <Modal show={modalOpen} onHide={closeModal}>
        
        <Modal.Header closeButton>Update cover picture</Modal.Header>
         <Modal.Body>
         <label htmlFor="cfile" >
        <div className="uloadbtn" >Select picture</div>
      
        <input
          style={{ display: "none" }}
          type="file"
          id="cfile"
          accept=".png,.jpeg,.jpg"
          onChange={(e) => setcFile(e.target.files[0])}
        />
        </label>
        {cFile && (
          <div className="shareImgContainer">
           
            <img className="shareImg" src={URL.createObjectURL(cFile)} alt="" />
            <Cancel className="shareCancelImg" onClick={closedpModal} />
          </div>
        )}
        <button onClick={cupload}>profile</button>
      </Modal.Body>
        
      </Modal>

    

        <Modal show={dpmodalOpen} onHide={closedpModal}>
        
        <Modal.Header closeButton>Update Profile picture</Modal.Header>
         <Modal.Body>
         <label htmlFor="dpfile" >
        <div id="uploadbtn" className="uploadbtn" >Select picture</div>
      
        <input
          style={{ display: "none" }}
          type="file"
          id="dpfile"
          accept=".png,.jpeg,.jpg"
          onChange={(e) => setdpFile(e.target.files[0])}
        />
        </label>
        {dpFile && (
          <div className="shareImgContainer">
          
            <img className="shareImg" src={URL.createObjectURL(dpFile)} alt="" />
            <Cancel className="shareCancelImg" onClick={closedpModal} />
          </div>
        )}
        <button onClick={dpupload}>Update</button>
      </Modal.Body>
        
      </Modal>



    </>
  );
}
