import { dev } from '$app/environment';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

type LoadInput = {
	params: {
		name: string;
	};
};

export function load(input: LoadInput) {
	return {
		name: input.params.name
	};
}
