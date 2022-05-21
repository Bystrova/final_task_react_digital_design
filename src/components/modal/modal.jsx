import React from 'react';
import './modal.scss';
import '../../scss/blocks/label-text.scss';
import '../../scss/blocks/form-input.scss';
import '../../scss/blocks/text-field.scss';
import '../../scss/blocks/button.scss';
import FilterDropdown from '../filter-dropdown/filter-dropdown';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AppRoute, Units, DropdownTypes } from '../../const';
import { users, tasks } from '../../store/store';

const Modal = ({ isActive, setIsActive, login, username, about, id, photoUrl, timeInMinutes }) => {

	const location = useLocation().pathname;

	let modalHeading = 'Редактирование пользователя';
	let buttonText = 'Сохранить';
	let defaultForm = {
		about: about,
		photoUrl: photoUrl,
		username: username,
	}

	if (location === `${AppRoute.TASK_VIEW}/${id}`) {
		modalHeading = 'Запись о работе';
		buttonText = 'Добавить';
		defaultForm = {
			comment: '',
			time: 0
		}
	}

	const handleClose = (evt) => {
		evt.preventDefault();
		setIsActive(!isActive);
	}

	const [form, setForm] = useState(defaultForm);
	const [unit, setUnit] = useState('');
	const [modalValue, setModalValue] = useState('');

	const handleFieldChange = (evt) => {
		evt.preventDefault();
		const { name, value } = evt.target;
		setForm({ ...form, [name]: value })
	}

	const handleSubmitUser = (evt) => {
		evt.preventDefault();
		users.id = id;
		users.editUser({
			...form,
			login: login,
			password: localStorage.password,
			id: id
		})
		handleClose(evt);
	}

	const handleSubmitTask = (evt) => {
		let timeInMinutes;
		if (unit === 'hours') {
			timeInMinutes = form.time * 60;
		} else {
			timeInMinutes = form.time;
		}
		evt.preventDefault();
		tasks.addTaskWorktime(id, {
			timeInMinutes: timeInMinutes,
			comment: form.comment,
			currentUser: localStorage.authUserId
		})
		handleClose(evt);
		evt.target.reset();
		setModalValue('');
		setForm({
			comment: '',
			time: form.time
		})
	}

	return (
		<form className={`modal ${isActive && 'modal-active'}`} onSubmit={location === `${AppRoute.TASK_VIEW}/${id}` ? handleSubmitTask : handleSubmitUser} >
			<div className='modal-wrapper'>
				<h2 className='modal-heading'>{modalHeading}</h2>
				<div className='modal-inner'>
					{location === `${AppRoute.TASK_VIEW}/${id}`
						?
						<>
							<label className='label-text' htmlFor='time'>Затраченное время</label>
							<input className='form-input' id='time' placeholder='Введите число' name='time' onChange={handleFieldChange} type='number' required></input>
							<div className='modal-dropdown'>
								<label className='label-text' htmlFor='units'>Единицы измерения</label>
								<FilterDropdown
									dropdownType={DropdownTypes.units}
									dropdownInputs={Units}
									setField={setUnit}
									modalValue={modalValue}
									setModalValue={setModalValue}
									inputType='radio'
									arrOfValues={[unit]}
								/>
							</div>
							<label className='label-text' htmlFor='comment'>Комментарий</label>
							<textarea className='text-field' id='comment' placeholder='Введите текст' name='comment' onChange={handleFieldChange}></textarea>
						</>
						:
						<>
							<label className='label-text' htmlFor='user-name'>Имя пользователя</label>
							<input className='form-input' id='user-name' placeholder='Введите имя' name='username' onChange={handleFieldChange} defaultValue={username}></input>
							<label className='label-text' htmlFor='user-photo'>URL фотографии</label>
							<input className='form-input' id='user-photo' placeholder='Введите URL' name='photoUrl' onChange={handleFieldChange}></input>
							<label className='label-text' htmlFor='user-info'>О себе</label>
							<textarea className='text-field' id='user-info' placeholder='Введите текст' name='about' defaultValue={about} onChange={handleFieldChange}></textarea>
						</>
					}

				</div>
				<div className='modal-buttons'>
					<button className='button button-primary' type='submit'>{buttonText}</button>
					<button className='button button-default' type='button' onClick={handleClose}>Отмена</button>
				</div>
			</div>
		</form>
	)
}

export default Modal;