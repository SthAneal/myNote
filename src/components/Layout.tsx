import {Link, Outlet} from 'react-router-dom';
import { FlexDiv } from '../styles/globalStyleComponent';
import '../styles/globalStyles.scss';

import { ReactComponent as LogoIcon } from "../assets/logo.svg";
import { MdPermIdentity } from 'react-icons/md';
import  { MdOutlineNoteAlt } from 'react-icons/md';

export const Layout = ()=>{
    return(
        <FlexDiv flex="1 1 100%" height="100%" minWidth="320px" flexDirection="row">
            <FlexDiv 
                flex="1 0 200px" 
                width="100%" 
                minHeight="100%" 
                flexDirection="column" 
                justifyContent="start" 
                flexGap="15px"
                overflowY="scroll"
                padding="15px"
                className="side-menu"    
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