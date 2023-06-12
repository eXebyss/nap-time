'use client';

import { Switch } from '@headlessui/react';
import useThemeSwitch from './useThemeSwitch';

export default function ThemeSwitch() {
    const { enabled, setEnabled } = useThemeSwitch();

    return (
        <>
            <p>🌞</p>
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
      relative inline-flex h-[30px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`${
                        enabled ? 'translate-x-[30px]' : 'translate-x-0'
                    }
        pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
            <p>🌚</p>
        </>
    );
}
