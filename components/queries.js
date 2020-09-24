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
