import React, { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./Header.css";
import { Link } from "react-router-dom";
import { Home, Add, Search, AccountCircle } from "@mui/icons-material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Badge, Popover } from "@mui/material";
import {  useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import ChatWithAIComponent from "../ChatWithAIComponent/ChatWithAIComponent";
const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

 
  const { notifications, loading } = useSelector(
    (state) => state.notifications.notifications
  );
  return (
    <div className="header">
      <div className="logo">
        <span className="menu_span">Connect</span>
      </div>
      <div className="navicons">
        <Link to="/">
          <div className="icons ">
            <Home />
            <span className="menu_span">Home</span>
          </div>
        </Link>
        <Link to="/newpost">
          <div className="icons">
            <Add />
            <span className="menu_span">Create</span>
          </div>
        </Link>
        <Link to="/search">
          <div className="icons ">
            <Search />
            <span className="menu_span">Search</span>
          </div>
        </Link>
        <Link to="/account">
          <div className="icons">
            <AccountCircle />
            <span className="menu_span"> Profile</span>
          </div>
        </Link>
        <div className="icons" onClick={handleClick}>
          <SmartToyIcon />
          <span className="menu_span"> Chat with AI</span>
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <ChatWithAIComponent />
        </Popover>
        <Link to="/notifications">
          <div className="icons notification">
            <Badge
              badgeContent={
                loading ? <Loader /> : notifications ? notifications.length : 0
              }
              sx={{
                "& .MuiBadge-badge": {
                  color: "white",
                  backgroundColor: "Red",
                },
              }}
            >
              <NotificationsIcon className="n_icon" />
            </Badge>
            <span className="nspan">Notifications</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
