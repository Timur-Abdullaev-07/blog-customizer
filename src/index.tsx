import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { ArticleState, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type Style = {
	'--font-family': string;
	'--font-size': string;
	'--font-color': string;
	'--container-width': string;
	'--bg-color': string;
};

const App = () => {
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
		<div className={clsx(styles.main)} style={style as CSSProperties}>
			<ArticleParamsForm
				onSubmit={updateStyle}
				onReset={resetStyle}
				articleStyle={articleStyle}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
