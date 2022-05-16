import React from 'react';
import './pagination.scss';
import { tasks } from '../../store/store';
import { observer } from 'mobx-react-lite';
import PaginationButton from '../pagination-button/pagination-button';

const Pagination = observer(({ total, limit, setPage, page, dataLength }) => {

	const buttonQuantity = Math.ceil(total / limit);
	const emptyArr = new Array(buttonQuantity);
	const pages = [...emptyArr.keys()];

	const handleBack = (evt) => {
		evt.preventDefault();
		setPage(page -= 1);
	}

	const handleForward = (evt) => {
		evt.preventDefault();
		setPage(page += 1);
	}
	const shownFrom = (page + 1) * limit - limit + 1;
	const shownTo = (page + 1) * limit;

	return (
		<div className='pagination'>
			<ul className='pagination-list'>
				<li className='pagination-item'>
					<button className='button button-default button-pagination' type='button' disabled={page === 0} onClick={handleBack}>Назад</button>
				</li>
				{total === 0 &&
					<li className='pagination-item'>
						<button className='button button-primary button-pagination' type='button' value='0'>1</button>
					</li>}
				{pages.map(pageNum => <PaginationButton pageNum={pageNum} key={pageNum} setPage={setPage} page={page} />)}
				<li className='pagination-item'>
					<button className='button button-default button-pagination' type='button' disabled={page === pages.length - 1 || pages.length === 0} onClick={handleForward}>Вперед</button>
				</li>
			</ul>
			<span className='label-text label-text-pagination'>{`Показано ${shownFrom} - ${shownTo <= total ? shownTo : total} из ${total}`}</span>
		</div>
	)
})

export default Pagination;