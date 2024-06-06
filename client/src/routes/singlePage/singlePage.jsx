import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "DOMPurify"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved)
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(post, "saved: " + saved);
  const handleSave = async () => {
    setSaved((prev) => !prev);
    if(!currentUser){
      navigate("/login")
    }
    
    try {
      await apiRequest.post("user/save", {postId: post._doc._id})
      
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  }

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post._doc.img} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post._doc.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post._doc.address}</span>
                </div>
                <div className="price">$ {post._doc.price}</div>
              </div>
              <div className="user">
                <img src={post._doc.userId.avatar} alt="" />
                <span>{post._doc.userId.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post._doc.postDetail.desc)}}></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {
                  post._doc.postDetail.utilities === "owner" ?(
                    <p>Owner is responsible</p>
                  ) :(
                    <p>Tenant is responsible</p>
                  )
                }
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post._doc.postDetail.pet === "allowed"? (
                  <p>Pets Allowed</p>
                ): (
                  <p>Pets Not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post._doc.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post._doc.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post._doc.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post._doc.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post._doc.postDetail.school > 1000 ? post._doc.postDetail.school/1000 + " km" : post._doc.postDetail.school+ " m"} away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>100m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>200m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post._doc]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button onClick={handleSave}>
              <img src="/save.png" alt="" />
              {saved? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
