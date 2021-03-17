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
const idLogs = "816637842922405948";
let statuePerso = prefix + "help";
let ancienStatue = statuePerso;
const activities_list = [
    //prefix + "help", 
    //"by Safe",
    statuePerso,
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
    }, 20000); // 20 secondes
    setInterval(() => {
        const random = Math.floor(Math.random() * status_list.length);
        client.user.setStatus(status_list[random]);
    }, 20000); // 20 secondes
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
            //{ name: prefix + "mute <membre> <raison>", value: 'Mute un membre' },
            //{ name: prefix + "unmute <membre> <raison>", value: 'Démute un membre' },
            { name: prefix + "dm <membre> <message>", value: 'Envoie un message en DM à un membre' },
            { name: prefix + "say <message>", value: 'Fait parler le bot' },
            { name: prefix + "statue <message>", value: '**BETA** Change le statue du bot' },
        )
        .setTimestamp()
        .setFooter(`${client.user.tag}`, ppbot)

    let fun_embed = new Discord.MessageEmbed()
        .setColor('#ff00ec')
        .setDescription("```HELP FUN " + client.user.username + "```")
        .setThumbnail(ppbot)
        .addFields(
            { name: prefix + "8ball <question>", value: 'Le bot répond à te question'},
            { name: prefix + "ddos <membre>", value: 'DDOS une personne'},
            { name: prefix + "compatible <membre>", value: 'Calcul la compatibilité avec une personne'},
            { name: prefix + "note <matière>", value: 'Calcul ta note'},
            { name: prefix + "pfpc", value: '**COMING SOON** Pierre Feuille Papier Ciseau'},
            { name: prefix + "sendpanda", value: '**COMING SOON** Envoie une image/gif de panda'},
            { name: prefix + "addpanda", value: '**COMING SOON** Ajoute une image/gif de panda à la bdd de Royal'},
        )
        .setTimestamp()
        .setFooter(`${client.user.tag}`, ppbot)

    let other_embed = new Discord.MessageEmbed()
        .setColor('#00ff6d')
        .setDescription("```HELP OTHER " + client.user.username + "```")
        .setThumbnail(ppbot)
        .addFields(
            //{ name: prefix + "invite", value: 'Invite le bot sur tes serveurs' },
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
        if(message.channel.type === 'dm') return message.reply('commande non réalisable par DM :no_entry_sign:');
        let kUser = message.guild.member(message.mentions.users.first());
        if(!kUser) return message.reply("utilisateur spécifié introuvable :thinking:");
        let kReason = args.join(" ").slice(22);
        if(!kReason){var eReason = "Aucune raison spécifiée"};
        //if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("je n'ai pas les permissions nécessaires, demande au propriétaire du serveur de me les rajouter :disappointed_relieved:");
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("vous n'avez pas les permissions requises pour exécuter cette commande :no_entry_sign:");
        if(kUser.id === client.user.id) return message.reply("bien tenté, mais non ! :stuck_out_tongue_closed_eyes:");
        if(message.author.id === client.user.id) return message.channel.send("bien tenté, mais non ! :stuck_out_tongue_closed_eyes:");
        if(kUser.hasPermission('KICK_MEMBERS')) return message.reply("vous ne pouvez pas exclure cet utilisateur :hugging:");
        message.guild.member(kUser).kick(kReason || eReason).then( msg => {
            message.channel.send(`:white_check_mark: Utilisateur exclu avec succès`);
        });
       let kickEmbed = new Discord.MessageEmbed()
       .setTitle("Rapport d'exclusion")
       .setColor("RANDOM")
       .setFooter("by Safe", client.user.avatarURL)
       .addField("Utilisateur exclu", `${kUser} (ID : ${kUser.id})`)
       .addField("Exclu par", `<@${message.author.id}> (ID : ${message.author.id})`)
       .addField("Exclu dans", message.channel)
       .addField("Exclu à", message.createdAt)
       .addField("Raison", kReason || eReason);
       client.channels.cache.get(idLogs).send(kickEmbed)
    };

    if(message.content.startsWith(prefix + "ban")) {
        let messageArray = message.content.split(" ")
        let args = messageArray.slice(1)
        if(message.channel.type === 'dm') return message.reply('commande non réalisable par DM :no_entry_sign:');
        let bUser = message.guild.member(message.mentions.users.first());
        if(!bUser) return message.reply("utilisateur spécifié introuvable :thinking:");
        let bReason = args.join(" ").slice(22);
        if(!bReason){var eReason = "Aucune raison spécifiée"};
        //if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("je n'ai pas les permissions nécessaires, demande au propriétaire du serveur de me les rajouter :disappointed_relieved:");
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("vous n'avez pas les permissions requises pour exécuter cette commande :no_entry_sign:");
        if(bUser.id === client.user.id) return message.reply("bien tenté, mais non ! :stuck_out_tongue_closed_eyes:");
        if(message.author.id === client.user.id) return message.channel.send("bien tenté, mais non ! :stuck_out_tongue_closed_eyes:");
        if(bUser.hasPermission('BAN_MEMBERS')) return message.reply("vous ne pouvez pas bannir cet utilisateur :hugging:");
        let reason = bReason || eReason;
        message.guild.members.ban(bUser, {reason}).then( msg => {
            message.channel.send(`:white_check_mark: Utilisateur banni avec succès`);
        });
       let banEmbed = new Discord.MessageEmbed()
       .setTitle("Rapport de bannisement")
       .setColor("RANDOM")
       .addField("Utilisateur banni", `${bUser} (ID : ${bUser.id})`)
       .setFooter("by Safe", client.user.avatarURL)
       .addField("Banni par", `<@${message.author.id}> (ID : ${message.author.id})`)
       .addField("Banni dans", message.channel)
       .addField("Banni à", message.createdAt)
       .addField("Raison", bReason || eReason);
       client.channels.cache.get(idLogs).send(banEmbed)
    };

    if(message.content.startsWith(prefix + "clear")) {
        let messageArray = message.content.split(" ");
        let args = messageArray.slice(1);
        if(message.channel.type === 'dm') return message.reply('commande non réalisable par DM :no_entry_sign:');
        let nb = parseInt(args[0]) + 1;
        //if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("je n'ai pas les permissions nécessaires, demande au propriétaire du serveur de me les rajouter :disappointed_relieved:");
        if(message.author.id === client.user.id) return message.channel.send("bien tenté, mais non ! :stuck_out_tongue_closed_eyes:");
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("vous n'avez pas les permissions requises pour exécuter cette commande :no_entry_sign:");
        if(!args[0]) return message.reply(`veuillez préciser le nombre de messages a supprimer \n Commande : **${prefix}clear <nombre de messages>**`);
        if(nb <= 1 || nb > 100) return message.reply("veuillez indiquer un nombre compris entre 1 et 99")
        message.channel.bulkDelete(nb, true).catch(err => {
            message.reply(":confused: erreur de syntaxe avec la commande clear");
        });
        message.channel.send(`:white_check_mark: \`${args}\` message(s) ont été supprimé(s) (sauf ceux plus de 2 semaines)`);
       let clearEmbed = new Discord.MessageEmbed()
       .setTitle(`Rapport de suppression`)
       .setDescription(`Auteur de la suppression : ` + `<@${message.author.id}> (ID : ${message.author.id})`)
       .addField("Nombre de messages supprimés : ", args)
       .addField("Commande effectué dans ", message.channel)
       .addField("Commande effectué le ", message.createdAt)
       .setFooter("by Safe", client.user.avatarURL)
       .setColor('RANDOM')
       client.channels.cache.get(idLogs).send(clearEmbed);
    };
    
    /*
    if(message.content.startsWith(prefix + "mute")) {
        let messageArray = message.content.split(" ")
        let args = messageArray.slice(1)
        if(message.channel.type === 'dm') return message.reply('Commande non réalisable par DM :no_entry_sign:');
        let mUser = message.guild.member(message.mentions.users.first());
        if(!mUser) return message.reply("Utilisateur spécifié introuvable :thinking:");
        if(message.author.id === mUser.user.id) return message.reply("Tu ne peux pas te mute toi même :x:");
        let mReason = args.join(" ").slice(22);
        if(!mReason){var eReason = "Aucune raison spécifiée"};
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas la permissions requise pour executer cette commande :no_entry_sign:");
        let reason = mReason || eReason;
        let role = message.guild.roles.cache.find(r => r.name === "Mute member");
        if(!role){
            role = message.guild.roles.create({
                data: {
                    name: 'Mute member',
                    color: '#ff1000',
                    permissions: 'VIEW_CHANNEL'
                },
                reason: "Création role pour les personnes mute",
            })
            message.channel.updateOverwrite(role, { SEND_MESSAGES: false });
        }
        if(mUser.roles.has(role.id)) return message.reply("Cet utilisateur est déja muté :zipper_mouth:");
        await(mUser.roles.add(role));
        message.channel.send(`L'utilisateur : **${mUser}** a été mute :zipper_mouth:`);
    };

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
        if (!dmUser) return message.reply("utilisateur spécifié introuvable :thinking::thinking:");
        //if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("vous n'avez pas les permissions requises pour exécuter cette commande :no_entry_sign:")
        let dMessage = args.join(" ").slice(22);
        message.delete();
        if(dMessage.length < 1) return message.reply("veullez entrer un message")
        
        if(message.author.id === client.user.id) return message.channel.send("bien tenté, mais non ! :stuck_out_tongue_closed_eyes:");
        
        dmUser.send(`__${dmUser}, quelqu'un vous a envoyé un message:__`).catch(error => {
            //confirm = false;
            //message.author.send(":x: `ton message n'a pas été envoyé. Cela arrive si la personne a bloqué les DM venant de ce serveur, a bloqué le bot ou encore s'il s'agit d'un autre bot.`").catch(error => {
            //    message.reply(`:x: :x:` + confirm);
            //});
        });
        let dm_embed = new Discord.MessageEmbed()
            .setDescription(`${dMessage}`)
            .setColor("RANDOM")
            .setTimestamp()
        dmUser.send(dm_embed).catch( error => {
            //console.log("ERROR 1 : " + error);
        });
        message.author.send(":white_check_mark: `message envoyé avec succès à `" + `${dmUser}`).catch(error => {
            //message.reply(`:white_check_mark: :white_check_mark:`);
        });
        
        /*
        var confirm = true;
        dmUser.send(`__${dmUser}, quelqu'un vous a envoyé un message:__`).catch(error => {
            confirm = false;
            message.author.send(":x: `ton message n'a pas été envoyé. Cela arrive si la personne a bloqué les DM venant de ce serveur, a bloqué le bot ou encore s'il s'agit d'un autre bot.`").catch(error => {
                message.reply(`:x: :x:` + confirm);
            });
        });
        if(confirm) {
            let dm_embed = new Discord.MessageEmbed()
                .setDescription(`${dMessage}`)
                .setColor("RANDOM")
                .setTimestamp()
            dmUser.send(dm_embed).catch( error => {
                console.log("ERROR 1 : " + error);
            });
            message.author.send(":white_check_mark: `message envoyé avec succès à `" + `${dmUser}`).catch(error => {
                message.reply(`:white_check_mark: :white_check_mark:`);
            });
        }
        */
    }

    let messageArray = message.content.split(" ")
    let args = messageArray.slice(1)
    if(message.content.startsWith(prefix + "say")) {
        let question = args.slice(0).join(" ");
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("vous n'avez pas les permissions requises pour exécuter cette commande :no_entry_sign:");
        message.delete();
        message.channel.send(question);
    }

    if(message.content.startsWith(prefix + "statue")) {
        let messageArray = message.content.split(" ")
        let args = messageArray.slice(1)
        let text = args.slice(0).join(" ");
        message.delete();
        if (!args[0]) return message.channel.send("Statue vide :confused:")
        if (text.length > 117) return message.channel.send("Statue trop long (117 caractères max)")
        if(message.author.id === client.user.id) return message.reply("bien tenté, mais non ! :stuck_out_tongue_closed_eyes:");
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("vous n'avez pas les permissions requises pour exécuter cette commande :no_entry_sign:");
        statuePerso = text;
        let statueEmbed = new Discord.MessageEmbed()
            .setTitle("Changement de statue")
            .setColor("RANDOM")
            .addField("Ancien statue", ancienStatue)
            .addField("Nouveau statue", statuePerso)
            .setFooter("by Safe", client.user.avatarURL)
            .addField("Changé par", `<@${message.author.id}> (ID : ${message.author.id})`)
            .addField("Changé dans", message.channel)
            .addField("Changé le", message.createdAt)
            client.channels.cache.get(idLogs).send(statueEmbed)
        message.channel.send(":white_check_mark: Le statue du bot a été changé avec succès. (synchronisation dans 15s)");
        ancienStatue = text;
    }
});


// OTHER COMMANDES
client.on("message", async message => {
    /*
    if(message.content === prefix + "invite") {
        let invite_embed = new Discord.MessageEmbed()
            .setTitle("**Invite le bot sur un de tes serveurs**")
            .setDescription("Bot développé par <@398863083176722432> dans le but de s'entrainer en JavaScript. Il possède des commandes de modération :tools: , quelques petits jeux, ainsi que d'autre commandes sympa :bar_chart: .")
            .addField(":link: LIEN D'INVITATION :link:", "Invite le bot en cliquant sur __**[ce lien](https://discord.com/oauth2/authorize?client_id=770372006336004096&permissions=8&scope=bot)**__.")
            .setFooter(`${client.user.tag}`, ppbot)
        message.channel.send(invite_embed)
    }
    */

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
            .setImage(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
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
        .addField(`Latence de l'API Discord :`, client.ws.ping + " ms")
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

    if(message.content.startsWith(prefix + 'ddos')) {
        const user = message.mentions.users.first() || message.author;
        message.channel.send("``Starting the DDOS script``").then(async message => {
            setTimeout(() => {
                message.edit("``FINISH``");
            }, 22000);
        });
        message.channel.send("```python\npy hammer.py -s " + user + " -t 500```").then(async message => {
            setTimeout(() => {
                message.edit(':hourglass_flowing_sand: ░░░░░░░░░░ 0%');
            }, 1000);
            setTimeout(() => {
                message.edit(':hourglass: ▓▓░░░░░░░░ 20%');
            }, 1000);
            setTimeout(() => {
                message.edit(':hourglass_flowing_sand: ▓▓░░░░░░░░ 20%');
            }, 1000);
            setTimeout(() => {
                message.edit(':hourglass: ▓▓▓▓░░░░░░ 40%');
            }, 1000);
            setTimeout(() => {
                message.edit(':hourglass_flowing_sand: ▓▓▓▓░░░░░░ 40%');
            }, 1000);
            setTimeout(() => {
                message.edit(':hourglass: ▓▓▓▓▓▓░░░░ 60%');
            }, 1000);
            setTimeout(() => {
                message.edit(':hourglass_flowing_sand: ▓▓▓▓▓▓░░░░ 60%');
            }, 1000);
            setTimeout(() => {
                message.edit(':hourglass: ▓▓▓▓▓▓░░░░ 60%');
            }, 1000);
            setTimeout(() => {
                message.edit(':hourglass_flowing_sand: ▓▓▓▓▓▓▓▓░░ 80%');
            }, 1000);
            setTimeout(() => {
                message.edit(':hourglass: ▓▓▓▓▓▓▓▓░░ 80%');
            }, 1000);
            setTimeout(() => {
                message.edit(':hourglass_flowing_sand: ▓▓▓▓▓▓▓▓░░ 80%');
            }, 1000);
            setTimeout(() => {
                message.edit(':hourglass: ▓▓▓▓▓▓▓▓▓▓ 100%');
            }, 1000);
            setTimeout(() => {
                message.edit(':hourglass_flowing_sand: ▓▓▓▓▓▓▓▓▓▓ 100%');
            }, 1000);
            setTimeout(() => {
                message.edit(':hourglass: ▓▓▓▓▓▓▓▓▓▓ 100%');
            }, 1000);
            setTimeout(() => {
                message.edit(':hourglass_flowing_sand: ▓▓▓▓▓▓▓▓▓▓ 100%');
            }, 1000);
            setTimeout(() => {
                message.edit(`**DDOS de ${user} en cours !`);
            }, 4000);
            setTimeout(() => {
                message.edit(`✅ DDOS de ${user} terminé !`);
            }, 4000);
        });
    };

    if(message.content.startsWith(prefix + "compatible")) {
        let messageArray = message.content.split(" ")
        let args = messageArray.slice(1)
        let lUser = message.guild.member(message.mentions.users.first());
        const love = Math.round(Math.random() * 100);
        let typeHeart;
        if(love < 20) {typeHeart = ":broken_heart:"}
        else if(love > 19 && love < 50) {typeHeart = ":orange_heart:"}
        else if(love > 49 && love < 80) {typeHeart = ":heart:"}
        else {typeHeart = ":sparkling_heart:"}
        if(!lUser) return message.reply("utilisateur spécifié introuvable :thinking:");
        let love_embed2 = new Discord.MessageEmbed()
            .setDescription(`Tu t'aimes à ${love}% ${typeHeart}`)
            .setImage(lUser.user.displayAvatarURL({ format: 'png', dynamic: true, size: 128 }))
            .setColor("#ff0000")
        if(message.author.id === lUser.id) return message.channel.send(love_embed2);
        if(lUser.id === client.user.id) return message.reply("Je ne t'aime pas, désolé :broken_heart: ");
        let love_embed1 = new Discord.MessageEmbed()
            .setDescription(`<@${message.author.id}> est compatible avec <@${lUser.id}> à ${love}% ${typeHeart}`)
            .setImage(lUser.user.displayAvatarURL({ format: 'png', dynamic: true, size: 128 }))
            .setColor("#ff0000")
        message.channel.send(love_embed1)
    };

    if(message.content.startsWith(prefix + "note")) {
        let messageArray = message.content.split(" ")
        let args = messageArray.slice(1)
        let matière = args.slice(0).join(" ");
        if (!matière) return message.channel.send("Matière manquante :confused:")
        const note = Math.round(Math.random() * 20);
        message.channel.send(`La note de <@${message.author.id}> en **${matière}** est de ${note}/20`);
    }
});