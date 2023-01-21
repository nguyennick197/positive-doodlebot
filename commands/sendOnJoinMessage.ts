import { MessageEmbed, TextChannel, Guild} from 'discord.js';
import { helpFields } from '../utils/constants';

export function sendOnJoinMessage(guild: Guild){
    const channel = guild.channels.cache.find(channel => 
		channel.type === 'GUILD_TEXT' && 
		(guild.me ? channel.permissionsFor(guild.me).has('SEND_MESSAGES') : false));
	const embed = new MessageEmbed()
		.setTitle(":purple_heart:  Thanks for inviting me! :purple_heart:")
		.setDescription("Here are some commonly used commands and questions to get you started:")
		.addFields(helpFields);
	(channel as TextChannel).send({ embeds: [embed] });
}