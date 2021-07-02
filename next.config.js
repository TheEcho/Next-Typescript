module.exports = {
    images: {
        domains: ['apod.nasa.gov']
    },
    webpack5: true,
    webpack: (config) => {
        config.experiments = {
            topLevelAwait: true
        };
        return config;
    }
};
