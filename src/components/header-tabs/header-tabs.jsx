import React from 'react';
import './header-tabs.scss';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useLocation, useParams } from 'react-router-dom';

const HeaderTabs = () => {

	const location = useLocation().pathname;

	const { id } = useParams();

	return (
		<div className='header-tabs'>
			<Link to={AppRoute.TASKS} className={`header-tabs-link  ${(location === AppRoute.TASKS || location === `${AppRoute.TASK_VIEW}/${id}` || location === AppRoute.TASK_ADD || location === `${AppRoute.TASK_ADD}/${id}`) && 'link-active'}`}>Задачи</Link>
			<Link to={AppRoute.USERS} className={`header-tabs-link  ${(location === AppRoute.USERS || location === `${AppRoute.USER}/${id}`) && 'link-active'}`}>Пользователи</Link>
		</div>
	)
}

export default HeaderTabs;