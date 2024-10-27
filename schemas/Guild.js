const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
    commandsEnabled: { type: Boolean, default: true },
        avatarCommandEnabled: { type: Boolean, default: true }, // New field for avatar command
        helpCommandEnabled: { type: Boolean, default: true }, // New field for avatar command
        pingCommandEnabled: { type: Boolean, default: true }, 
        serverCommandEnabled: { type: Boolean, default: true }, // New field for avatar command
        userCommandEnabled: { type: Boolean, default: true }, // New field for avatar command
        banCommandEnabled: { type: Boolean, default: true }, // New field for avatar command
        unbanCommandEnabled: { type: Boolean, default: true }, // New field for avatar command
        muteCommandEnabled: { type: Boolean, default: true }, 
        unmuteCommandEnabled: { type: Boolean, default: true }, // New field for avatar command
        setupCommandEnabled: { type: Boolean, default: true }, // New field for avatar command
    openCommandEnabled: { type: Boolean, default: true }, // New field for avatar command
        langCommandEnabled: { type: Boolean, default: true }, 
        showCommandEnabled: { type: Boolean, default: true }, // New field for avatar command
    hideCommandEnabled: { type: Boolean, default: true }, 

        trustCommandEnabled: { type: Boolean, default: true }, // New field for avatar command
kickCommandEnabled: { type: Boolean, default: true }, // New field for avatar command
    closeCommandEnabled: { type: Boolean, default: true }, // New field for avatar command
    clearCommandEnabled: { type: Boolean, default: true }, // New fi 
    command1Enabled: {
    type: Boolean,
    default: false,
  },
 aliases: { type: [String], default: [] }, // Array of aliases
    enabledRoles: { type: [String], default: [] }, // Array of role IDs
    enabledChannels: { type: [String], default: [] }, // Array of channel IDs
    disabledChannels: { type: [String], default: [] }, // Array of channel IDs
    maxLimit: { type: Number, default: 4 }, // Max limit
    rolesCanSkipMaxLimit: { type: [String], default: [] }, // Roles that can skip the max limit
    autoDeleteCommandMessage: { type: Boolean, default: false }, // Auto-delete command invocation
    autoDeleteReplyMessage: { type: Boolean, default: false }, // Auto-delete bot's reply
    
    comeEmbed: {
        enabled: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            default: "",
        },
        thumbnail: {
            type: String,
            default: "",
        },
        content: {
            type: String,
            default: "",
        },
    },
  buttonSettings: {
        enabled: { type: Boolean, default: false },
        name: { type: String, default: '' },
        color: { type: String, default: '#ffffff' },
    },
    selectMenuSettings: {
        enabled: { type: Boolean, default: false },
        name: { type: String, default: '' },
        description: { type: String, default: '' },
    },
        // Add other fields here as needed
    
    _id: {
        type: String,
        required: false,
    },
    guildID: {
        type: String,
        required: false,
    },
    language: {
        type: String,
        required: false,
    },
    owner: {
        type: String,
    },
    notification: {
        type: String,
    },
    commands: {
        type: String,
    },
    prefix: {
        type: String,
    },
    line: {
        link: { type: String },
    },
    reaction: {
        channel: { type: String },
        emoji: { type: String },
    },
    slowmode: {
        channel: { type: String },
        time: { type: String },
    },
    autorestore: {
        channels: { type: String },
        roles: { type: String },
    },
    premium: {
        token: { type: String },
        user: { type: String },
        time: { type: String },
    },
    autorole: {
        roles: { type: String },
        toggle: { type: String },
    },
    welcome: {
  
        channel: { type: String },
        toggle: { type: String },
    },
    trust: { type: Array },
    protection: {
        antibot: {
            type: String
        },
        antihack: {
            type: String
        },
        antilink: {
            roles: { type: String },
            toggle: { type: String },
            action: { type: String },
        },
        antispam: {
            messages: { type: String },
            toggle: { type: String },
            action: { type: String },
        },
    },
    limit: {
        channels: {
            type: String
        },
        bans: {
            type: String
        },
        kicks: {
            type: String
        },
        roles: {
            type: String
        },
    },
    action: {
        channels: {
            type: String
        },
        bans: {
            type: String
        },
        kicks: {
            type: String
        },
        roles: {
            type: String
        },
    },
    ticket: {
        channel: {
            type: String
        },
        catrogy: {
            type: String
        },
        embed: {
            title: { type: String },
            description: { type: String },
            button: { type: String },
        },
    },
    logs: {
        message: {
            channel: { type: String },
            toggle: { type: String },
        },
        channel: {
            channel: { type: String },
            toggle: { type: String },
        },
        role: {
            channel: { type: String },
            toggle: { type: String },
        },
        banned: {
            channel: { type: String },
            toggle: { type: String },
        },
        kick: {
            channel: { type: String },
            toggle: { type: String },
        },
        voice: {
            channel: { type: String },
            toggle: { type: String },
        },
        guildMemberAdd: {
            channel: { type: String },
            toggle: { type: String },
        },
        leaves: {
            channel: { type: String },
            toggle: { type: String },
        },
    }
});

module.exports = mongoose.model('Guild', GuildSchema)