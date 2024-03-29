import React from 'react';
import './comment.scss';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { users, comments } from '../../store/store';

const Comment = observer(({ text, userId, id, dateOfCreation }) => {

	const { allUsersData } = users;
	let user = {}
	if (allUsersData.length !== 0) {
		user = allUsersData.find(user => userId === user.id);
	}

	const handleDelete = (evt) => {
		evt.preventDefault();
		comments.deleteComment(id)
	}
	const formatDateOfCreation = moment(dateOfCreation).format('DD.MM.YYYY HH:mm');

	return (
		<>
			<dt className='label-text'>{`${user.username} (${formatDateOfCreation})`}
				{localStorage.authUserId === user.id && <button className='button button-delete-comment' type='button' onClick={handleDelete}>Удалить</button>}
			</dt>
			<dd className='text'>{text}</dd>
		</>
	)
})

export default Comment;