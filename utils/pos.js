const getPos = (pos) => {
    switch (pos) {
        case 'N-':
            return 'noun';
        case 'V-':
            return 'verb';
        case 'C-':
            return 'conjunction';
        case 'RA':
            return 'definite article';
        case 'P-':
            return 'preposition';
        case 'D-':
            return 'adverb';
        case 'RP':
            return 'personal pronoun';
        case 'I-':
            return 'interjection';
        case 'X-':
            return 'particle';
        case 'RR':
            return 'relative pronoun';
        case 'RD':
            return 'demonstrative pronoun';
        case 'RI':
            return 'interrogative/indefinite pronoun';
        case 'A-':
            return 'adjective'
        default: return "error";
    }
}

export default getPos;
