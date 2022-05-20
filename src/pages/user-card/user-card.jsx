import React from 'react';
import Header from '../../components/header/header';
import Task from '../../components/task/task';
import Modal from '../../components/modal/modal';
import Pagination from '../../components/pagination/pagination';
import '../../scss/blocks/board.scss';
import userImage from '../../images/photo/photo.jpg';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { tasks, users } from '../../store/store';
import { observer } from 'mobx-react-lite';
import { AppRoute } from '../../const';
import isEqual from 'lodash.isequal';


const UserCard = observer(() => {
	const history = useHistory();

	const [isActive, setIsActive] = useState(false);

	const handleActive = () => {
		setIsActive(!isActive);
	}

	const { id } = useParams();
	users.id = id;

	const { userData } = users;
	const { username, about, photoUrl } = userData;

	const { taskLimit } = tasks;

	const [page, setPage] = useState(tasks.pageInUserCard);
	tasks.pageInUserCard = page;

	useEffect(() => {
		const tasksFilter = {
			filter: {
				query: '',
				assignedUsers: [id],
				userIds: [],
				type: [],
				status: [],
				rank: []
			},
			page: tasks.pageInUserCard,
			limit: tasks.taskLimit
		}
		if (!isEqual(tasks.tasksFilter, tasksFilter)) {
			tasks.tasksFilter = tasksFilter;
		}
	}, [id, page])

	const { tasksData, total } = tasks;

	const handleAddTask = () => {
		localStorage.lastUserId = id;
		history.push(AppRoute.TASK_ADD);
	}

	return (
		<>
			<Header />
			<main className='center'>
				<section className='board'>
					<section className='board-top'>
						<>
							<h1 className='board-heading'>{username}</h1>
							<div className='board-heading-wrapper'>
								{/* <Link to={AppRoute.TASK_ADD} className='button button-default'>Добавить задачу</Link> */}
								<button className='button button-default' type='button' onClick={handleAddTask}>Добавить задачу</button>
								{id === localStorage.authUserId &&
									<button className='button button-primary' type='button' onClick={handleActive}>Редактировать</button>
								}
							</div>
						</>
					</section>
					<section className='board-wrapper'>
						<>
							<div className='user-wrapper'>
								<div className='user-profile'>
									<div className='user-photo'>
										<img className='user-photo-pic' src={!!photoUrl ? `${photoUrl}` : userImage} width='182' height='182' alt='Фото пользователя' />
									</div>
									<span className='label-text'>О себе</span>
									<p className='user-about'>
										{about}
									</p>
								</div>
								<div className='user-tasks'>
									<span className='label-text'>Задачи</span>
									<div className='board-inner'>
										{tasksData.map(task => <Task {...task} key={task.id} />)}
									</div>
									<Pagination total={total} limit={taskLimit} setPage={setPage} page={page} dataLength={tasksData.length} />
								</div>
								{(userData.id === localStorage.authUserId) && <Modal isActive={isActive} setIsActive={setIsActive} {...userData} />}
							</div>
						</>
					</section>
				</section>

			</main >
		</>
	)
})

export default UserCard;