import { useState, useEffect } from 'react';

const useThemeSwitch = () => {
    const [enabled, setEnabled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const theme = localStorage.getItem('theme');
        if (theme) {
            setEnabled(theme === 'dark');
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            if (enabled) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        }
    }, [enabled, isMounted]);

    return { enabled, setEnabled };
};

export default useThemeSwitch;
