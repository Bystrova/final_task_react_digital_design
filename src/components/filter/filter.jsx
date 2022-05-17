import React from 'react';
import './filter.scss';
import FilterDropdown from '../filter-dropdown/filter-dropdown';
import { DropdownTypes, Types, Statuses, Ranks } from '../../const';
import { users, tasks } from '../../store/store';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import isEqual from 'lodash.isequal';

const Filter = observer(({ page }) => {

	const { allUsersDataSorted } = users;
	const { taskLimit } = tasks;

	const [arrOfUsers, setArrOfUsers] = useState([]);
	const [arrOfTypes, setArrOfTypes] = useState([]);
	const [arrOfStatuses, setArrOfStatuses] = useState([]);
	const [arrOfRanks, setArrOfRanks] = useState([]);
	const [filterInput, setFilterInput] = useState('');

	const handleSubmitFilter = (evt) => {
		evt.preventDefault();
		tasks.tasksFilter.filter.type = arrOfTypes;
		tasks.tasksFilter.filter.assignedUsers = arrOfUsers;
		tasks.tasksFilter.filter.rank = arrOfRanks;
		tasks.tasksFilter.filter.status = arrOfStatuses;
		tasks.tasksFilter.filter.query = filterInput;
	}

	return (
		<form className='filter' onSubmit={handleSubmitFilter}>
			<ul className='filter-list'>
				<li className='filter-type'>
					<FilterDropdown
						dropdownType={DropdownTypes.type}
						dropdownInputs={Types}
						inputType='checkbox'
						setField={setArrOfTypes}
						arrOfValues={arrOfTypes}
					/>
				</li>
				<li className='filter-name'>
					<input className='form-input' placeholder='Название задачи' onChange={(evt) => setFilterInput(evt.target.value)}></input>
				</li>
				<li className='filter-user'>
					<FilterDropdown
						dropdownType={DropdownTypes.executor}
						dropdownInputs={allUsersDataSorted}
						setField={setArrOfUsers}
						arrOfValues={arrOfUsers}
						inputType='checkbox' />
				</li>
				<li className='filter-status'>
					<FilterDropdown
						dropdownType={DropdownTypes.status}
						dropdownInputs={Statuses}
						setField={setArrOfStatuses}
						arrOfValues={arrOfStatuses}
						inputType='checkbox' />
				</li>
				<li className='filter-priority'>
					<FilterDropdown
						dropdownType={DropdownTypes.rank}
						dropdownInputs={Ranks}
						setField={setArrOfRanks}
						arrOfValues={arrOfRanks}
						inputType='checkbox' /></li>
			</ul>
			<button className='button button-primary' type='submit'>Применить</button>
		</form >
	)
})

export default Filter;

