import React from 'react';
import CardEdit from '../../components/card-edit/card-edit';
import Header from '../../components/header/header';
import '../../scss/blocks/board.scss';
import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import { tasks } from '../../store/store';
import { observer } from 'mobx-react-lite';

const CardForm = () => {

	const { id } = useParams();

	return (
		<>
			<Header />
			<main className='center'>
				<CardEdit id={id} />
			</main>
		</>
	)
}

export default CardForm;