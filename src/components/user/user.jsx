import React from 'react';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import '../../scss/blocks/row-link.scss';
import { observer } from 'mobx-react-lite';

const User = observer(({ username, id }) => {

	return (
		<Link className='row-link row-link-user' to={`${AppRoute.USER}/${id}`}>
			<div className='user-item'>{username}</div>
		</Link>
	)
})

export default User;