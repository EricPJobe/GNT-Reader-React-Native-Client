import React from "react";

const ReaderContext = React.createContext({
    referenceFrom: '',
    referenceTo: '',
    updateReferences: () => {}
});

export default ReaderContext;
