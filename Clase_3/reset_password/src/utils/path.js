import Path from "path";

const __filename = new URL(import.meta.url).pathname;
const __dirname = Path.dirname(__filename);

const paths = {
    root: Path.dirname(""),
    src: Path.join(Path.dirname(""), "src"),
    env: Path.join(Path.dirname(""), ".env"),
    public: Path.join(Path.dirname(""), "src", "public"),
    views: Path.join(Path.dirname(""), "src", "views"),
    files: Path.join(Path.dirname(""), "src", "files"),
    css: Path.join(Path.dirname(""), "src", "public", "css")
};

export default paths;