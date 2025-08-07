import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material";

const MenuOption = styled(MenuItem)`
font-size:14px;
padding:15px 60px 5px 24px;
color:#4A4A4A`;


function HeaderMenu() {
  const [open,setOpen] = useState(null);

  const handleClose = () => {
    setOpen(null);
  };

  const handleClick = (e) => {
    setOpen(e.currentTarget)
  }
  return (
    <>
      <MoreVertIcon onClick={handleClick}/>
      <Menu
        anchorEl={open}
        open={open}
        onClose={handleClose}
        getContentAnchorE1={null}
        anchorOrigin={{vertical:'button',
            horizontal:'center'
        }}
        transformOrigin={{
            vertical:'top',
            horizontal:'right'
        }}
        
      >
        <MenuOption onClick={()=> {handleClose();setOpen(true)}}>Profile</MenuOption>
        
      </Menu>
    </>
  );
}

export default HeaderMenu;
