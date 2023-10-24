import {useTranslation} from 'react-i18next';

/**
 * i18next format hook function
 * @param defaultStyle default format style for useFormat function
 * @example
 * const f = useFormat('capitalize');
 * f('hello'); // Hello (capitalize = defaultStyle)
 * f('hello', 'capitalize'); // Hello
 * f('hello', null); // hello (null = no formatting used)
 */
export function useI18NFormat(
	defaultStyle?: 'capitalize' | 'lowercase' | 'uppercase',
): (key: string, style?: 'capitalize' | 'lowercase' | 'uppercase' | null) => string {
	const {t, i18n} = useTranslation();
	return (key: string, style?: 'capitalize' | 'lowercase' | 'uppercase' | null) => {
		if (style === null) {
			return t(key);
		}
		const currentStyle = style || defaultStyle;
		return currentStyle ? i18n.format(t(key), currentStyle) : t(key);
	};
}
