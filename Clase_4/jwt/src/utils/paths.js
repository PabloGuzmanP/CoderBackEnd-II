import path from "path";

const paths = {
    root: path.dirname(""),
    src: path.join(path.dirname(""), "src"),
    env: path.join(path.dirname(""), ".env"),
    public: path.join(path.dirname(""), "src", "public"),
    images: path.join(path.dirname(""), "src", "public", "images"),
    views: path.join(path.dirname(""), "src", "views"),
};

export default paths;