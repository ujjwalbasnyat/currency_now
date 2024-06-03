import { useState } from 'react';
import React from 'react';
import './navbar.css';
import { IoSettingsOutline } from "react-icons/io5";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineContactSupport } from "react-icons/md";

function Navbar() {
    const [dropdown, setDropdown] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const handleDropdown = () => {
        setDropdown(!dropdown);
    }

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
    }
  return (
    <div className='bg-slate-500 w-screen h-[45px] flex flex-row justify-between items-center list-none px-2'>
        <li className='font-bold font-mono text-slate-100 text-2xl'>CurrenSwift</li>
        <li className='flex items-center gap-1 text-slate-100  font-mono cursor-pointer ' onClick={handleDropdown}>Settings <IoSettingsOutline/>
             {dropdown && <DropDown handleDarkMode = {handleDarkMode, darkMode}/>}
        </li>
    </div>
  )
}

export default Navbar;

function DropDown({handleDarkMode, darkMode}){
    return(
        <div className=''>
            <ul className='Nav-dropdown-menu w-relative'>
                <li className='flex flex-row items-center'><MdOutlineContactSupport/>Help & Support</li>
                <li>About</li>
                <li onClick={handleDarkMode}>{darkMode ? <div className='flex items-center '><MdLightMode/>Light Appearance</div> : <div className='flex items-center'><MdDarkMode/> Dark Appearance</div>}</li>
                <li className='flex flex-row items-center'><IoExitOutline/>Exit</li>
            </ul>
        </div>
    )
}
