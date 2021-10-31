import * as Localization from "expo-localization";
import moment from 'moment'
import 'moment/locale/pl'
import 'moment/locale/fr'

const lang = Localization.locale;
moment.locale(lang)