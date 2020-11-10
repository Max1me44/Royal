/**
 * @CarqueMax
 * @version v1.0
 * Bot discord personnel
 */
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
client.login(config.token).catch(err => console.log("Token invalide"));
const prefix = config.prefix;
const ppbot = "https://i.ibb.co/VQs1mbF/Royal-Logo.png";
const activities_list = [
    prefix + "help", 
    "en dev ⚙",
];
const status_list = [
    "online",
    //"invisible",
    "idle",
    "dnd", 
];
const types_list = [
    "PLAYING", 
    "LISTENING",
    "WATCHING", 
];
client.on('ready', () => {
    console.log(`${client.user.tag} est connecté ✔ - ${client.users.cache.size} membres, dans ${client.channels.cache.size} channels de ${client.guilds.cache.size} serveurs défférents`);
    setInterval(() => {
        const random1 = Math.floor(Math.random() * activities_list.length);
        const random2 = Math.floor(Math.random() * types_list.length);
        client.user.setActivity(activities_list[random1], { type: types_list[random2] });
    }, 15000); // 15 secondes
    setInterval(() => {
        const random = Math.floor(Math.random() * status_list.length);
        client.user.setStatus(status_list[random]);
    }, 15000); // 15 secondes
})




// HELP COMMANDES
client.on("message", async message => {
    if (message.content === prefix + "help") {
        var help_embed = new Discord.MessageEmbed()
	        .setColor('#e4b400')
            .setDescription("```HELP " + client.user.username + "```")
            .setThumbnail(ppbot)
	        .addFields(
	        	{ name: prefix + "helpmod", value: 'Commandes modération', inline: true },
	        	{ name: prefix + "helpfun", value: 'Commandes fun', inline: true },
                { name: prefix + "helpother", value: 'Autres commandes', inline: true },
                { name: prefix + "helpall", value: 'Donne toutes les commandes', inline: true },
	        )
	        .setTimestamp()
            .setFooter(`${client.user.tag}`, ppbot)
        message.channel.send(help_embed);
    }

    var mod_embed = new Discord.MessageEmbed()
	    .setColor('#ff0000')
        .setDescription("```HELP MODÉRATION " + client.user.username + "```")
        .setThumbnail(ppbot)
	    .addFields(
            { name: prefix + "none", value: 'none', inline: true },
	    	// { name: prefix + "kick <membre>", value: 'Exclu un membre', inline: true },
	    	// { name: prefix + "ban <membre>", value: 'Banni un membre', inline: true },
            // { name: prefix + "clear <nombre de massage>", value: 'Efface un certain nombre de messages', inline: true },
            // { name: prefix + "mute <membre>", value: 'Mute un membre', inline: true },
            // { name: prefix + "unmute <membre>", value: 'Démute un membre', inline: true },
            // { name: prefix + "dm <membre> <message>", value: 'Envoie message à un membre', inline: true },
            // { name: prefix + "dmall <massage>", value: 'Envoie message à all', inline: true },
	    )
	    .setTimestamp()
        .setFooter(`${client.user.tag}`, ppbot)

    var fun_embed = new Discord.MessageEmbed()
	    .setColor('#ff00ec')
        .setDescription("```HELP FUN " + client.user.username + "```")
        .setThumbnail(ppbot)
	    .addFields(
            { name: prefix + "8ball <question>", value: 'Le bot te répond', inline: true },
	    )
	    .setTimestamp()
        .setFooter(`${client.user.tag}`, ppbot)

    var other_embed = new Discord.MessageEmbed()
	    .setColor('#00ff6d')
        .setDescription("```HELP OTHER " + client.user.username + "```")
        .setThumbnail(ppbot)
	    .addFields(
	    	{ name: prefix + "invite", value: 'Invite le bot sur tes serveurs', inline: true },
            { name: prefix + "botstats", value: 'Infos sur le bot', inline: true },
            { name: prefix + "userstats <membre>", value: 'Infos sur ton compte', inline: true },
            { name: prefix + "pp <membre>", value: 'Photo de profil discord', inline: true },
            { name: prefix + "servstats", value: 'Infos sur ce serveur', inline: true },
            { name: prefix + "ping", value: 'Ping du bot', inline: true },
	    )
	    .setTimestamp()
        .setFooter(`${client.user.tag}`, ppbot)

    if (message.content.startsWith(prefix + "helpmod")) {
        message.channel.send(mod_embed);
    }
    if (message.content.startsWith(prefix + "helpfun")) {
        message.channel.send(fun_embed);
    }
    if (message.content.startsWith(prefix + "helpother")) {
        message.channel.send(other_embed);
    }
    if (message.content.startsWith(prefix + "helpall")) {
        message.channel.send(mod_embed);
        message.channel.send(fun_embed);
        message.channel.send(other_embed);
    }
});


// GENERAL COMMANDES
client.on("message", async message => {
    if(message.content.startsWith(prefix + "invite")) {
        var invite_embed = new Discord.MessageEmbed()
            .setTitle("**Invite le bot sur un de tes serveurs**")
            .setDescription("Bot développé par <@398863083176722432> dans le but de s'entrainer en JavaScript. Il possède des commandes de modération :tools: , quelques petits jeux, ainsi que d'autre commandes sympa :bar_chart: .")
            .addField(":link: LIEN D'INVITATION :link:", "Invite le bot en cliquant sur __**[ce lien](https://discord.com/oauth2/authorize?client_id=770372006336004096&permissions=8&scope=bot)**__.")
            .setFooter(`${client.user.tag}`, ppbot)
        message.channel.send(invite_embed)
    }

    if(message.content.startsWith(prefix + "botstats")) {
        function conversion_seconde_heure() {
            // "process.uptime()" = fonction node pour avoir le temps en s
            // si reste= 123332221 alors 1427j 10h 57min 1s
            var reste= process.uptime();
            var result='';
            var nbJours=Math.floor(reste/(3600*24));
            reste -= nbJours*24*3600;
            var nbHours=Math.floor(reste/3600);
            reste -= nbHours*3600;
            var nbMinutes=Math.floor(reste/60);
            reste -= nbMinutes*60;
            var nbSeconds=reste;
            if(nbJours>0)
                result=result+nbJours+'j ';
            if(nbHours>0)
                result=result+nbHours+'h ';
            if(nbMinutes>0)
                result=result+nbMinutes+'min ';
            if(nbSeconds>0)
                result=result+nbSeconds+'s ';
            return result;
        }
        var botstats_embed = new Discord.MessageEmbed()
            .setTitle(`:pencil: Informations sur ${client.user.tag}`)
            .setDescription("--------------------------------------------")
            .addFields(
                { name: ":satellite: Actif sur :", value: client.guilds.cache.size + " serveur(s)", inline: true },
                { name: ":clipboard: Nom :", value: client.user.tag, inline: true },
                { name: ":bar_chart: Utilisateurs :", value: client.users.cache.size + " utilisateur(s)", inline: true },
                { name: ":desktop: Développeur :", value: "<@398863083176722432>", inline: true },
                { name: ":ping_pong: Ping du bot :", value: Math.round(client.ping) + " Milliseconds", inline: true },
                { name: ":symbols: Prefix :", value: "``" + prefix + "``", inline: true },
                { name: ":beginner: Serveur support :", value: "none", inline: true },
                { name: ":battery: En ligne depuis :", value: conversion_seconde_heure(), inline: true },
            )
            .setThumbnail(ppbot)
            .setTimestamp()
            .setFooter(`${client.user.tag}`, ppbot)
        message.channel.send(botstats_embed);
    }

    if(message.content.startsWith(prefix + "userstats")) {
        const membre = message.mentions.users.first() || message.author;
        var userstats_embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username)
            .setTitle("Voici quelques infos sur ce compte")
            .addField("Nom entier", `${membre.tag}`)
            .addField("ID", membre.id)
            .addField("Créé le", membre.createdAt)
            .addField("Tu as rejoint ce serveur le", membre.joinedAt)
            //.setThumbnail(membre.avatarURL)
            .setImage(membre.avatarURL)
            .setTimestamp()
            .setFooter(`${client.user.tag}`, ppbot)
        message.channel.send(userstats_embed);
    }

    if(message.content.startsWith(prefix + 'pp')) {
        const user = message.mentions.users.first() || message.author;
        var pp_embed = new Discord.MessageEmbed()
            .setColor(0x333333)
            .setAuthor(user.username)
            .setImage(user.avatarURL);
        message.channel.send(pp_embed);
    }

    if (message.content.startsWith(prefix + "servstats")) {
        var servstats_embed = new Discord.MessageEmbed()
            .setTitle("Voici quelques infos sur ce serveur")
            .addField('Nom', `${message.guild.name}`, (`${message.guild.nameAcronym, true}`))
            .addField('ID', message.guild.id)
            //.addField('Propriétaire du serveur', message.guild.owner.user.tag)
            .addField("Date de création du serveur", message.guild.createdAt)
            .addField("Localisé en ", message.guild.region)
            .addField("Nombre de membres", message.guild.memberCount, true)
            //.addField("Nombre de channels", message.guild.channelsCount, true)
            .addField("Nombre de boosts", message.guild.premiumSubscriptionCount, true)
            //.setThumbnail(message.guild.icon)
            //.setImage(message.guild.icon)
            .setTimestamp()
            .setFooter(`${client.user.tag}`, ppbot)
        message.channel.send(servstats_embed);
    }

    if(message.content === prefix + "ping"){
        var ping_embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.tag}`, client.user.avatarURL)
        .setFooter(`${client.user.tag}`, ppbot)
        .setTimestamp()
        .addField(`Latence actuelle de ${client.user.username} :`, Math.floor(message.createdTimestap - message.createdTimestap) + " Milliseconds")
        .addField(`Latence de l'API :`, Math.round(client.ping) + " Milliseconds")
        message.channel.send(ping_embed)
    }
});

