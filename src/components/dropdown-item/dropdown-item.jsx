import React from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useState } from 'react';
import './dropdown-item.scss';

const DropdownItem = observer(({ itemValue, itemKey, inputType, setValue, setIsClick, setField, arrOfValues, itemKeyIndex }) => {
	const location = useLocation().pathname;

	const handleChoose = (evt) => {
		if (location === AppRoute.TASKS) {
			const id = evt.target.id;
			const index = arrOfValues.indexOf(id);
			if (index === -1) {
				setField([...arrOfValues, id]);
			} else {
				setField([...arrOfValues.slice(0, index), ...arrOfValues.slice(index + 1)]);
			}
		} else {
			setValue(evt.target.value);
			setField(evt.target.id);
			setIsClick(false);
		}
	}

	return (
		<li className='input-item'>
			<input className='input-checkbox visually-hidden' type={inputType} id={itemKey} name={inputType} value={itemValue} onChange={handleChoose} checked={itemKeyIndex !== -1}></input>
			<label className='input-label' htmlFor={itemKey}>{itemValue}</label>
		</li >
	)
})

export default DropdownItem;