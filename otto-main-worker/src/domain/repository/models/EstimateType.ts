import { z } from 'zod';

const ArtWork = z.object({
	code: z.string(),
	x: z.number(),
	z: z.number(),
	y: z.number(),
});

const ArtWorkInCrate = z.array(
	z.string().or(z.number()),
	z.number(),
	z.number(),
	z.number(),
	z.number(),
	z.string().optional(),
);

const Setup = z.object({
	axioX:	z.array(ArtWorkInCrate).or(z.undefined()),
	axioY:	z.array(ArtWorkInCrate).or(z.undefined()),
	x1:		z.number(),
	y1:		z.number(),
	x2:		z.number(),
	y2:		z.number(),
	prev:	z.number().optional(),
});

const Layer = z.array(ArtWorkInCrate.or(Setup)).or(ArtWorkInCrate.or(Setup));

const stdWorks = z.array(
	z.object({ layer1: Layer }).or(z.object({ layer2: Layer }))
		.or(z.object({ layer3: Layer }))
		.or(z.object({ layer4: Layer }))
		.or(z.object({ layer5: Layer }))
);

const works = z.array(ArtWorkInCrate);

const sameWorks = z.array(ArtWorkInCrate);

const crateAndWorks = z.array(z.number()).or(z.object({ works: stdWorks }));

const crates = z.object({
	crates: z.array(crateAndWorks)
});

const sameSize = z.object({
	crates: z.array(z.array(z.number()).or(z.object({ works: sameWorks }))).optional(),
	backUp: z.array(z.array(z.number()).or(z.object({ works: sameWorks }))),
});

const solved = z.object({ crates: z.array(z.array(z.number()).or(z.object({ works }))) });

const StandardCrate = crates;

const SameSizeCrate = sameSize;

export const SolvedList = z.object({
	reference: z.string(),
	list: z.array(ArtWork),
	crates: z.object({
		tubeCrate:		solved.optional(),
		noCanvasCrate:	solved.optional(),
		sameSizeCrate:	SameSizeCrate.optional(),
		standardCrate:	StandardCrate.optional(),
		largestCrate:	solved.optional(),
		allCrates:		z.array(z.array(z.number())),
		airCubTotal:	z.number(),
		whichAirPort:	z.tuple([
			z.object({ PAX: z.number() }), z.object({CARGO: z.number()})
		]),
	}),
});

const reference = z.string();

export type SolvedList = z.infer<typeof SolvedList>;
export type Reference = z.infer<typeof reference>;
