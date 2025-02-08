global.window.matchMedia = global.window.matchMedia || function() {
    return {
        matches: false,
        addListener: () => {},
        removeListener: () => {},
    };
};
