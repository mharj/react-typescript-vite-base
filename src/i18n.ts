import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

void i18next
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		defaultNS: 'common',
		fallbackLng: 'en',
		supportedLngs: ['en', 'fi', 'sv'],
		interpolation: {
			escapeValue: false, // not needed for react!!
			formatSeparator: ',',
			format: function (value, format, _lng) {
				if (format === 'uppercase') return value.toUpperCase();
				if (format === 'lowercase') return value.toLowerCase();
				if (format === 'capitalize') return `${value.substr(0, 1).toUpperCase()}${value.substr(1)}`;
				return value;
			},
		},
		keySeparator: false, // we use content as keys
		ns: ['common'],
		parseMissingKeyHandler: (key: string) => {
			return process.env.NODE_ENV === 'development' ? '#' + key + '#' : key;
		},
		react: {
			useSuspense: false,
		},
		resources: {
			en: {
				todo: {
					completed: 'Completed',
					id: 'todo ID',
					title: 'title',
					user_id: 'user ID',
				},
				common: {
					broken: 'broken',
					eng: 'english',
					example: 'example',
					fatal_error: 'fatal error',
					fin: 'finnish',
					hello: 'hello',
					home: 'home',
					login: 'login',
					logout: 'logout',
					no: 'no',
					secret: 'secret',
					sve: 'swedish',
					world: 'world',
					yes: 'yes',
				},
			},
			fi: {
				todo: {
					completed: 'valmis',
					id: 'lista ID',
					title: 'otsikko',
					user_id: 'käyttäjä ID',
				},
				common: {
					broken: 'rikki',
					eng: 'englanti',
					example: 'esimerkki',
					fatal_error: 'vakava virhe',
					fin: 'suomi',
					hello: 'hei',
					home: 'koti',
					login: 'kirjaudu sisään',
					logout: 'kirjaudu ulos',
					no: 'ei',
					secret: 'salainen',
					sve: 'ruotsi',
					world: 'maailma',
					yes: 'kyllä',
				},
			},
			sv: {
				todo: {
					completed: 'avslutad',
					id: 'lista ID',
					title: 'titel',
					user_id: 'användar ID',
				},
				common: {
					broken: 'bruten',
					eng: 'engelska',
					example: 'exempel',
					fatal_error: 'allvarligt fel',
					fin: 'finska',
					hello: 'hej',
					home: 'hem',
					login: 'anmelden',
					logout: 'abmelden',
					no: 'nej',
					secret: 'memlighet',
					sve: 'svenska',
					world: 'världen',
					yes: 'ja',
				},
			},
		},
	});
