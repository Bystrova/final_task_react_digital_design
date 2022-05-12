import React from 'react';
import './header-user.scss';
import '../../scss/blocks/user-photo.scss';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import userImage from '../../images/photo/photo.jpg';
import { logIn, authUserId } from '../../store/store';
import { observer } from 'mobx-react-lite';

const HeaderUser = observer(() => {
	// const { authUserId } = logIn;
	logIn.id = authUserId;
	const { userData } = logIn;
	const { username, photoUrl } = userData;

	return (
		<>
			<div className='dropdown'>
				<div className='header-user'>
					<span className='header-user-name'>{username}</span>
					<div className='user-photo user-photo-header'>
						<img className='user-photo-pic' src={!!photoUrl ? `${photoUrl}` : userImage} width='40' height='40'></img>
					</div>
				</div>
				<ul className='dropdown-list dropdown-list-header'>
					<li className='dropdown-item'><Link to={`${AppRoute.USER}/${authUserId}`} className='dropdown-link' href='#'>Посмотреть профиль</Link></li>
					<li className='dropdown-item'><a className='dropdown-link dropdown-link-marked' href='#'>Выйти из системы</a></li>
				</ul>
			</div>

		</>
	)
})

export default HeaderUser;