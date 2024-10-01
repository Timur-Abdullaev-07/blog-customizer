import { CSSProperties, useState } from 'react';
import { ArticleState, defaultArticleState } from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';
import styles from './App.module.scss';

export type Style = {
	'--font-family': string;
	'--font-size': string;
	'--font-color': string;
	'--container-width': string;
	'--bg-color': string;
};

export const App = () => {
	const [articleStyle, setStyle] = useState<ArticleState>(defaultArticleState);

	const updateStyle = (newStyle: Partial<ArticleState>) => {
		setStyle((prevStyle) => {
			return { ...prevStyle, ...newStyle };
		});
	};

	const resetStyle = () => {
		setStyle(defaultArticleState);
	};

	const style = {
		'--font-family': articleStyle.fontFamilyOption.value,
		'--font-size': articleStyle.fontSizeOption.value,
		'--font-color': articleStyle.fontColor.value,
		'--container-width': articleStyle.contentWidth.value,
		'--bg-color': articleStyle.backgroundColor.value,
	};

	return (
		<main className={styles.main} style={style as CSSProperties}>
			<ArticleParamsForm
				onSubmit={updateStyle}
				onReset={resetStyle}
				articleStyle={articleStyle}
			/>
			<Article />
		</main>
	);
};
