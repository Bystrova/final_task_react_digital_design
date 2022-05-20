import React from 'react';
import CardEdit from '../../components/card-edit/card-edit';
import Header from '../../components/header/header';
import '../../scss/blocks/board.scss';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const CardForm = observer(() => {

	const { id } = useParams();

	return (
		<>
			<Header />
			<main className='center'>
				<CardEdit id={id} />
			</main>
		</>
	)
})

export default CardForm;