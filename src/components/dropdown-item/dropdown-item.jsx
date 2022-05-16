import React from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import './dropdown-item.scss';

const DropdownItem = observer(({ itemValue, itemKey, inputType, setValue, setIsClick, setField }) => {
	const location = useLocation().pathname;
	const handleChoose = (evt) => {
		// if ('lalala') {

		// } else {
		setValue(evt.target.value);
		setField(evt.target.id); //ошибка setField is not a function
		setIsClick(false);
		// }

	}

	return (
		<li className='input-item'>
			<input className='input-checkbox visually-hidden' type={inputType} id={itemKey} name={inputType} value={itemValue} onChange={handleChoose}></input>
			<label className='input-label' htmlFor={itemKey}>{itemValue}</label>
		</li >
	)
})

export default DropdownItem;