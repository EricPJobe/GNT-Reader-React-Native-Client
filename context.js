import React from "react";

const ReaderContext = React.createContext({
    referenceFrom: '',
    referenceTo: '',
    bookName: '',
    updateReferences: () => {}
});

export default ReaderContext;
