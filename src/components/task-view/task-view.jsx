import React from 'react';
import Modal from '../modal/modal';
import Comment from '../comment/comment';
import './task-view.scss';
import '../../scss/blocks/label-text.scss';
import '../../scss/blocks/text-field.scss';
import { AppRoute, Ranks, Statuses, Types } from '../../const';
import { useState } from 'react';
import { tasks, users, comments } from '../../store/store';
// import { authUserId } from '../../api';
import { observer } from 'mobx-react-lite';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';


const TaskView = observer(() => {
	const history = useHistory();

	const [isActive, setIsActive] = useState(false);

	const handleActive = () => {
		setIsActive(!isActive);
	}

	const { id } = useParams();
	if (id !== tasks.id) {
		tasks.id = id;
	}

	const { taskData } = tasks;
	const { type, rank, title, description, status, dateOfCreation, dateOfUpdate, timeInMinutes, assignedId, userId } = taskData;

	const formatDateOfCreation = moment(dateOfCreation).format('DD.MM.YYYY HH:mm');
	const formatDateOfUpdate = moment(dateOfUpdate).format('DD.MM.YYYY HH:mm');

	const { allUsersData } = users;
	const assignedUser = allUsersData.find(user => assignedId === user.id);
	const author = allUsersData.find(user => userId === user.id);
	let assigendUsername = '';
	let authorUsername = '';
	if (assignedUser && author) {
		assigendUsername = assignedUser.username;
		authorUsername = author.username;
	}

	comments.id = id;
	const { commentsData } = comments;

	const [textField, setTextField] = useState('');

	const handleSubmit = (evt) => {
		evt.preventDefault();
		comments.addOrEditComment({
			taskId: id,
			userId: localStorage.authUserId,
			text: textField
		});
		evt.target.reset();
	}

	const handleDelete = () => {
		tasks.deleteTask(tasks.id);
		history.goBack();
	}

	const getDeclination = (value, declinationsArr) => {
		let valueDeclination = '';
		if (value % 10 === 1 && value % 100 !== 11) {
			valueDeclination = declinationsArr[0];
		} else if (value % 10 >= 2 && value % 10 <= 4 && (value % 100 > 14 || value % 100 < 12)) {
			valueDeclination = declinationsArr[1];
		} else {
			valueDeclination = declinationsArr[2];
		}
		return valueDeclination;
	}

	const hoursDeclinations = ['час', 'часа', 'часов'];
	const minutesDeclinations = ['минута', 'минуты', 'минут'];
	const getHoursAndMinutes = (mins) => {
		let hours = Math.trunc(mins / 60);
		let minutes = mins % 60;
		return `${hours} ${getDeclination(hours, hoursDeclinations)} ${minutes} ${getDeclination(minutes, minutesDeclinations)}`;
	};

	const handleStatusChange = (evt) => {
		evt.preventDefault();
		let newStatus = evt.target.value;
		tasks.changeTaskStatusFromCard(id, newStatus);
	}

	return (
		<main className='center'>
			<section className='board'>
				<section className='board-top'>
					<div className='board-top-wrapper'>
						<h1 className='board-heading'>{title}</h1>
						<span className={`task-status task-status-${status}`}>{Statuses[status]}</span>
					</div>
					<div className='board-heading-wrapper'>
						{status === 'opened' &&
							<button
								className='button button-default'
								value='inProgress'
								onClick={handleStatusChange}
								type='button'>
								Взять&nbsp;в&nbsp;работу
							</button>}
						{(status === 'inProgress' || status === 'testing' || status === 'complete') &&
							<button
								className='button button-default'
								value='opened'
								onClick={handleStatusChange}
								type='button'>
								Переоткрыть
							</button>}
						{status === 'inProgress' &&
							<button
								className='button button-default'
								value='testing'
								onClick={handleStatusChange}
								type='button'>
								На&nbsp;тестирование
							</button>}
						{(status === 'opened' || status === 'inProgress' || status === 'testing') &&
							<button
								className='button button-success'
								value='complete'
								onClick={handleStatusChange}
								type='button'>
								Готово
							</button>}
						<Link to={`${AppRoute.TASK_ADD}/${id}`} className='button button-primary'>Редактировать</Link>
						<button className='button button-error' type='button' onClick={handleDelete}>Удалить</button>
					</div>
				</section>
				<section className='board-wrapper'>
					<section className='card-wrapper'>
						<div className='card-info'>
							<dl className='card-info-list'>
								<dt className='label-text'>Исполнитель</dt>
								<dd className='text'>{assigendUsername}</dd>
								<dt className='label-text'>Автор задачи</dt>
								<dd className='text'>{authorUsername}</dd>
								<dt className='label-text'>Тип запроса</dt>
								<dd className='text'>{Types[type]}</dd>
								<dt className='label-text'>Приоритет</dt>
								<dd className='text'>{Ranks[rank]}</dd>
								<dt className='label-text'>Дата создания</dt>
								<dd className='text'>{formatDateOfCreation}</dd>
								<dt className='label-text'>Дата изменения</dt>
								<dd className='text'>{formatDateOfUpdate}</dd>
								<dt className='label-text'>Затрачено времени</dt>
								<dd className='text'>{getHoursAndMinutes(timeInMinutes)}</dd>
							</dl>
							<button className='button button-primary' onClick={handleActive}>Сделать запись о работе</button>
						</div>
						<div className='card-description'>
							<span className='label-text'>Описание</span>
							<p className='card-description-text'>{description}</p>
						</div>
						<div className='card-comment'>
							<form onSubmit={handleSubmit}>
								<span className='label-text'>{`Комментарии (${commentsData.length})`}</span>
								<textarea className='text-field' placeholder='Текст комментария' name='comment' onChange={evt => setTextField(evt.target.value)} required></textarea>
								<button className='button button-success' type='submit'>Добавить комментарий</button>
							</form>
							<dl className='comment-list'>
								{commentsData.slice().reverse().map(comment => <Comment {...comment} key={comment.id} />)}
							</dl>
						</div>
						<Modal isActive={isActive} setIsActive={setIsActive} id={id} timeInMinutes={timeInMinutes} />
					</section>
				</section>
			</section>
		</main >
	)
})

export default TaskView;