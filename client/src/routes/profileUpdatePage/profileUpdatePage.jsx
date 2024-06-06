import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/uploadWidget";

function ProfileUpdatePage() {

  const {currentUser, updateUser} = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e)=>{

    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);

    const {username, email, password} = Object.fromEntries(formData);

    console.log(currentUser);
    try {
        const res = await apiRequest.put(`/user/${currentUser._id}`, {
          username,
          email,
          password,
          avatar: avatar[0]
        })

        if(res.status === 200) updateUser((currentUser) => {
          return{
            ...currentUser,
            username,
            email,
            avatar
          }
        })
        navigate("/profile")
    } catch (err) {
      setError(err.response.data.message);
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleUpdate}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" defaultValue={currentUser.password} />
          </div>
          {error && <span>{error}</span> }
          <button disabled={isLoading}>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} className="avatar" />
        <UploadWidget uwConfig={{
          cloudName: "heymac",
          uploadPreset: "estateHub",
          multiple:"false",
          maxImageFileSize: 2000000,
          folder: "avatar"
        }} 
        setState = {setAvatar} />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
