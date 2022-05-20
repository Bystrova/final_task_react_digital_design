import React from 'react';
import DropdownItem from '../dropdown-item/dropdown-item';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './filter-dropdown.scss';
import '../../scss/blocks/form-input.scss';
import { AppRoute } from '../../const';
import { useDetectClickOutside } from 'react-detect-click-outside';

const FilterDropdown = observer(({ dropdownInputs, dropdownType, inputType, setField, setUnit, defaultValue, modalValue, setModalValue, arrOfValues }) => {

	const { id } = useParams();
	const location = useLocation().pathname;

	const [isClick, setIsClick] = useState(false);

	const handleClick = () => {
		setIsClick(!isClick);
	}

	const handleClose = () => {
		setIsClick(false);
	}
	const ref = useDetectClickOutside({ onTriggered: handleClose });



	// document.addEventListener('click', (evt) => {
	// 	if (evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'LABEL') {
	// 		setIsClick(false);
	// 	}
	// });



	const [value, setValue] = useState(defaultValue);

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	const getArrLength = (dataStructure) => {
		return Array.isArray(dataStructure) ? dataStructure.length : Object.keys(dataStructure).length;
	}

	let inputValue = value ?? '';
	if (location === `${AppRoute.TASK_VIEW}/${id}`) {
		inputValue = modalValue;
	} else if (location === AppRoute.TASKS) {
		if (arrOfValues.length > 0 && arrOfValues.length < getArrLength(dropdownInputs)) {
			inputValue = `Выбрано: ${arrOfValues.length}`;
		} else if (arrOfValues.length === getArrLength(dropdownInputs)) {
			inputValue = `Выбраны все`;
		}
	}

	return (
		<div className={`filter-dropdown ${isClick && 'filter-dropdown-active'}`} ref={ref}>
			<input className={`form-input filter-heading ${isClick && 'filter-heading-active'}`}
				placeholder={dropdownType}
				readOnly
				onClick={handleClick}
				value={inputValue}
			/>
			{isClick &&
				<div className='dropdown-wrapper dropdown-wrapper-show'>
					<ul className='input-list'>
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
									arrOfValues={arrOfValues}
									setIsClick={setIsClick}
									itemKeyIndex={arrOfValues.indexOf(dropdownInput.id)}
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
									arrOfValues={arrOfValues}
									setIsClick={setIsClick}
									itemKeyIndex={arrOfValues.indexOf(itemKey)} />)}
					</ul>
				</div>
			}
		</div>
	)
})

export default FilterDropdown;