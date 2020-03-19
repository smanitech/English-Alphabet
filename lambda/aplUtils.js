// Copyright 2018-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Amazon Software License
// http://aws.amazon.com/asl/

/**
 * This file defines the different utililies to manage APL displays.
 */

// ASK SDK
const Alexa = require('ask-sdk-core');
// General Utilities
const alphabetUtils = require('./alphabetUtils');
// APL Templates
const APLDocs = {
    launch: require('./apl/launchRequest.json'),
    alphabet: require('./apl/alphabetIntent.json'),
    help: require('./apl/helpIntent.json'),
};

/**
 * Checks whether APL is supported by the User's device
 */
function supportsAPL(handlerInput) {
    const supportedInterfaces = Alexa.getSupportedInterfaces(handlerInput.requestEnvelope);
    const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
    return aplInterface !== null && aplInterface !== undefined;
}

/**
 * Adds Launch Screen (APL Template) to Response
 */
function launchScreen(handlerInput) {
    // Only add APL directive if User's device supports APL
    if (supportsAPL(handlerInput)) {
        handlerInput.responseBuilder.addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.1',
            document: APLDocs.launch,
            datasources: generateLaunchScreenDatasource(handlerInput)
        });
    }
}

/**
 * Adds Help Screen (APL Template) to Response
 */
function helpScreen(handlerInput) {
        // Only add APL directive if User's device supports APL
    if (supportsAPL(handlerInput)) {
        handlerInput.responseBuilder.addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.1',
            document: APLDocs.help,
            datasources: generateHelpScreenDatasource(handlerInput)
        });
    }
}

/**
 * Adds Alphabet Screen (APL Template) to Response
 */
function alphabetScreen(handlerInput, alphabetItem) {
    // Get prompt & reprompt speech
    const speakOutput = alphabetItem.instructions;
    const repromptOutput = handlerInput.t('ALPHABET_REPEAT_MESSAGE');
    // Only add APL directive if User's device supports APL
    if (supportsAPL(handlerInput)) {
        // add APL Template
        handlerInput.responseBuilder.addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: 'alphabet-boss',
            version: '1.1',
            document: APLDocs.alphabet,
            datasources: generateAlphabetScreenDatasource(handlerInput, alphabetItem)
        })
        // Add APL Command (Karaoke: sync. Voice/Text)
        .addDirective({
            type: 'Alexa.Presentation.APL.ExecuteCommands',
            token: 'alphabet-boss',
            commands: [{
                type: 'SpeakItem',
                componentId: 'alphabetText',
                highlightMode: 'line',
            }],
        });
        // As speech will be done by APL Command (SpeakItem) Voice/Text sync
        // Save prompt & reprompt for repeat
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.speakOutput = speakOutput;
        sessionAttributes.repromptOutput = repromptOutput;
    } else {
        // As APL is not supported by device
        // Provide prompt & reprompt instead of APL Karaoke
        handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput);
    }
}

/**
 * Compute the JSON Datasource associated to APL Launch Screen
 */
function generateLaunchScreenDatasource(handlerInput) {
    // Get alphabet
    const alphabet = handlerInput.t('ALPHABET');
    // Get a random alphabet name for hint
    const randomAlphabet = alphabetUtils.getRandomAlphabet(handlerInput);
    // Define Header Title & Hint 
    const headerTitle = handlerInput.t('HEADER_TITLE', { skillName: handlerInput.t('SKILL_NAME') });
    const hintText = handlerInput.t('HINT_TEMPLATE', { alphabet: randomAlphabet.name });
    // Define Sauces to be displayed
    const alphabetsIdsToDisplay = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    const alphabets = [];
    Object.keys(alphabet).forEach((item) => {
        if (alphabetsIdsToDisplay.includes(item)) {
            let alphabetItem = {
                id: item,
                image: alphabetUtils.getAlphabetImage(item),
                text: alphabet[item].name,
            };
            alphabets.push(alphabetItem);
        }
    });
    // Generate JSON Datasource
    return {
        alphabetData: {
            type: 'object',
            properties: {
                headerTitle: headerTitle,
                hintText: hintText,
                items: alphabets
            },
            transformers: [
                {
                    inputPath: 'hintText',
                    transformer: 'textToHint',
                }
            ]
        }
    };
}

/**
 * Compute the JSON Datasource associated to APL Alphabet Screen
 */
function generateAlphabetScreenDatasource(handlerInput, alphabetItem) {
    // Get a random alphabet name for hint
    const randomSauce = alphabetUtils.getRandomAlphabet(handlerInput);
    // Define Header Title & Hint 
    const headerTitle = handlerInput.t('ALPHABET_HEADER_TITLE', { alphabet: alphabetItem.name });
    const hintText = handlerInput.t('HINT_TEMPLATE', { alphabet: randomSauce.name });
    // Generate JSON Datasource
    return {
        alphabetData: {
            type: 'object',
            properties: {
                headerTitle: headerTitle,
                headerBackButton: !Alexa.isNewSession(handlerInput.requestEnvelope),
                hintText: hintText,
                alphabetImg: alphabetItem.image,
                alphabetText: alphabetItem.instructions,
                alphabetSsml: `<speak>${alphabetItem.instructions}</speak>`
            },
            transformers: [
                {
                    inputPath: 'alphabetSsml',
                    transformer: 'ssmlToSpeech',
                    outputName: 'alphabetSpeech'
                },
                {
                    inputPath: 'hintText',
                    transformer: 'textToHint',
                }
            ]
        }
    };
}

/**
 * Compute the JSON Datasource associated to APL Help Screen
 */
function generateHelpScreenDatasource(handlerInput) {
    // Get alphabet
    const alphabet = handlerInput.t('ALPHABET');
    // Define Header & Sub Titles 
    const headerTitle = handlerInput.t('HELP_HEADER_TITLE');
    const headerSubTitle = handlerInput.t('HELP_HEADER_SUBTITLE');
    // Define Sauces to be displayed
    const alphabetsIdsToDisplay = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    const alphabets = [];
    Object.keys(alphabet).forEach((item) => {
        if (alphabetsIdsToDisplay.includes(item)) {
            let alphabetItem = {
                id: item,
                primaryText: handlerInput.t('HINT_TEMPLATE', { alphabet: alphabet[item].name }),
            };
            alphabets.push(alphabetItem);
        }
    });
    // Generate JSON Datasource
    return {
        alphabetData: {
            headerTitle: headerTitle,
            headerSubtitle: headerSubTitle,
            headerBackButton: !Alexa.isNewSession(handlerInput.requestEnvelope),
            items: alphabets
        }
    };
}

module.exports = {
    launchScreen,
    helpScreen,
    alphabetScreen
} 