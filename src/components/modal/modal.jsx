import React from 'react';
import './modal.scss';
import '../../scss/blocks/label-text.scss';
import '../../scss/blocks/form-input.scss';
import '../../scss/blocks/text-field.scss';
import '../../scss/blocks/button.scss';
import { useLocation, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { AppRoute } from '../../const';
import { users } from '../../store/store';

const Modal = ({ isActive, setIsActive, login, username, about, id, photoUrl }) => {

	const location = useLocation().pathname;

	let modalHeading = 'Редактирование пользователя';
	let firstField = 'Имя пользователя';
	let firstFieldPlaceholder = 'Введите имя';
	let secondField = 'URL фотографии';
	let secondFieldPlaceholder = 'Введите URL';
	let commentField = 'О себе';
	let buttonText = 'Сохранить';

	if (location === `${AppRoute.TASK_VIEW}/${id}`) {
		modalHeading = 'Запись о работе';
		firstField = 'Затраченное время';
		firstFieldPlaceholder = 'Введите число';
		secondField = 'Единица измерения';
		secondFieldPlaceholder = 'Выберите единицы измерения';
		commentField = 'Комментарий';
		buttonText = 'Добавить';
	}

	const handleClose = (evt) => {
		evt.preventDefault();
		setIsActive(!isActive);
	}

	const [form, setForm] = useState({
		'about': about,
		'photoUrl': photoUrl
	})

	const handleFieldChange = (evt) => {
		evt.preventDefault();
		const { name, value } = evt.target;
		setForm({ ...form, [name]: value })
	}


	const handleSubmit = (evt) => {
		evt.preventDefault();
		users.id = id;
		users.editUser({
			...form,
			'username': username,
			'login': login,
			'password': '123', // надо убрать id в переменную
			'id': id
		})
		handleClose(evt);
	}

	return (
		<form className={`modal ${isActive && 'modal-active'}`} onSubmit={handleSubmit}>
			<div className='modal-wrapper'>
				<h2 className='modal-heading'>{modalHeading}</h2>
				<div className='modal-inner'>
					<label className='label-text' htmlFor='user-name'>{firstField}</label>
					<input className='form-input' id='user-name' placeholder={firstFieldPlaceholder} name='username' onChange={handleFieldChange} defaultValue={username}></input>
					<label className='label-text' htmlFor='user-photo'>{secondField}</label>
					<input className='form-input' id='user-photo' placeholder={secondFieldPlaceholder} name='photoUrl' onChange={handleFieldChange}></input>
					<label className='label-text' htmlFor='user-info'>{commentField}</label>
					<textarea className='text-field' id='user-info' placeholder='Введите текст' name='about' defaultValue={about} onChange={handleFieldChange}></textarea>
				</div>
				<div className='modal-buttons'>
					<button type='submit' className='button button-primary'>{buttonText}</button>
					<button className='button button-default' onClick={handleClose}>Отмена</button>
				</div>
			</div>
		</form>
	)
}

export default Modal;