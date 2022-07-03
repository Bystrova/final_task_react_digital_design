import React from 'react';
import { AppRoute, Ranks, Statuses } from '../../const';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { users, tasks } from '../../store/store';
import { observer } from 'mobx-react-lite';
import './task.scss';
import '../../scss/blocks/row-link.scss';

const Task = observer(({ title, type, status, rank, id, assignedId }) => {
	const location = useLocation().pathname;

	const { allUsersData } = users;
	const user = allUsersData.find((user) => assignedId === user.id);
	let username = '';
	if (user !== undefined) {
		username = user.username;
	}

	const isOpened = status === 'opened';
	const isInProgress = status === 'inProgress';
	const isComplete = status === 'complete';
	const isLow = rank === 'low';
	const isMedium = rank === 'medium';
	const isHigh = rank === 'high';
	const isTasksPage = location.indexOf(AppRoute.USER) === -1;

	const handleDelete = (evt) => {
		evt.preventDefault();
		tasks.deleteTask(id);
	};

	const handleStatusChange = (evt) => {
		evt.preventDefault();
		let newStatus = evt.target.value;
		tasks.changeTaskStatusFromList(id, newStatus);
	};

	return (
		<>
			<Link to={`${AppRoute.TASK_VIEW}/${id}`} className="row-link">
				<span className={`task-type task-type-${type}`}>
					<span className="visually-hidden">Ошибка</span>
				</span>
				<span className="task-name">{title}</span>
				{isTasksPage && <span className="task-user">{username}</span>}
				<div className="task-wrap">
					<span className={`task-status task-status-${status}`}>
						{Statuses[status]}
					</span>
				</div>
				<div className={`task-priority task-priority-${rank}`}>
					{isLow && (
						<svg
							width="14"
							height="8"
							viewBox="0 0 14 8"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M7 8L14 0L7 4L0 0L7 8Z" fill="currentColor" />
						</svg>
					)}
					{isMedium && (
						<svg
							width="14"
							height="6"
							viewBox="0 0 14 6"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M7 0L0 3L7 6L14 3L7 0Z" fill="currentColor" />
						</svg>
					)}
					{isHigh && (
						<svg
							width="14"
							height="8"
							viewBox="0 0 14 8"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M7 0L0 8L7 4L14 8L7 0Z" fill="currentColor" />
						</svg>
					)}
					<span>{Ranks[rank]}</span>
				</div>
				{isTasksPage && (
					<div className="task-actions dropdown">
						<button className="task-button" type="button">
							<span className="visually-hidden">
								Посмотреть возможные действия
							</span>
						</button>
						<object>
							<ul className="dropdown-list">
								<li className="dropdown-item">
									<Link
										to={`${AppRoute.TASK_ADD}/${id}`}
										className="dropdown-link"
									>
										Редактировать
									</Link>
								</li>
								<li className="dropdown-item">
									<button
										className="dropdown-link dropdown-link-marked"
										onClick={handleDelete}
										type="button"
									>
										Удалить
									</button>
								</li>

								{isOpened && (
									<li className="dropdown-item">
										<button
											className="dropdown-link"
											value="inProgress"
											onClick={handleStatusChange}
											type="button"
										>
											Взять в работу
										</button>
									</li>
								)}
								{!isOpened && (
									<li className="dropdown-item">
										<button
											className="dropdown-link"
											value="opened"
											onClick={handleStatusChange}
											type="button"
										>
											Переоткрыть
										</button>
									</li>
								)}
								{isInProgress && (
									<li className="dropdown-item">
										<button
											className="dropdown-link"
											value="testing"
											onClick={handleStatusChange}
											type="button"
										>
											На&nbsp;тестирование
										</button>
									</li>
								)}
								{!isComplete && (
									<li className="dropdown-item">
										<button
											className="dropdown-link"
											value="complete"
											onClick={handleStatusChange}
											type="button"
										>
											Готово
										</button>
									</li>
								)}
							</ul>
						</object>
					</div>
				)}
			</Link>
		</>
	);
});

export default Task;
