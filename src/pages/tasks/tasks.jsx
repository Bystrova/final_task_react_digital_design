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
import { useState } from 'react';
import isEqual from 'lodash.isequal';

const Tasks = observer(() => {

	const { taskLimit, tasksFilter } = tasks;
	const [page, setPage] = useState(tasks.tasksFilter.page);
	tasks.tasksFilter.page = page;

	const { tasksData, total } = tasks;
	// console.log(tasksData)

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
						<Filter page={page} />
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