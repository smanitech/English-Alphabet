/**
 * This file defines the prompts, reprompts, APL content for each supported locale
 */

// List of localized alphabet (all locales)
const alphabet = require("./alphabet");

// List of localized strings (all locales)
module.exports = {
    en: {
        translation: {
            ALPHABET: alphabet.en,
            SKILL_NAME: `English Alphabet`,
            HEADER_TITLE: `Welcome to {{skillName}}`,
            ALPHABET_HEADER_TITLE: `English Alphabet`,
            HELP_HEADER_TITLE: `HELP`,
            HELP_HEADER_SUBTITLE: `Select the alphabet you want to learn.`,
            WELCOME_MESSAGE: `Welcome to {{skillName}}. You can learn alphabet here ... Now, what would you like to do?`,
            WELCOME_REPROMPT: `For instructions on what you can say, please say help me ... Now, what would you like to do?`,
            DISPLAY_CARD_TITLE: `Welcome to {{skillName}}`,
            HELP_MESSAGE: `You can ask questions such as, show some examples of alphabet {{eaid}}, or, you can say exit ... Now, what would you like to do?`,
            HELP_REPROMPT: `You can say things like, show some examples of alphabet {{eaid}}, or you can say exit ... Now, what would you like to do?`,
            STOP_MESSAGE: `Goodbye!`,
            ALPHABET_REPEAT_MESSAGE: `Try saying repeat.`,
            ALPHABET_NOT_FOUND_WITH_ITEM_NAME: `I'm sorry, I currently do not know that. Now, what would you like to do?`,
            ALPHABET_NOT_FOUND_WITHOUT_ITEM_NAME: `I'm sorry, I currently do not know that. Now, what would you like to do?`,
            ALPHABET_NOT_FOUND_REPROMPT: `Now, what would you like to do?`,
            ERROR_MESSAGE: `I'm sorry I didn't catch that. Can you reformulate please ?`,
            HINT_TEMPLATE: `Show some examples of alphabet {{eaid}}`,
            REFLECTOR_MESSAGE: `You just triggered {{intentName}}`
        }
    }
};