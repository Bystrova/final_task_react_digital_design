import React from 'react';
import './filter.scss';
import FilterDropdown from '../filter-dropdown/filter-dropdown';
import { DropdownTypes, Types, Statuses, Ranks } from '../../const';
import { users } from '../../store/store';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';

const Filter = observer(({ setFilter, setPage }) => {

	const { allUsersDataSorted } = users;

	const [arrOfUsers, setArrOfUsers] = useState([]);
	const [arrOfTypes, setArrOfTypes] = useState([]);
	const [arrOfStatuses, setArrOfStatuses] = useState([]);
	const [arrOfRanks, setArrOfRanks] = useState([]);
	const [filterInput, setFilterInput] = useState('');

	const handleSubmitFilter = (evt) => {
		evt.preventDefault();
		setPage(0);
		setFilter({
			query: filterInput,
			assignedUsers: arrOfUsers,
			userIds: [],
			type: arrOfTypes,
			status: arrOfStatuses,
			rank: arrOfRanks
		});

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

