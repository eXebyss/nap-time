const WelcomeTextShimmer = () => {
    return (
        <div className="p-4 w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                    <div className="grid grid-row-3 lg:grid-rows-1 grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-8">
                        <div className="h-24 bg-neutral rounded col-span-1" />
                        <div className="h-24 bg-neutral rounded col-span-1" />
                        <div className="h-24 bg-neutral rounded col-span-1" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeTextShimmer;
