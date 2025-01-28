export interface iKVCommand {
	get userLoggingOut(): Promise<boolean>;
	get userSaveData(): Promise<boolean>;
};
