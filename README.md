# English-Alphabet
An Alexa Presentation Language (APL) skill for children.

## Prerequisites

* An Alexa Developer Account (sign up here: https://developer.amazon.com/alexa-skills-kit)
* Alexa Skills Kit Command Line Interface (ASK CLI) (Follow Quick Start: https://developer.amazon.com/en-IN/docs/alexa/smapi/quick-start-alexa-skills-kit-command-line-interface.html)
* (Optional) An AWS Account (sign up here: https://aws.amazon.com)
* (Optional) An Amazon Echo Device with a screen (e.g. Amazon Echo Show)

> Note: The AWS Account is optional because you can create this sample as an Alexa Hosted skill.  The Echo Show is optional because you can see the display in the simulator.

## Brief Steps

> Note: The below steps assume you have general familiarity with how to use the Alexa Developer Console.  If you've never created a skill before, check out the [fact skill](https://github.com/alexa/skill-sample-nodejs-fact) tutorial to get the feel for it.

1. From the [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask) create a new skill.
    1. Name the skill whatever you want !
    1. Choose the language model you want to use, as long as as it is `English (IN)` which corresponds to **en-IN**.
    1. Choose the **Custom** interaction model.
    1. Choose **Alexa-Hosted (Node.js)**.
1. Choose **Sauce Boss Skill** template to add to your skill.
1. It may take a minute, but when your skill is ready, go to the **JSON Editor** section and replace all the contents with the interaction model from [here](./models) that matches the locale you chose in the previous step.  Click **Save Model**.
1. Save that change and build your model.
1. Click on the **Code** tab and update the following files with the contents from this repo:

1. Add the following files in folder named `lambda` with noted content:
    * `alphabet.js` from the file [alphabet.js](./lambda/alphabet.js) (Alphabet Name & instructions - all locales)
    * `alphabetUtils.js` from the file [alphabetUtils.js](./lambda/alphabetUtils) (Utilities to manage alphabet)
    * `aplUtils.js` from the file [aplUtils.js](./lambda/aplUtils.js) (Utilities for APL Support: Directives - Commands - Datasources)
    * `index.js` from the file [index.js](./lambda/index.js) (Pro tip: click the **Raw** button to make it easier to copy)
    * `languageStrings.js` from the file [languageStrings.js](./lambda/languageStrings.js) (Voice & Display prompts - all locales)
    * `package.json` from the file [package.json](./lambda/package.json)
    * `util.js` from the file [util.js](./lambda/util.js)
1. Create a folder named `apl` (for APL Templates).
1. In the **apl** folder, create these files with the noted content:
    * `launchRequest.json` from the file [launchRequest.json](./lambda/apl/launchRequest.json) (APL Template for Launch Screen)
    * `launchRequest_datasource.json` from the file [launchRequest_datasource.json](./lambda/apl/launchRequest_datasource.json) (APL Data for Launch Screen)
    * `engAlphabetIntent.json` from the file [engAlphabetIntent.json](./lambda/apl/engAlphabetIntent.json) (APL Template for Alphabet Screen)
    * `engAlphabetIntent_datasource.json` from the file [engAlphabetIntent_datasource.json](./lambda/apl/engAlphabetIntent_datasource.json) (APL Data for Alphabet Screen)
    * `helpIntent.json` from the file [helpIntent.json](./lambda/apl/helpIntent.json) (APL Template for Help Screen)
    * `helpIntent_datasource.json` from the file [helpIntent_datasource.json](./lambda/apl/helpIntent_datasource.json) (APL Data for Help Screen)

1. Save and Deploy the function
1. Click on the **Test** tab, enable the skill and check it out.  Phrases you can try include:
    * `open english alphabet` (or whatever invocation name you used)

## ask-cli Steps

1. Clone the repository.

	```bash
	$ git clone https://github.com/smanitech/English-Alphabet
	```

2. From the [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask) create a new skill.
    1. Name the skill whatever you want !
    2. Choose the language model you want to use, as long as as it is `English (IN)` which corresponds to **en-IN**.
    3. Choose the **Custom** interaction model.
    4. Choose **Alexa-Hosted (Node.js)**.
3. Choose **Sauce Boss Skill** template to add to your skill.
4. It may take a minute, but when your skill is ready, open terminal inside a folder where you want to clone your APL template.

    1. Initialize the [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html) by navigating into the repository `ask init`. Follow the prompts.
    prompts.

    	```bash
    	$ ask clone
    	```
      then select you skill using arrow keys and hit enter
      <p align='center'>
        <img src='https://raw.githubusercontent.com/smanitech/English-Alphabet/master/Screenshots/1.png'><br/>
        <img src='https://raw.githubusercontent.com/smanitech/English-Alphabet/master/Screenshots/2.png'>
      </p>

    2. Copy folder named `lambda` **&** folder named `models` from this repo. then, Follow the Below Commands.

    	```bash
    	$ cd English_Alphabet
    	$ git add .
    	```
      ```bash
      $ git commit -m "updated"
      $ ask deploy
      ```
      Example:
      <p align='center'>
        <img src='https://raw.githubusercontent.com/smanitech/English-Alphabet/master/Screenshots/3.png'><br/>
        <img src='https://raw.githubusercontent.com/smanitech/English-Alphabet/master/Screenshots/4.png'><br/>
        <img src='https://raw.githubusercontent.com/smanitech/English-Alphabet/master/Screenshots/5.png'><br/>
        <img src='https://raw.githubusercontent.com/smanitech/English-Alphabet/master/Screenshots/6.png'><br/>
      </p>
    3. Click on the **Test** tab, enable the skill and check it out.  Phrases you can try include:
        * `open english alphabet` (or whatever invocation name you used)
