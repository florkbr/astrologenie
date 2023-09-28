import { Placement, Sign } from './Types';
import {
	mdiArrowUpBold,
	mdiGenderMale,
	mdiGenderMaleFemaleVariant,
	mdiMoonWaningCrescent,
	mdiWeatherSunny,
	mdiZodiacAquarius,
	mdiZodiacAries,
	mdiZodiacCancer,
	mdiZodiacCapricorn,
	mdiZodiacGemini,
	mdiZodiacLeo,
	mdiZodiacLibra,
	mdiZodiacPisces,
	mdiZodiacSagittarius,
	mdiZodiacScorpio,
	mdiZodiacTaurus,
	mdiZodiacVirgo
} from '@mdi/js';

export const mdiPathMap: Record<Placement | Sign, string> = {
	[Placement.Sun]: mdiWeatherSunny,
	[Placement.Rising]: mdiArrowUpBold,
	[Placement.Moon]: mdiMoonWaningCrescent,
	[Placement.Mercury]: mdiGenderMaleFemaleVariant,
	[Placement.Mars]: mdiGenderMale,
	[Sign.Aries]: mdiZodiacAries,
	[Sign.Taurus]: mdiZodiacTaurus,
	[Sign.Gemini]: mdiZodiacGemini,
	[Sign.Cancer]: mdiZodiacCancer,
	[Sign.Leo]: mdiZodiacLeo,
	[Sign.Virgo]: mdiZodiacVirgo,
	[Sign.Libra]: mdiZodiacLibra,
	[Sign.Scorpio]: mdiZodiacScorpio,
	[Sign.Sagittarius]: mdiZodiacSagittarius,
	[Sign.Capricorn]: mdiZodiacCapricorn,
	[Sign.Aquarius]: mdiZodiacAquarius,
	[Sign.Pisces]: mdiZodiacPisces
};
