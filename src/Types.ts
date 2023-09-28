export interface Profile {
	name: string;
	planets: Record<Placement, PlacementData>;
	houses: Array<PlacementData>;
}

export interface PlacementData {
	sign: Sign;
	degrees: number;
}

export const enum Placement {
	Sun = 'Sun',
	Rising = 'Rising',
	Moon = 'Moon',
	Mercury = 'Mercury',
	Mars = 'Mars'
}

export const enum Sign {
	Aries = 'Aries',
	Taurus = 'Taurus',
	Gemini = 'Gemini',
	Cancer = 'Cancer',
	Leo = 'Leo',
	Virgo = 'Virgo',
	Libra = 'Libra',
	Scorpio = 'Scorpio',
	Sagittarius = 'Sagittarius',
	Capricorn = 'Capricorn',
	Aquarius = 'Aquarius',
	Pisces = 'Pisces'
}

export const enum Element {
	Earth = 'Earth',
	Water = 'Water',
	Fire = 'Fire',
	Air = 'Air'
}

export const enum Modality {
	Cardinal = 'Cardinal',
	Fixed = 'Fixed',
	Mutable = 'Mutable'
}

export const ElementFromSign: Record<Sign, Element> = {
	[Sign.Capricorn]: Element.Earth,
	[Sign.Taurus]: Element.Earth,
	[Sign.Virgo]: Element.Earth,

	[Sign.Pisces]: Element.Water,
	[Sign.Cancer]: Element.Water,
	[Sign.Scorpio]: Element.Water,

	[Sign.Aries]: Element.Fire,
	[Sign.Leo]: Element.Fire,
	[Sign.Sagittarius]: Element.Fire,

	[Sign.Aquarius]: Element.Air,
	[Sign.Gemini]: Element.Air,
	[Sign.Libra]: Element.Air
};

export const ModalityFromSign: Readonly<Record<Sign, Modality>> = {
	[Sign.Aries]: Modality.Cardinal,
	[Sign.Capricorn]: Modality.Cardinal,
	[Sign.Cancer]: Modality.Cardinal,
	[Sign.Libra]: Modality.Cardinal,

	[Sign.Leo]: Modality.Fixed,
	[Sign.Taurus]: Modality.Fixed,
	[Sign.Scorpio]: Modality.Fixed,
	[Sign.Aquarius]: Modality.Fixed,

	[Sign.Sagittarius]: Modality.Mutable,
	[Sign.Virgo]: Modality.Mutable,
	[Sign.Pisces]: Modality.Mutable,
	[Sign.Gemini]: Modality.Mutable
};

export const RelevantHouses: ReadonlyArray<number> = [1, 2, 5, 9, 10];
