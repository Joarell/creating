import { z } from 'zod';

export const UserInfo = z.object({
	userName: z.string(),
	passFrase: z.string(),
	email: z.string().optional(),
	lastName: z.string().optional(),
	companyName: z.string().optional(),
	birthDay: z.string().optional(),
	access: z.string().optional(),
});

const DBUser = z.tuple([ z.object({
	id: z.string(),
	name: z.string(),
	last_name: z.string(),
	company_name: z.string(),
	birth_data: z.string(),
	email: z.string(),
	pass_frase: z.string(),
	auth_token: z.string(),
	refresh_token: z.string(),
	created: z.string(),
	active_session: z.string(),
	grant_access: z.string(),
})]);

const ArtWork = z.object({
	code: z.string(),
	x: z.number(),
	z: z.number(),
	y: z.number(),
});


const Setup = z.object({
	axioX: z.array(ArtWork).optional(),
	axioY: z.array(ArtWork).optional(),
	x1: z.number(),
	y1: z.number(),
	x2: z.number(),
	y2: z.number(),
});

const ArtWorkCrated = z.tuple([
	z.string(),
	z.number(),
	z.number(),
	z.number(),
	z.number(),
	Setup,
]);

const ArtWorkCratedMany = z.array(z.tuple([
	z.string(),
	z.number(),
	z.number(),
	z.number(),
	z.number(),
	Setup,
]));

const Works = z.tuple([
	z.object({
		layer1: z.array(ArtWorkCrated || ArtWorkCratedMany),
		layer2: z.array(ArtWorkCrated || ArtWorkCratedMany).optional(),
		layer3: z.array(ArtWorkCrated || ArtWorkCratedMany).optional(),
		layer4: z.array(ArtWorkCrated || ArtWorkCratedMany).optional(),
		layer5: z.array(ArtWorkCrated || ArtWorkCratedMany).optional(),
	})
]);

const StandardCrate = z.tuple([
	z.array(z.number()),
	z.object({ Works })
])

export const SolvedList = z.object({
	reference: z.string(),
	list: z.tuple([ArtWork]),
	crates: z.object({
		StandardCrate: StandardCrate.optional(),
	}),
});

export type Estimate = z.infer<typeof SolvedList>;
export type User = z.infer<typeof UserInfo>;
export type UserDB = z.infer<typeof DBUser>;
