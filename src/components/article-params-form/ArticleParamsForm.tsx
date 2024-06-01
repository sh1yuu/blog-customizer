import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Select } from '../select';
import { Text } from '../text';

import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import styles from './ArticleParamsForm.module.scss';

type ArticleStateProps = {
	setValue: Dispatch<SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({ setValue }: ArticleStateProps) => {
	const [open, setOpen] = useState(false);
	const [select, setSelect] = useState<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLDivElement>(null);

	const arrowButtonHandler = () => {
		setOpen(!open);
	};

	const handleOnChange = (option: keyof ArticleStateType) => {
		return (selected: OptionType) => {
			setSelect((state) => ({
				...state,
				[option]: selected,
			}));
		};
	};

	return (
		<>
			<ArrowButton onClick={arrowButtonHandler} open={open} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, open && styles.container_open)}>
				<form className={styles.form}>
					<Text uppercase as='h2' align='left' weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={select.fontFamilyOption}
						onChange={handleOnChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={select.fontSizeOption}
						name='шрифт'
						onChange={handleOnChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={select.fontColor}
						onChange={handleOnChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={select.backgroundColor}
						onChange={handleOnChange('backgroundColor')}
					/>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={select.contentWidth}
						onChange={handleOnChange('contentWidth')}
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
