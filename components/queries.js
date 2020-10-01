import {gql} from "@apollo/client";

export const getBooksQuery = gql`
    query GetBooks {
        books {
            bookId
            bookName
            numChapters
        }
    }
`

export const getVersesQuery = gql`
    query GetVerses($bookNumber: Int, $chapterNumber: Int) {
        chapter(bookNumber: $bookNumber, chapterNumber: $chapterNumber) {
            numVerses
        }
    }
`

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
`

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
`
export const UpdateFlashcard = gql`
    mutation UpdateFlashcard($pos: String, $parsing: String, $word: String, $lemma: String, $gloss: String, $isActive: Boolean, $levelLearned: Int) {
        updateFlashcard(input: {
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
`

export const DeleteFlashcard = gql`
    mutation DeleteFlashcard {
        deleteFlashcard(id: 3) {
            errors {
                message
            }
            deletedFlashcardId
        }
    }
`
