import {gql} from "@apollo/client";

export const getBooksQuery = gql`
    query GetBooks {
        books {
            bookId
            bookName
            numChapters
        }
    }
`;

export const getVersesQuery = gql`
    query GetVerses($bookNumber: Int, $chapterNumber: Int) {
        chapter(bookNumber: $bookNumber, chapterNumber: $chapterNumber) {
            numVerses
        }
    }
`;

export const getWordsQuery = gql`
    query GetWords($referenceFrom: String, $referenceTo: String) {
        words(referenceFrom: $referenceFrom, referenceTo: $referenceTo) {
            id
            reference
            pos
            parsing
            text
            word
            normalized
            lemma
            gloss
        }
    }
`;

export const createFlashcardMutation = gql`
    mutation CreateFlashcard($pos: String, $parsing: String, $word: String, $lemma: String, $gloss: String, $isActive: Boolean, $levelLearned: Int) {
        createFlashcard(input: {
            pos: $pos,
            parsing: $parsing,
            word: $word,
            lemma: $lemma,
            gloss: $gloss,
            isActive: $isActive,
            levelLearned: $levelLearned
        }) {
            errors {
                message
            }
            flashcard {
                word
            }
        }
    }
`;

export const updateFlashcardMutation = gql`
    mutation UpdateFlashcard($id: ID!, $isActive: Boolean, $levelLearned: Int) {
        updateFlashcard(
            input: {
                id: $id,
                isActive: $isActive,
                levelLearned: $levelLearned
        }) {
            errors {
                message
            }
            flashcard {
                word
            }
        }
    } 
`;

export const deleteFlashcardMutation = gql`
    mutation DeleteFlashcard($id: ID) {
        deleteFlashcard(id:$id) {
            errors {
                message
            }
            deletedFlashcardId
        }
    }
`;

export const getFlashcards = gql`
    query GetFlashcards {
        flashcards {
            id
            pos
            parsing
            word
            lemma
            gloss
            isActive
            levelLearned
        }
    }
`;
