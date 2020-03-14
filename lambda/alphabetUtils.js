/**
 * This file defines utilities to manage alphabet
 */

// Images for known alphabet
const ALPHABET_IMAGES = {
    1: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/A.png",
    2: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/B.png",
    3: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/C.png",
    4: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/D.png",
    5: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/E.png",
    6: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/F.png",
    7: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/G.png",
    8: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/H.png",
    9: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/I.png",
    10: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/J.png",
    11: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/K.png",
    12: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/L.png",
    13: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/M.png",
    14: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/N.png",
    15: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/O.png",
    16: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/P.png",
    17: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/Q.png",
    18: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/R.png",
    19: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/S.png",
    20: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/T.png",
    21: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/U.png",
    22: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/V.png",
    23: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/W.png",
    24: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/X.png",
    25: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/Y.png",
    26: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/Z.png"
};
// Image for unknown alphabet
const ALPHABET_DEFAULT_IMAGE = "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/logo.svg";

module.exports = {

    /**
     * Returns an object containing the EngAlphabet (eaid) ID & spoken value by the User from the JSON request
     * Values are computing from slot "Item" or from Alexa.Presentation.APL.UserEvent arguments
     */
    getAlphabetItem(request){
        let alphabetItem = {};
        // Touch Event Request ?
        if (request.type === 'Alexa.Presentation.APL.UserEvent') {
            alphabetItem.id = request.arguments[1];
        } else {
            // Voice Intent Request
            const itemSlot = request.intent.slots["Item"];
            // Capture spoken value by the User
            if (itemSlot && itemSlot.value) {
                alphabetItem.spoken = itemSlot.value;
            }
            // Find associated eaid Id from Entity Resolution (if a match has been made)
            if (itemSlot &&
                itemSlot.resolutions &&
                itemSlot.resolutions.resolutionsPerAuthority[0] &&
                itemSlot.resolutions.resolutionsPerAuthority[0].status &&
                itemSlot.resolutions.resolutionsPerAuthority[0].status.code === 'ER_SUCCESS_MATCH') {
                alphabetItem.id = itemSlot.resolutions.resolutionsPerAuthority[0].values[0].value.id;
            }
        }
        return alphabetItem;
    },

    /**
     * Returns a random localized EngAlphabet from the list of available alphabet
     */
    getRandomAlphabet(handlerInput){
        const alphabet = handlerInput.t('ALPHABET');
        const keys = Object.keys(alphabet);
        const randomIndex = Math.floor(Math.random() * keys.length);
        return alphabet[keys[randomIndex]];
    },

    /**
     * Returns the Image URL associated to a EngAlphabet ID
     * When no dedicated Image is found, fallback to a default image 
     */
    getAlphabetImage(id){
        const url = ALPHABET_IMAGES[id];
        if (url){
            return url;
        }
        return ALPHABET_DEFAULT_IMAGE;
    }
}