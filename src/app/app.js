import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppRoute } from '../const';
import Login from '../pages/login/login';
import TaskCard from '../pages/task-card/task-card';
import Tasks from '../pages/tasks/tasks';
import Users from '../pages/users/users';
import UserCard from '../pages/user-card/user-card';
import CardForm from '../pages/card-form/card-form';
import '../scss/style.scss';

const App = () => {

	return (
		<BrowserRouter>
			<Switch>
				<Route path={AppRoute.LOGIN} exact>
					<Login />
				</Route>
				<Route path={AppRoute.TASKS} exact>
					<Tasks />
				</Route>
				<Route path={`${AppRoute.TASK_VIEW}/:id?`} exact>
					<TaskCard/>
				</Route>
				<Route path={AppRoute.TASK_EDIT} exact>
					<CardForm/>
				</Route>
				<Route path={AppRoute.USERS} exact>
					<Users/>
				</Route>
				<Route path={`${AppRoute.USER}/:id?`} exact>
					<UserCard/>
				</Route>
			</Switch>
		</BrowserRouter>
	)
}

export default App;