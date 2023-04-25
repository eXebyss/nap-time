'use client';

import { useEffect, useState } from 'react';

// Hook is used in order to check if the current code is run in a browser.
function useBrowserCheck() {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        typeof window !== 'undefined'
            ? setIsBrowser(true)
            : setIsBrowser(false);
    }, []);

    return isBrowser;
}

export default useBrowserCheck;
