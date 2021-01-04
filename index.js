/**
 * @CarqueMax
 * Bot discord personnel
 */
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
client.login(config.token).catch(err => console.log("Token invalide"));
const prefix = config.prefix;
const versionBot = config.version;
const osu = require('node-os-utils');
let memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
const ppbot = "https://i.ibb.co/VQs1mbF/Royal-Logo.png";
const activities_list = [
    prefix + "help", 
    "by Safe",
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
    if(message.content === prefix + "help") {
        let help_embed = new Discord.MessageEmbed()
	        .setColor('#e4b400')
            .setDescription("```HELP " + client.user.username + "```")
            .setThumbnail(ppbot)
	        .addFields(
	        	{ name: prefix + "helpmod", value: 'Commandes modération' },
	        	{ name: prefix + "helpfun", value: 'Commandes fun' },
                { name: prefix + "helpother", value: 'Autres commandes' },
                { name: prefix + "helpall", value: 'Donne toutes les commandes' },
	        )
	        .setTimestamp()
            .setFooter(`${client.user.tag}`, ppbot)
        message.channel.send(help_embed);
    }

    let mod_embed = new Discord.MessageEmbed()
	    .setColor('#ff0000')
        .setDescription("```HELP MODÉRATION " + client.user.username + "```")
        .setThumbnail(ppbot)
	    .addFields(
	    	{ name: prefix + "kick <membre> <raison>", value: 'Exclu un membre' },
	    	{ name: prefix + "ban <membre> <raison>", value: 'Banni un membre' },
            { name: prefix + "clear <nombre de massage>", value: 'Efface un certain nombre de messages' },
            { name: prefix + "mute <membre> <raison>", value: 'Mute un membre' },
            { name: prefix + "unmute <membre> <raison>", value: 'Démute un membre' },
            { name: prefix + "dm <membre> <message>", value: 'Envoie message à un membre' },
	    )
	    .setTimestamp()
        .setFooter(`${client.user.tag}`, ppbot)

    let fun_embed = new Discord.MessageEmbed()
	    .setColor('#ff00ec')
        .setDescription("```HELP FUN " + client.user.username + "```")
        .setThumbnail(ppbot)
	    .addFields(
            { name: prefix + "8ball <question>", value: 'Le bot répond à te question'},
	    )
	    .setTimestamp()
        .setFooter(`${client.user.tag}`, ppbot)

    let other_embed = new Discord.MessageEmbed()
	    .setColor('#00ff6d')
        .setDescription("```HELP OTHER " + client.user.username + "```")
        .setThumbnail(ppbot)
	    .addFields(
	    	{ name: prefix + "invite", value: 'Invite le bot sur tes serveurs' },
            { name: prefix + "botstats", value: 'Infos sur le bot'},
            { name: prefix + "userstats <membre>", value: 'Infos sur ton compte' },
            { name: prefix + "pp <membre>", value: 'Photo de profil discord' },
            { name: prefix + "servstats", value: 'Infos sur ce serveur' },
            { name: prefix + "ping", value: 'Ping du bot' },
	    )
	    .setTimestamp()
        .setFooter(`${client.user.tag}`, ppbot)

    if(message.content.startsWith(prefix + "helpmod")) {
        message.channel.send(mod_embed);
    }
    if(message.content.startsWith(prefix + "helpfun")) {
        message.channel.send(fun_embed);
    }
    if(message.content.startsWith(prefix + "helpother")) {
        message.channel.send(other_embed);
    }
    if(message.content.startsWith(prefix + "helpall")) {
        message.channel.send(mod_embed);
        message.channel.send(fun_embed);
        message.channel.send(other_embed);
    }
});

// MOD COMMANDES
client.on("message", async message => {
    if(message.content.startsWith(prefix + "kick")) {
        let messageArray = message.content.split(" ")
        let args = messageArray.slice(1)
        if(message.channel.type === 'dm') return message.reply('Commande non réalisable par DM :no_entry_sign:');
        let kUser = message.guild.member(message.mentions.users.first());
        if(!kUser) return message.reply("Utilisateur spécifié introuvable :thinking:");
        let kReason = args.join(" ").slice(22);
        if(!kReason){var eReason = "Aucune raison spécifiée"};
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Vous n'avez pas les permissions requise pour executer cette commande :no_entry_sign:");
        if(kUser.hasPermission('KICK_MEMBERS')) return message.reply("Vous ne pouvez pas exclure cet utilisateur :hugging:");
        message.guild.member(kUser).kick(kReason || eReason).then( msg => {
            message.channel.send(`:white_check_mark: Utilisateur exclu avec succès`);
        });
    };

    if(message.content.startsWith(prefix + "ban")) {
        let messageArray = message.content.split(" ")
        let args = messageArray.slice(1)
        if(message.channel.type === 'dm') return message.reply('Commande non réalisable par DM :no_entry_sign:');
        let bUser = message.guild.member(message.mentions.users.first());
        if(!bUser) return message.reply("Utilisateur spécifié introuvable :thinking:");
        let bReason = args.join(" ").slice(22);
        if(!bReason){var eReason = "Aucune raison spécifiée"};
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Vous n'avez pas les permissions requise pour executer cette commande :no_entry_sign:");
        if(bUser.hasPermission('BAN_MEMBERS')) return message.reply("Vous ne pouvez pas bannir cet utilisateur :hugging:");
        let reason = bReason || eReason;
        message.guild.members.ban(bUser, {reason}).then( msg => {
            message.channel.send(`:white_check_mark: Utilisateur banni avec succès`);
        });
    };

    if(message.content.startsWith(prefix + "clear")) {
        let messageArray = message.content.split(" ");
        let args = messageArray.slice(1);
        if(message.channel.type === 'dm') return message.reply('Commande non réalisable par DM :no_entry_sign:');
        let nb = parseInt(args[0]) + 1;
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas les permissions requise pour executer cette commande :no_entry_sign:");
        if(!args[0]) return message.reply(`Veuillez préciser le nombre de messages a supprimer \n Commande : **${prefix}clear <nombre de messages>**`);
        if(nb <= 1 || nb > 100) return message.reply("Veuillez indiquer un nombre compris entre 1 et 99")
        message.channel.bulkDelete(nb, true).catch(err => {
            message.reply(":confused: Erreur de syntaxe avec la commande clear");
        });
        message.channel.send(`:white_check_mark: \`${nb}\` message(s) ont été supprimé(s) (sauf ceux plus de 2 semaines)`);
    };

    
    if(message.content.startsWith(prefix + "mute")) {
        let messageArray = message.content.split(" ")
        let args = messageArray.slice(1)
        if(message.channel.type === 'dm') return message.reply('Commande non réalisable par DM :no_entry_sign:');
        let mUser = message.guild.member(message.mentions.users.first());
        if(!mUser) return message.reply("Utilisateur spécifié introuvable :thinking:");
        let mReason = args.join(" ").slice(22);
        if(!mReason){var eReason = "Aucune raison spécifiée"};
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas la permissions requise pour executer cette commande :no_entry_sign:");
        let reason = mReason || eReason;

        let role = message.guild.roles.cache.find(r => r.name === "Mute member");

        //if(message.member.roles.cache.some(r=>["Mute member"].includes(r.name))) return message.reply("Cet utilisateur est déja muté :zipper_mouth:");
        if(!role){
            try {
                role = await message.guild.roles.create({
                    name: "Mute member",
                    color:"#ff1000",
                    permissions:['SEND_MESSAGES', 'ADD_REACTIONS']
                });
                message.guild.channels.cache.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                console.log(e.stack)
            }
        }
        //if(mUser.roles.has(role.id)) return message.reply("Cet utilisateur est déja muté :zipper_mouth:");
        await(mUser.addRole(role));
        message.channel.send(`L'utilisateur : **${mUser}** a été mute :zipper_mouth:`);
    };
    

    /*
    if(message.content.startsWith(prefix + "mute")){
        let messageArray = message.content.split(" ");
        let args = messageArray.slice(1);
        if(message.channel.type === 'dm') return message.reply('Commande non réalisable par DM :no_entry_sign:');
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas la permissions requise pour executer cette commande :no_entry_sign:");
        let toMute = message.guild.member(message.mentions.users.first());
        if(!toMute) return message.reply("Utilisateur spécifié introuvable :thinking:");
        let role = message.guild.roles.cache.find(r => r.name === "Mute member");
        if(!role){
            try {
                role = await message.guild.roles.create({
                    name: "Mute member",
                    color:"#ff1000",
                    permissions:['SEND_MESSAGES', 'ADD_REACTIONS']
                });
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                console.log(e.stack)
            }
        }
        if(toMute.roles.has(role.id)) return message.reply("Cet utilisateur est déja muté :zipper_mouth:");
        await(toMute.addRole(role));
        message.channel.send(`L'utilisateur : **${toMute}** a été mute :zipper_mouth:`);
    };
    */

    /*
    if(message.content.startsWith(prefix + "unmute")){
        let messageArray = message.content.split(" ");
        let args = messageArray.slice(1);
        if(message.channel.type === 'dm') return message.reply('Commande non réalisable par DM :no_entry_sign:');
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas la permissions requise pour executer cette commande :no_entry_sign:");
        let toMute = message.guild.member(message.mentions.users.first());
        if(!toMute) return message.reply("Utilisateur spécifié introuvable :thinking:");
        let role = message.guild.roles.find(r => r.name === "Mute member");
        if(!role){
            try {
                role = await message.guild.createRole({
                    name: "Mute member",
                    color:"#000000",
                    permissions:[]
                });
                
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                console.log(e.stack)
            }
        }
        if(!toMute.roles.has(role.id)) return message.reply("Cet utilisateur n'est pas mute !");
        await(toMute.removeRole(role));
        message.channel.send(`L'utilisateur : **${toMute}** a été unmute :speaking_head:`);
    };
    */

   if(message.content.startsWith(prefix + "dm")) {
    let messageArray = message.content.split(" ")
    let args = messageArray.slice(1)
    let dmUser = message.guild.member(message.mentions.users.first());
    if (!dmUser) return message.reply("Utilisateur spécifié introuvable :thinking::thinking:");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas les permissions requise pour executer cette commande :no_entry_sign:")
    let dMessage = args.join(" ").slice(22);
    if(dMessage.length < 1) return message.reply("Veullez entrer un message")
    dmUser.send(`__${dmUser}, quelqu'un vous a envoyé un message:__`)
    var dm_embed = new Discord.MessageEmbed()
        .setDescription(`${dMessage}`)
        .setColor("RANDOM")
        .setTimestamp()
    dmUser.send(dm_embed);
    message.author.send(`Message envoyé avec succès à ${dmUser}`)
}
});

// OTHER COMMANDES
client.on("message", async message => {
    if(message.content === prefix + "invite") {
        let invite_embed = new Discord.MessageEmbed()
            .setTitle("**Invite le bot sur un de tes serveurs**")
            .setDescription("Bot développé par <@398863083176722432> dans le but de s'entrainer en JavaScript. Il possède des commandes de modération :tools: , quelques petits jeux, ainsi que d'autre commandes sympa :bar_chart: .")
            .addField(":link: LIEN D'INVITATION :link:", "Invite le bot en cliquant sur __**[ce lien](https://discord.com/oauth2/authorize?client_id=770372006336004096&permissions=8&scope=bot)**__.")
            .setFooter(`${client.user.tag}`, ppbot)
        message.channel.send(invite_embed)
    }

    if(message.content === prefix + "botstats") {
        function conversion_seconde_heure() {
            // "process.uptime()" = fonction node pour avoir le temps en s
            // si reste= 123332221 alors 1427j 10h 57min 1s
            let reste= parseInt(process.uptime());
            let result='';
            let nbJours=Math.floor(reste/(3600*24));
            reste -= nbJours*24*3600;
            let nbHours=Math.floor(reste/3600);
            reste -= nbHours*3600;
            let nbMinutes=Math.floor(reste/60);
            reste -= nbMinutes*60;
            let nbSeconds=reste;
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
        let plurielServeur;
        if(client.guilds.cache.size > 1) {
            plurielServeur = 's';
        } else {
            plurielServeur = '';
        }
        let cpu = osu.cpu;
        cpu.usage()
        .then(cpuPercentage => {
            let botstats_embed = new Discord.MessageEmbed()
                .setTitle(`:pencil: Informations sur ${client.user.tag}`)
                .setDescription("--------------------------------------------")
                .addFields(
                    { name: ":clipboard: Nom :", value: client.user.tag, inline: true },
                    { name: ":id: ID :", value: client.user.id, inline: true },
                    { name: ":symbols: Prefix :", value: "``" + prefix + "``", inline: true },
                    { name: ":satellite: Actif sur :", value: client.guilds.cache.size + "serveur" + plurielServeur, inline: true },
                    { name: ":beginner: Serveur support :", value: "none", inline: true },
                    { name: ":battery: En ligne depuis :", value: conversion_seconde_heure(), inline: true },
                    { name: ":desktop: Développeur :", value: "<@398863083176722432>", inline: true},
                    { name: ":robot: Bot version :", value: "v" + versionBot, inline: true },
                    { name: "Memory usage :", value: `${Math.round(memoryUsage * 100) / 100} MB`, inline: true },
                    { name: "Platform :", value: `Node.js ${process.version} sur ${process.platform}`, inline: true },
                    { name: ":bar_chart: CPU usage :", value: cpuPercentage + "%", inline: true },
                )
                .setThumbnail(ppbot)
                .setTimestamp()
                .setFooter(`${client.user.tag}`, ppbot)
            message.channel.send(botstats_embed);
        });
    }

    if(message.content.startsWith(prefix + "userstats")) {
        //if(message.channel.type === 'dm') return message.reply('Commande non réalisable par DM :no_entry_sign:');
        const user = message.mentions.users.first() || message.author;
        let userstats_embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username)
            .setTitle("Voici quelques infos sur ce compte")
            .setDescription("--------------------------------------------")
            .addFields(
                { name: ":clipboard: Nom entier ", value: user.tag, inline: true },
                { name: ":id: ID : ", value: user.id, inline: true },
                { name: "Créé le : ", value: user.createdAt },
                { name: ":inbox_tray: Tu as rejoint ce serveur le : ", value: "undefined", inline: true },
            )
            .setImage(user.avatarURL())
            .setTimestamp()
            .setFooter(`${client.user.tag}`, ppbot)
        message.channel.send(userstats_embed);
    }

    if(message.content.startsWith(prefix + 'pp')) {
        const user = message.mentions.users.first() || message.author;
        let pp_embed = new Discord.MessageEmbed()
            .setColor(0x333333)
            .setAuthor(user.username)
            .setImage(user.avatarURL());
        message.channel.send(pp_embed);
    }

    if(message.content === prefix + "servstats") {
        if(message.channel.type === 'dm') return message.reply('Commande non réalisable par DM :no_entry_sign:');
        const guild = message.guild; // Récupère la guild
        if(!guild.available) return; // Stop si la guild n'existe pas
        await message.guild.members.fetch(message.guild.ownerID) // Récupère le proprio
              .then(guildMember => sOwner = guildMember) // le trouve
        let propio = guild.member(sOwner) ? sOwner.toString() : guild.owner.user.tag;
        let servstats_embed = new Discord.MessageEmbed()
            .setTitle("Voici quelques infos sur ce serveur")
            .setDescription("--------------------------------------------")
            .addField(':clipboard: Nom', `${message.guild.name}`, (`${message.guild.nameAcronym, true}`, true))
            .addField(':id: ID', message.guild.id, true)
            .addField(':crown: Propriétaire du serveur', propio)
            .addField("Nombre de membre", message.guild.memberCount, true)
            .addField("Nombre de channels", message.guild.channels.cache.size, true)
            .addField(":checkered_flag: Date de création du serveur", message.guild.createdAt)
            .addField("Nombre d'émoji", message.guild.emojis.cache.size, true)
            .addField("Nombre de rôle", message.guild.roles.cache.size, true)
            .addField("Nombre de boost", message.guild.premiumSubscriptionCount, true)
            .addField("Localisé en ", message.guild.region)
            .setImage(message.guild.iconURL())
            .setTimestamp()
            .setFooter(`${client.user.tag}`, ppbot)
        message.channel.send(servstats_embed);
    }

    if(message.content === prefix + "ping"){
        let ping = Date.now() - message.createdTimestamp;
        let ping_embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.tag}`, client.user.avatarURL)
        .setFooter(`${client.user.tag}`, ppbot)
        .setTimestamp()
        .addField(`Latence actuelle de ${client.user.username} :`, ping + ` ms`)
        .addField(`Latence de l'API :`, client.ws.ping + " ms")
        message.channel.send(ping_embed)
    }
});

// FUN COMMANDES
client.on("message", async message => {
    let messageArray = message.content.split(" ")
    let args = messageArray.slice(1)
    if(message.content.startsWith(prefix + "8ball")) {
        if (!args[0]) return message.channel.send("Il me semble que tu as oublié de poser la question :confused:")
        let reponse = ["D'après moi c'est oui", "C'est non", "C'est certain", "Peu probable", "Oui absolument", "Faut pas rêver", "N'y compte pas", "Concentrez vous mieux et recommencez", "Impossible", "Très probable", "Il vaut mieux ne pas répondre", "Et puis quoi encore ?", "C'est très incertain", "Sans aucun doute"];
        let random = Math.floor((Math.random() * reponse.length));
        let question = args.slice(0).join(" ");
        if (question.length > 1024) return message.channel.send("Ta question est trop longue, repose la différemment")
        let ball_embed = new Discord.MessageEmbed()
            .setTitle(`**Commandes 8ball de __${message.author.tag}__**`)
            .addField("``Ta question:``", question)
            .addField("``Réponse:``", reponse[random])
            .setFooter(client.user.tag, client.user.avatarURL)
            .setColor("RANDOM")
        message.channel.send(ball_embed)
    }
});
