import React from 'react';
import DropdownItem from '../dropdown-item/dropdown-item';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './filter-dropdown.scss';
import '../../scss/blocks/form-input.scss';
import { AppRoute } from '../../const';

const FilterDropdown = observer(({ dropdownInputs, dropdownType, inputType, setField, defaultValue }) => {

	const [isClick, setIsClick] = useState(false);

	const handleClick = () => {
		setIsClick(!isClick);
	}

	document.addEventListener('click', (evt) => {
		if (evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'LABEL') {
			setIsClick(false);
		}
	});

	const location = useLocation().pathname;



	const [value, setValue] = useState(defaultValue)

	// console.log(value)


	return (
		<section className={`filter-dropdown ${isClick && 'filter-dropdown-active'}`}>
			<input className={`form-input filter-heading ${isClick && 'filter-heading-active'}`}
				placeholder={dropdownType}
				readOnly
				onClick={handleClick}
				defaultValue={value}>
			</input>
			{isClick &&
				<ul className='input-list input-list-show'>
					{Array.isArray(dropdownInputs)
						?
						dropdownInputs
							.map(dropdownInput => <DropdownItem
								itemValue={dropdownInput.username}
								key={dropdownInput.id}
								itemKey={dropdownInput.id}
								inputType={inputType}
								setValue={setValue}
								setField={setField}
								setIsClick={setIsClick}
							/>)
						:
						Object.keys(dropdownInputs)
							.map(itemKey => <DropdownItem
								itemValue={dropdownInputs[itemKey]}
								key={itemKey} itemKey={itemKey}
								inputType={inputType}
								setValue={setValue}
								setField={setField}
								setIsClick={setIsClick} />)}
				</ul>
			}
		</section>
	)
})

export default FilterDropdown;