import React from 'react';
import Header from '../../components/header/header';
import Task from '../../components/task/task';
import Modal from '../../components/modal/modal';
import Pagination from '../../components/pagination/pagination';
import '../../scss/blocks/board.scss';
import userImage from '../../images/photo/photo.jpg';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tasks, users, logIn, authUserId } from '../../store/store';
import { observer } from 'mobx-react-lite';
import { AppRoute } from '../../const';
import isEqual from 'lodash.isequal';


const UserCard = observer(() => {
	// const { authUserId } = logIn;

	const [isActive, setIsActive] = useState(false);

	const handleActive = () => {
		setIsActive(!isActive);
	}

	const { id } = useParams();
	users.id = id;
	const { userData } = users;
	const { username, about, photoUrl } = userData;

	const { taskLimit, tasksFilter } = tasks;

	const [page, setPage] = useState(0);
	const filter = {
		'filter': {
			'query': '',
			'assignedUsers': [id],
			'userIds': [],
			'type': [],
			'status': [],
			'rank': []
		},
		'page': page,
		'limit': taskLimit
	}

	if (!isEqual(filter, tasksFilter)) {
		tasks.tasksFilter = filter;
	}

	const { tasksData, total } = tasks;
	// console.log(users.allUsersData)

	return (
		<>
			<Header />
			<main className='center'>
				<section className='board'>
					<section className='board-top'>
						<>
							<h1 className='board-heading'>{username}</h1>
							<div className='board-heading-wrapper'>
								<Link to={AppRoute.TASK_ADD} className='button button-default'>Добавить задачу</Link>
								{id === authUserId &&
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
								{(userData.id === authUserId) && <Modal isActive={isActive} setIsActive={setIsActive} {...userData} />}
							</div>
						</>
					</section>
				</section>

			</main >
		</>
	)
})

export default UserCard;