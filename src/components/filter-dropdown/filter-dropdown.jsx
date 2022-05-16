import React from 'react';
import DropdownItem from '../dropdown-item/dropdown-item';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './filter-dropdown.scss';
import '../../scss/blocks/form-input.scss';
import { AppRoute } from '../../const';
import App from '../../app/app';

const FilterDropdown = observer(({ dropdownInputs, dropdownType, inputType, setField, setUnit, defaultValue, modalValue, setModalValue }) => {

	const { id } = useParams();
	const location = useLocation().pathname;

	const [isClick, setIsClick] = useState(false);

	const handleClick = () => {
		setIsClick(!isClick);
	}

	document.addEventListener('click', (evt) => {
		if (evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'LABEL') {
			setIsClick(false);
		}
	});

	const [value, setValue] = useState(defaultValue);

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	return (
		<div className={`filter-dropdown ${isClick && 'filter-dropdown-active'}`}>
			<input className={`form-input filter-heading ${isClick && 'filter-heading-active'}`}
				placeholder={dropdownType}
				readOnly
				onClick={handleClick}
				value={location === `${AppRoute.TASK_VIEW}/${id}` ? modalValue : value ?? ''}
			>
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
								setValue={location === `${AppRoute.TASK_VIEW}/${id}` ? setModalValue : setValue}
								setField={setField}
								setUnit={setUnit}
								setModalValue={setModalValue}
								setIsClick={setIsClick} />)}
				</ul>
			}
		</div>
	)
})

export default FilterDropdown;