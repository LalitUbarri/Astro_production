require("babel-register")({
    presets: ["es2015", "react"]
});

const router = require("./route").default;
const Sitemap = require("react-router-sitemap").default;
const { HTTP1 } = require('./src/configuration/constants')
function generateSitemap() {
    return (
        new Sitemap(router)
            .build(HTTP1)
            .save("./public/sitemap.xml")
    );
}

generateSitemap();