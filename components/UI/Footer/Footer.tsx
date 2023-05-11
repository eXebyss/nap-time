'use client';

import { SiLinkedin, SiGithub, SiCodewars } from 'react-icons/si';
import { useAppVersion, useBrowserCheck } from '@/hooks';
import { codewarsUrl, githubUrl, linkedinUrl } from '@/constants';
import classes from './footer.module.scss';

function Footer() {
    const isBrowser = useBrowserCheck();
    const appVersion = useAppVersion();

    const footerCopyRight = (isBrowser && (
        <b>
            <a href="https://www.mihailsfjodorovs.com/">[ me ]</a>
        </b>
    )) || (
        <span
            className="text-primary font-bold tooltip"
            data-tip="Mihails Fjodorovs"
        >
            [ me ]
        </span>
    );

    return (
        <footer className={classes.root}>
            <div className="items-center md:grid-flow-col">
                <p>
                    Copyright © {new Date().getFullYear()} - All right reserved
                    by {footerCopyRight} 👌
                </p>
                <div className="grid grid-flow-col">
                    <a
                        className="mx-1 fhd:mx-2"
                        href={linkedinUrl}
                        target="blank"
                        aria-label="Check my LinkedIn profile"
                    >
                        <SiLinkedin className="w-6 h-6 fill-base-content hover:fill-primary" />
                    </a>
                    <a
                        className="mx-1 fhd:mx-2"
                        href={githubUrl}
                        target="blank"
                        aria-label="Check my Github profile"
                    >
                        <SiGithub className="w-6 h-6 fill-base-content hover:fill-primary" />
                    </a>
                    <a
                        className="mx-1 fhd:mx-2"
                        href={codewarsUrl}
                        target="blank"
                        aria-label="Check my Codewars profile"
                    >
                        <SiCodewars className="w-6 h-6 fill-base-content hover:fill-primary" />
                    </a>
                </div>
                <p>v{appVersion}</p>
            </div>
        </footer>
    );
}

export default Footer;
