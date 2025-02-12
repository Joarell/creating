import { z } from "zod";

export const UserInfoEntityData = z.object({
	id:				z.string(),
	name:			z.string(),
	last_name:		z.string(),
	company_name:	z.string(),
	birth_date:		z.string(),
	email:			z.string(),
	pass_phrase:		z.string(),
	auth_token:		z.string(),
	refresh_token:	z.string(),
	created:		z.string(),
	active_session:	z.string(),
	grant_access:	z.string(),
});

export const UserLogin = z.object({
	userName:		z.string(),
	passPhrase:		z.string(),
});

export const UserActiveData = z.object({
	userName:		z.string(),
	userLastName:	z.string(),
	birthday:		z.string(),
	passPhrase:		z.string(),
	ID:				z.string().optional(),
	companyName:	z.string(),
	email:			z.string(),
	access:			z.string(),
	authToken:		z.string(),
	refToken:		z.string(),
	session:		z.string(),
});

export const NewUser = z.object({
	userName:		z.string(),
	userLastName:	z.string(),
	passPhrase:		z.string(),
	birthday:		z.string(),
	email:			z.string(),
	companyName:	z.string(),
	access:			z.string(),
});

export const UserDataRequest = z.object({
	userName:	z.string(),
	session:	z.string(),
	authToken:	z.string(),
	refToken:	z.string(),
});

export type NewUser =				z.infer<typeof NewUser>;
export type UserLogin =				z.infer<typeof UserLogin>;
export type UserActiveData =		z.infer<typeof UserActiveData>;
export type UserDataRequest =		z.infer<typeof UserDataRequest>;
export type UserInfoEntityData =	z.infer<typeof UserInfoEntityData>;
