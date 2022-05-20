import React from 'react';
import './header-user.scss';
import '../../scss/blocks/user-photo.scss';
import { Link, useHistory } from 'react-router-dom';
import { AppRoute } from '../../const';
import userImage from '../../images/photo/photo.jpg';
import { logIn } from '../../store/store';
import { observer } from 'mobx-react-lite';

const HeaderUser = observer(() => {

	const authUserId = localStorage.getItem('authUserId');

	logIn.id = authUserId;
	const { userData } = logIn;
	const { username, photoUrl } = userData;

	const history = useHistory();
	const handleExit = (evt) => {
		evt.preventDefault();
		localStorage.removeItem('authUserId')
		history.push(AppRoute.LOGIN)
	}

	return (
		<>
			<div className='dropdown'>
				<div className='header-user'>
					<span className='header-user-name'>{username}</span>
					<div className='user-photo user-photo-header'>
						<img className='user-photo-pic' src={!!photoUrl ? `${photoUrl}` : userImage} width='40' height='40' alt='Фото пользователя'></img>
					</div>
				</div>
				<ul className='dropdown-list dropdown-list-header'>
					<li className='dropdown-item'><Link to={`${AppRoute.USER}/${authUserId}`} className='dropdown-link'>Посмотреть профиль</Link></li>
					{/* <li className='dropdown-item'><Link to={AppRoute.LOGIN} className='dropdown-link dropdown-link-marked' >Выйти из системы</Link></li> */}
					<li className='dropdown-item'><button className='dropdown-link dropdown-link-marked' onClick={handleExit} >Выйти из системы</button></li>
				</ul>
			</div>

		</>
	)
})

export default HeaderUser;