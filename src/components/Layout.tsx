import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FlexDiv } from '../styles/globalStyleComponent';
import '../styles/globalStyles.scss';

import { ReactComponent as LogoIcon } from "../assets/logo.svg";
import { MdPermIdentity, MdOutlineNoteAlt, MdOutlineMenu, MdOutlineMenuOpen} from 'react-icons/md';

export const Layout = ()=>{
    const [isMenuBtnOpen, toggleMenuBtn] = useState<boolean>(false);

    return(
        <FlexDiv flex="1 1 100%" height="100%" minWidth="320px" flexDirection="row" className="side-menu__wrapper">
            <div className={`side-menu__btn ${isMenuBtnOpen?'side-menu__btn--open':'side-menu__btn--close'}`} onClick={()=>toggleMenuBtn(!isMenuBtnOpen)}>
                {isMenuBtnOpen?<MdOutlineMenuOpen />:<MdOutlineMenu/>}
            </div>

            <FlexDiv 
                flex="1 0 200px" 
                width="100%" 
                minHeight="100%" 
                flexDirection="column" 
                justifyContent="flex-start" 
                flexGap="15px"
                overflowY="scroll"
                padding="15px"
                className={`side-menu ${isMenuBtnOpen?'side-menu--open':'side-menu--close'}`}    
            >
                <FlexDiv flex="0 0 60px" overflow="hidden" width="100%" justifyContent="center" alignItems="center" margin="0 0 60px 0">
                    <LogoIcon className="logo"/>
                </FlexDiv>
                
                <Link to="/" className="nav">
                    <FlexDiv flex="0 0 20px" height="20px" alignItems="center" className="nav-icon"><MdPermIdentity/></FlexDiv>
                    <FlexDiv flex="0 0 auto" alignItem="center" className="nav-name">About Me</FlexDiv>
                </Link>

                <Link to="/mynote" className="nav">
                    <FlexDiv flex="0 0 20px" height="20px" alignItems="center" className="nav-icon"><MdOutlineNoteAlt/></FlexDiv>
                    <FlexDiv flex="0 0 auto" alignItem="center" className="nav-name">My Notes</FlexDiv>
                </Link>

            </FlexDiv>
            <FlexDiv flex="1 1 100%" height="100%" padding="15px">
                <Outlet/>
            </FlexDiv>
        </FlexDiv>
    )
}