module.exports = function override (config, env) {
    let loaders = config.resolve
    loaders.fallback = {
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "buffer": require.resolve("buffer/")
    }
    
    return config
}