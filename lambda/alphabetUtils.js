/**
 * This file defines utilities to manage alphabet
 */

// Images for known alphabet
const ALPHABET_IMAGES = {
    A: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/A.png",
    B: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/B.png",
    C: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/C.png",
    D: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/D.png",
    E: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/E.png",
    F: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/F.png",
    G: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/G.png",
    H: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/H.png",
    I: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/I.png",
    J: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/J.png",
    K: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/K.png",
    L: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/L.png",
    M: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/M.png",
    N: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/N.png",
    O: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/O.png",
    P: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/P.png",
    Q: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/Q.png",
    R: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/R.png",
    S: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/S.png",
    T: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/T.png",
    U: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/U.png",
    V: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/V.png",
    W: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/W.png",
    X: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/X.png",
    Y: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/Y.png",
    Z: "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/Z.png"
};
// Image for unknown alphabet
const ALPHABET_DEFAULT_IMAGE = "https://raw.githubusercontent.com/smanitech/English-Alphabet/master/assets/images/Alphabet/logo.svg";

module.exports = {

    /**
     * Returns an object containing the alphabet (alphabet) ID & spoken value by the User from the JSON request
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
            // Find associated Sauce Id from Entity Resolution (if a match has been made)
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
     * Returns a random localized alphabet from the list of available alphabet
     */
    getRandomAlphabet(handlerInput){
        const alphabet = handlerInput.t('ALPHABET');
        const keys = Object.keys(alphabet);
        const randomIndex = Math.floor(Math.random() * keys.length);
        return alphabet[keys[randomIndex]];
    },

    /**
     * Returns the Image URL associated to a alphabet ID
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