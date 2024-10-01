import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
import React from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = (e: React.MouseEvent) => void;

type propsArrowButton = {
	onClick?: OnClick;
	isOpen: boolean;
};

export const ArrowButton = (props: propsArrowButton) => {
	const containerStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: props.isOpen,
	});

	const arrowStyle = clsx({
		[styles.arrow]: true,
		[styles.arrow_open]: props.isOpen,
	});

	return (
		<div
			onClick={props.onClick}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={containerStyle}>
			<img src={arrow} alt='иконка стрелочки' className={arrowStyle} />
		</div>
	);
};
