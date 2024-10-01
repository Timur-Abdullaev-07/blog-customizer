import styles from './index.module.scss';

export const Separator = (props: { color?: string }) => {
	return (
		<div className={styles.separator} style={{ background: props.color }}></div>
	);
};
