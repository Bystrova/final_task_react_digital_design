import React from 'react';
import FilterDropdown from '../filter-dropdown/filter-dropdown';
import { Types, Ranks, DropdownTypes, AppRoute } from '../../const';
import { observer } from 'mobx-react-lite';
import { users, tasks, authUserId } from '../../store/store';
import { useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

	if (id) {
		tasks.id = id;
		const { taskData } = tasks;
		const { type, rank, title, description, assignedId } = taskData;

		defaultTitle = title;
		defaultDescription = description;
		defaultType = type;
		defaultRank = rank;
		defaultId = assignedId;

		const assignedUser = allUsersDataSorted.find(user => defaultId === user.id);
		if (assignedUser) {
			assignedUsername = assignedUser.username;
		}
	}

	const history = useHistory();

	const textFieldState = {
		'title': defaultTitle,
		'description': defaultDescription,
	};
	const [textField, setTextField] = useState(textFieldState);
	const [taskRank, setRank] = useState(defaultRank);
	const [taskType, setType] = useState(defaultType);
	const [taskAssignedId, setAssignedId] = useState(defaultId);

	useEffect(() => {
		setTextField(textFieldState)
		setRank(defaultRank);
		setType(defaultType);
		setAssignedId(defaultId)
	}, [defaultRank, defaultType, defaultId, textFieldState.title, textFieldState.description]);

	const handleFieldChange = (evt) => {
		const { name, value } = evt.target;
		setTextField({ ...textField, [name]: value });
	}

	const location = useLocation().pathname;
	let addOrEditTask = '';
	location === AppRoute.TASK_ADD ? addOrEditTask = 'addTask' : addOrEditTask = 'editTask';

	const handleSubmit = (evt) => {
		let taskId = '';
		if (id) {
			taskId = id;
		}
		evt.preventDefault();
		tasks[addOrEditTask]({
			...textField,
			'userId': authUserId,
			'assignedId': taskAssignedId,
			'type': taskType,
			'rank': taskRank,
			'id': taskId
		});
		history.goBack();
	}

	return (
		<form className='board' onSubmit={handleSubmit}>
			<section className='board-top'>
				<h1 className='board-heading'>{id ? 'Редактирование' : 'Создание'}</h1>
				<div className='board-heading-wrapper'>
					<button className='button button-primary' type='submit'>{id ? 'Сохранить' : 'Добавить'}</button>
					<button className='button button-default' type='button' onClick={() => history.goBack()}>Отмена</button>
				</div>
			</section>
			<section className='board-wrapper'>
				<section className='card-wrapper'>
					<div className='card-info'>
						<dl className='card-info-list'>
							<dt className='label-text'>Исполнитель</dt>
							<dd className='text'>
								<FilterDropdown
									dropdownInputs={allUsersDataSorted}
									dropdownType={DropdownTypes.executor}
									inputType='radio'
									setField={setAssignedId}
									defaultValue={assignedUsername}
									arrOfValues={[taskAssignedId]} />
							</dd>
							<dt className='label-text'>Тип запроса</dt>
							<dd className='text'>
								<FilterDropdown
									dropdownInputs={Types}
									dropdownType={DropdownTypes.type}
									inputType='radio'
									setField={setType}
									defaultValue={Types[defaultType]}
									arrOfValues={[taskType]} />
							</dd>
							<dt className='label-text'>Приоритет</dt>
							<dd className='text'>
								<FilterDropdown
									dropdownInputs={Ranks}
									dropdownType={DropdownTypes.rank}
									inputType='radio'
									setField={setRank}
									defaultValue={Ranks[defaultRank]}
									arrOfValues={[taskRank]} />
							</dd>
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
							value={textField.title ?? ''}
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
							value={textField.description ?? ''}
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