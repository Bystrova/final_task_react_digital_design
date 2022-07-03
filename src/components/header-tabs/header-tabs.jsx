import React from 'react';
import './header-tabs.scss';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useRouteMatch } from 'react-router-dom';

const HeaderTabs = () => {
	const tasksView = useRouteMatch(AppRoute.TASKS);
	const taskAddOrEdit = useRouteMatch(AppRoute.TASK_ADD);
	const isTasksTab = taskAddOrEdit || tasksView;
	const isUsersTab = useRouteMatch(AppRoute.USERS);

	return (
		<div className="header-tabs">
			<Link
				to={AppRoute.TASKS}
				className={`header-tabs-link  ${isTasksTab && 'link-active'}`}
			>
				Задачи
			</Link>
			<Link
				to={AppRoute.USERS}
				className={`header-tabs-link  ${isUsersTab && 'link-active'}`}
			>
				Пользователи
			</Link>
		</div>
	);
};

export default HeaderTabs;
