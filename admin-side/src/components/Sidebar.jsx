import React, { useState } from 'react';
import { FaTh, FaBars, FaUserAlt, FaThList, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoKlontongMart from '../assets/klontong-mart.png';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: '/',
            name: 'Dashboard',
            icon: <FaTh />,
        },
        {
            path: '/categories',
            name: 'Categories',
            icon: <FaThList />,
        },
        {
            path: '/register',
            name: 'Register Admin',
            icon: <FaUserAlt />,
        },
    ];

    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('access_token');
        navigate('/login');

        Swal.fire({
            icon: 'success',
            title: 'Successfully Sign Out',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            position: 'top-end',
        });
    };

    return (
        <>
            <SidebarContainer isOpen={isOpen}>
                <TopSection>

                    <Logo isOpen={isOpen}>
                        <img style={{ width: '150%' }} src={LogoKlontongMart} alt="" />
                    </Logo>
                    <BarsOpen onClick={toggle}>
                        <OpenIcon isOpen={isOpen} />
                    </BarsOpen>

                    <BarsClose onClick={toggle}>
                        <CloseIcon isOpen={isOpen} />
                    </BarsClose>

                </TopSection>
                {menuItem.map((item, index) => (
                    <Link to={item.path} key={index} className="link" activeClassName="active">
                        <Icon>{item.icon}</Icon>
                        <LinkText isOpen={isOpen}>{item.name}</LinkText>
                    </Link>
                ))}
                <Link to="/login" className="link" onClick={handleLogout}>
                    <Icon>
                        <FaSignOutAlt />
                    </Icon>
                    <LinkText isOpen={isOpen}>Sign Out</LinkText>
                </Link>
            </SidebarContainer>
            <main>{children}</main>
        </>
    );
};

export default Sidebar;

const SidebarContainer = styled.div`
  background: #333366;
  color: #fff;
  height: ${({ isOpen }) => (isOpen ? '100vh' : '1506px')};
  width: ${({ isOpen }) => (isOpen ? '250px' : '70px')};
  transition: all 0.5s;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 15px;
`;

const Logo = styled.h1`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const BarsOpen = styled.div`
  display: flex;
  font-size: 25px;
  cursor: pointer;
  
`;

const BarsClose = styled.div`
  display: flex;
  font-size: 25px;
  margin-left: 50px;
  cursor: pointer;
  
`;

const OpenIcon = styled(FaBars)`
  display: ${({ isOpen }) => (isOpen ? 'none' : 'block')};
  
`;

const CloseIcon = styled(FaBars)`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  
  
`;


const Link = styled(NavLink)`
  display: flex;
  color: #fff;
  padding: 10px 15px;
  gap: 15px;
  transition: all 0.5s;

  &:hover {
    background: #dfdf36;
    color: #000;
    transition: all 0.5s;
  }

  &.active {
    background: #dfdf36;
    color: #000;
  }
  text-decoration: none;
`;

const Icon = styled.div`
  font-size: 20px;
`;

const LinkText = styled.div`
  font-size: 20px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;