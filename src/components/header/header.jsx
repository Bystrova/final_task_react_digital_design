import React from 'react';
import Logo from '../logo/logo';
import HeaderTabs from '../header-tabs/header-tabs';
import HeaderUser from '../header-user/header-user';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import './header.scss';


const Header = () => {
	const location = useLocation().pathname;

	return (
		<header className='header'>
			<Logo />
			{location !== AppRoute.LOGIN && <HeaderTabs />}
			{location !== AppRoute.LOGIN && <HeaderUser />}
		</header>
	)
}

export default Header;