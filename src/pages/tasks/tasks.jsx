import React from 'react';
import Header from '../../components/header/header';
import Filter from '../../components/filter/filter';
import Task from '../../components/task/task';
import Pagination from '../../components/pagination/pagination';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import '../../scss/blocks/board.scss';
import { tasks } from '../../store/store';
import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import isEqual from 'lodash.isequal';

const Tasks = observer(() => {
	const { taskLimit } = tasks;

	const [page, setPage] = useState(tasks.page);
	tasks.page = page;

	const [filter, setFilter] = useState({
		query: '',
		assignedUsers: [],
		userIds: [],
		type: [],
		status: [],
		rank: []
	});

	useEffect(() => {
		const tasksFilter = {
			filter: filter,
			page: tasks.page,
			limit: tasks.taskLimit
		}
		if (!isEqual(tasks.tasksFilter, tasksFilter)) {
			tasks.tasksFilter = tasksFilter;
		}
	}, [filter, page])

	// useEffect(() => {
	// 	if (!isEqual(tasks.tasksFilter, tasksFilter)) {
	// 		tasks.tasksFilter = tasksFilter;
	// 	}
	// }, [tasksFilter])

	const { tasksData, total } = tasks;

	return (
		<>
			<Header />
			<main className='center'>
				<section className='board'>
					<section className='board-top'>
						<>
							<h1 className='board-heading'>Задачи</h1>
							<Link to={AppRoute.TASK_ADD} className='button button-primary'>Добавить задачу</Link>
						</>
					</section>
					<section className='board-wrapper'>
						<Filter setPage={setPage} setFilter={setFilter} />
						<section className='board-inner'>
							{tasksData.map(task => <Task {...task} key={task.id} />)}
						</section>
						<Pagination total={total} limit={taskLimit} setPage={setPage} page={page} dataLength={tasksData.length} />
					</section>
				</section>
			</main >
		</>
	)
})

export default Tasks;