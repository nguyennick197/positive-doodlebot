export interface AnalyticsObject {
	message_count: number;
	commands: {
		[command: string]: number
	};
	args: {
		[arg: string]: number
	};
}
