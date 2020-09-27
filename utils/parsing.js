const getParsing = (parsing) => {
    const parsingCodes = {
        person: parsing.charAt(0),
        tense: parsing.charAt(1),
        voice: parsing.charAt(2),
        mood: parsing.charAt(3),
        nounCase: parsing.charAt(4),
        number: parsing.charAt(5),
        gender: parsing.charAt(6),
        degree: parsing.charAt(7),
    }

    let parsingStrings = {};
    switch (parsingCodes.person) {
        case '1':
            parsingStrings.person = '1st';
            break;
        case '2':
            parsingStrings.person = '2nd';
            break;
        case '3':
            parsingStrings.person = '3rd';
            break;
        default:
            parsingStrings.person = undefined;
            break;
    }

    switch (parsingCodes.tense) {
        case 'P':
            parsingStrings.tense = 'present';
            break;
        case 'I':
            parsingStrings.tense = 'imperfect';
            break;
        case 'F':
            parsingStrings.tense = 'future';
            break;
        case 'A':
            parsingStrings.tense = 'aorist';
            break;
        case 'X':
            parsingStrings.tense = 'perfect';
            break;
        case 'Y':
            parsingStrings.tense = 'pluperfect';
            break;
        default:
            parsingStrings.tense = undefined;
            break;
    }

    switch (parsingCodes.voice) {
        case 'A':
            parsingStrings.voice = 'active';
            break;
        case 'M':
            parsingStrings.voice = 'middle';
            break;
        case 'P':
            parsingStrings.voice = 'passive';
            break;
        default:
            parsingStrings.voice = undefined;
            break;
    }

    switch (parsingCodes.mood) {
        case 'I':
            parsingStrings.mood = 'indicative';
            break;
        case 'D':
            parsingStrings.mood = 'imperative';
            break;
        case 'S':
            parsingStrings.mood = 'subjunctive';
            break;
        case 'O':
            parsingStrings.mood = 'optative';
            break;
        case 'N':
            parsingStrings.mood = 'infinitive';
            break;
        case 'P':
            parsingStrings.mood = 'participle';
            break;
        default:
            parsingStrings.mood = undefined;
            break;
    }

    switch (parsingCodes.nounCase) {
        case 'N':
            parsingStrings.nounCase = 'nominative';
            break;
        case 'G':
            parsingStrings.nounCase = 'genitive';
            break;
        case 'D':
            parsingStrings.nounCase = 'dative';
            break;
        case 'A':
            parsingStrings.nounCase = 'accusative';
            break;
        default:
            parsingStrings.nounCase = undefined;
            break;
    }

    switch (parsingCodes.number) {
        case 'S':
            parsingStrings.number = 'singular';
            break;
        case 'P':
            parsingStrings.number = 'plural';
            break;
        default:
            parsingStrings.number = undefined;
            break;
    }

    switch (parsingCodes.gender) {
        case 'M':
            parsingStrings.gender = 'masculine';
            break;
        case 'F':
            parsingStrings.gender = 'feminine';
            break;
        case 'N':
            parsingStrings.gender = 'neuter';
            break;
        default:
            parsingStrings.gender = undefined;
            break;
    }

    switch (parsingCodes.degree) {
        case 'C':
            parsingStrings.degree = 'comparative';
            break;
        case 'S':
            parsingStrings.degree = 'superlative';
            break;
        default:
            parsingStrings.degree = undefined;
            break;
    }

    return parsingStrings;
}

export default getParsing;
