import React from "react";
import "./NotificationsContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotification } from "../../Actions/Notification";
import User from "../User/User";
import Loader from "../Loader/Loader";


const NotificationsContainer = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notifications.notifications);
  const {loading} = useSelector((state)=> state.notifications);

  return (
    <div className="notifications">
    { notifications ? <span className="clear_text" onClick={()=>dispatch(deleteNotification())}  >Clear all</span> : " "}
      { loading ? <Loader /> :notifications ? (
        notifications.map((notification) => {
          if (notification.type === "like") {
            return (
              
              <div className="like_div" key={notification._id}>
                <User
                  userId={notification.recipient._id}
                  name={notification.recipient.name}
                  avatar={notification.recipient.avatar.url}
                />
                <span className="like_text">Liked your Post</span>
                <img className="like_post" src={notification.post.image.url} alt="Post" />
              </div>
            );
          }
          if (notification.type === "follow") {
            return (
              <div className="follow_div" key={notification._id}>
                <User
                  userId={notification.recipient._id}
                  name={notification.recipient.name}
                  avatar={notification.recipient.avatar.url}
                  className="user-tag"

                />
                <span className="follow_text">Started following you</span>
              </div>
            );
          }
          if (notification.type === "comment") {
            return (
              <div className="like_div" key={notification._id}>
                <User
                  userId={notification.recipient._id}
                  name={notification.recipient.name}
                  avatar={notification.recipient.avatar.url}
                />
                <span className="like_text">{`commented "${notification.comment}" on your Post`}</span>
                <img className="like_post" src={notification.post.image.url} alt="Post" />
              </div>
            );
          }
          return null;
        })
      ) : (
       <div className="no_not_text_div"><span className="no_not_text">No notifications</span></div> 
      )}
    </div>
  );
};

export default NotificationsContainer;
