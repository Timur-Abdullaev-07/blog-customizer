import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useRef, useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	ArticleState,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from 'components/text';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { useEnterSubmit } from '../select/hooks/useEnterSubmit';

type PropsArticleParamsForm = {
	onSubmit: (newStyle: Partial<ArticleState>) => void;
	onReset: () => void;
	articleStyle: ArticleState;
};

export const ArticleParamsForm = (props: PropsArticleParamsForm) => {
	const [formIsOpen, setFromIsOpen] = useState(false);
	const [newStyle, setNewStyle] = useState<Partial<ArticleState>>({});
	const rootRef = useRef<HTMLDivElement | null>(null);

	const containerStyle = clsx({
		[styles.container]: true,
		[styles.containerOpen]: formIsOpen,
	});

	const onClose = () => {
		setNewStyle({});
		setFromIsOpen(false);
	};

	const changeFontFamily = (selected: OptionType) => {
		setNewStyle({ ...newStyle, fontFamilyOption: selected });
	};

	const changeFontSize = (selected: OptionType) => {
		setNewStyle({ ...newStyle, fontSizeOption: selected });
	};

	const changeFontColor = (selected: OptionType) => {
		setNewStyle({ ...newStyle, fontColor: selected });
	};

	const changeBackgroundColor = (selected: OptionType) => {
		setNewStyle({ ...newStyle, backgroundColor: selected });
	};

	const changeСontentWidth = (selected: OptionType) => {
		setNewStyle({ ...newStyle, contentWidth: selected });
	};

	useOutsideClickClose({
		isOpen: formIsOpen,
		rootRef: rootRef,
		onClose: onClose,
	});

	useEnterSubmit({
		placeholderRef: rootRef,
		onChange: setFromIsOpen,
	});

	return (
		<>
			<ArrowButton
				onClick={(e) => {
					e.stopPropagation();
					setNewStyle({});
					setFromIsOpen((prev) => !prev);
				}}
				isOpen={formIsOpen}
			/>
			<aside ref={rootRef} className={containerStyle}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						props.onSubmit(newStyle);
					}}
					onReset={() => {
						props.onReset();
						setNewStyle({});
					}}>
					<Text size={31} weight={800} uppercase>
						{'ЗАДАЙТЕ ПАРАМЕТРЫ'}
					</Text>
					<Select
						selected={
							newStyle.fontFamilyOption || props.articleStyle.fontFamilyOption
						}
						options={fontFamilyOptions}
						title='ШРИФТ'
						onChange={changeFontFamily}
					/>
					<RadioGroup
						selected={
							newStyle.fontSizeOption || props.articleStyle.fontSizeOption
						}
						options={fontSizeOptions}
						title='РАЗМЕР ШРИФТА'
						name='РАЗМЕР ШРИФТА'
						onChange={changeFontSize}
					/>
					<Select
						selected={newStyle.fontColor || props.articleStyle.fontColor}
						options={fontColors}
						title='ЦВЕТ ШРИФТА'
						onChange={changeFontColor}
					/>
					<Separator color='#D7D7D7' />
					<Select
						selected={
							newStyle.backgroundColor || props.articleStyle.backgroundColor
						}
						options={backgroundColors}
						title='ЦВЕТ ФОНА'
						onChange={changeBackgroundColor}
					/>
					<Select
						selected={newStyle.contentWidth || props.articleStyle.contentWidth}
						options={contentWidthArr}
						title='ШИРИНА КОНТЕНТА'
						onChange={changeСontentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
