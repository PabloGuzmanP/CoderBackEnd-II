import Path from "path";

const paths = {
    root: Path.dirname(""),
    src: Path.join(Path.dirname(""), "src"),
    env: Path.join(Path.dirname(""), ".env"),
    public: Path.join(Path.dirname(""), "src", "public"),
    images: Path.join(Path.dirname(""), "src", "public", "images"),
    views: Path.join(Path.dirname(""), "src", "views"),
};

export default paths;