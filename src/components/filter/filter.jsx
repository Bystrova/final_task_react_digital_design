import React from 'react';
import './filter.scss';
import FilterDropdown from '../filter-dropdown/filter-dropdown';
import { DropdownTypes, Types, Statuses, Ranks } from '../../const';
import { users } from '../../store/store';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';

const Filter = observer(() => {

	const { allUsersDataSorted } = users;

	const [field, setField] = useState('');
	// console.log(field)

	return (
		<form className='filter'>
			<ul className='filter-list'>
				<li className='filter-type'>
					<FilterDropdown
						dropdownType={DropdownTypes.type}
						dropdownInputs={Types}
						inputType='checkbox'
						setField={setField} />
				</li>
				<li className='filter-name'>
					<input className='form-input' placeholder='Название задачи'></input>
				</li>
				<li className='filter-user'>
					<FilterDropdown
						dropdownType={DropdownTypes.executor}
						dropdownInputs={allUsersDataSorted}
						inputType='checkbox' />
				</li>
				<li className='filter-status'>
					<FilterDropdown
						dropdownType={DropdownTypes.status}
						dropdownInputs={Statuses}
						inputType='checkbox' />
				</li>
				<li className='filter-priority'>
					<FilterDropdown
						dropdownType={DropdownTypes.rank}
						dropdownInputs={Ranks}
						inputType='checkbox' /></li>
			</ul>
			<button className='button button-primary' type='submit'>Применить</button>
		</form >
	)
})

export default Filter;

