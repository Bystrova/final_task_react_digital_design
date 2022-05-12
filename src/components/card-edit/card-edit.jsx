import React from 'react';
import FilterDropdown from '../filter-dropdown/filter-dropdown';
import { Types, Ranks, DropdownTypes, AppRoute } from '../../const';
import { observer } from 'mobx-react-lite';
import { users, tasks, logIn, authUserId } from '../../store/store';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../../scss/blocks/form-input.scss';
import '../../scss/blocks/text-field.scss';

const CardEdit = observer(({ id }) => {

	const { allUsersDataSorted } = users;
	let assignedUsername = '';

	let defaultTitle = '';
	let defaultDescription = '';
	let defaultType = '';
	let defaultRank = '';
	let defaultId = '';

	if (id !== undefined) {
		tasks.id = id;
		const { taskData } = tasks;
		const { type, rank, title, description, assignedId } = taskData;

		defaultTitle = title;
		defaultDescription = description;
		defaultType = type;
		defaultRank = rank;
		defaultId = assignedId;

		const assignedUser = allUsersDataSorted.find(user => defaultId === user.id);
		if (assignedUser !== undefined) {
			assignedUsername = assignedUser.username;
		}
	}

	const history = useHistory();

	const [textField, setTextField] = useState({
		'title': defaultTitle,
		'description': defaultDescription,
	})

	const [taskRank, setRank] = useState(defaultRank)
	const [taskType, setType] = useState(defaultType)
	const [taskAssignedId, setAssignedId] = useState(defaultId)

	const handleFieldChange = (evt) => {
		const { name, value } = evt.target;
		setTextField({ ...textField, [name]: value });
	}

	const handleSubmit = (evt) => {
		evt.preventDefault();
		tasks.addOrEditTask({
			...textField,
			'userId': authUserId,
			'assignedId': taskAssignedId,
			'type': taskType,
			'rank': taskRank
		})
		history.goBack()
	}

	return (
		<form className='board' onSubmit={handleSubmit}>
			<section className='board-top'>
				<h1 className='board-heading'>{id ? 'Редактирование' : 'Создание'}</h1>
				<div className='board-heading-wrapper'>
					<button className='button button-primary' type='submit'>{id ? 'Сохранить' : 'Добавить'}</button>
					<button className='button button-default' onClick={() => history.goBack()}>Отмена</button>
				</div>
			</section>
			<section className='board-wrapper'>
				<section className='card-wrapper'>
					<div className='card-info'>
						<dl className='card-info-list'>
							<dt className='label-text'>Исполнитель</dt>
							<dd className='text'><FilterDropdown dropdownInputs={allUsersDataSorted} dropdownType={DropdownTypes.executor} inputType='radio' setField={setAssignedId} defaultValue={assignedUsername} /></dd>
							<dt className='label-text'>Тип запроса</dt>
							<dd className='text'><FilterDropdown dropdownInputs={Types} dropdownType={DropdownTypes.type} inputType='radio' setField={setType} defaultValue={Types[defaultType]} /></dd>
							<dt className='label-text'>Приоритет</dt>
							<dd className='text'><FilterDropdown dropdownInputs={Ranks} dropdownType={DropdownTypes.rank} inputType='radio' setField={setRank} defaultValue={Ranks[defaultRank]} /></dd>
						</dl>
					</div>
					<div className='card-description'>
						<label
							className='label-text'
							htmlFor='name'
						>Название
						</label>
						<input
							className='form-input'
							type='text'
							name='title'
							autoComplete='off'
							placeholder='Текст названия'
							defaultValue={defaultTitle}
							required
							onChange={handleFieldChange}
						>
						</input>
						<label
							className='label-text'
							htmlFor='description'
						>Описание
						</label>
						<textarea
							className='text-field text-field-description'
							name='description'
							placeholder='Текст описания'
							defaultValue={defaultDescription}
							required
							onChange={handleFieldChange}
						>
						</textarea>
					</div>
				</section>
			</section>
		</form >





	)
})

export default CardEdit;