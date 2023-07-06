import Link from 'next/link';

interface MegaMenuLinkProps {
    href: string;
    text: string;
    onClick: () => void;
}

const MegaMenuLink = ({ href, text, onClick }: MegaMenuLinkProps) => (
    <button
        type="button"
        aria-label={text}
        className="xl:my-0"
        onClick={onClick}
    >
        <Link
            href={href}
            className="my-2 xl:my-4 text-sm text-base-content flex flex-wrap justify-start items-center gap-x-2 fhd:gap-x-4"
        >
            {text}
        </Link>
    </button>
);

export default MegaMenuLink;
