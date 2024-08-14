import Path from "path";

const __filename = new URL(import.meta.url).pathname;
const __dirname = Path.dirname(__filename);

const paths = {
    env: {
        db: Path.join(Path.dirname(""), ".env"),
        dev: Path.join(Path.dirname(""), ".env.dev"),
        prod: Path.join(Path.dirname(""), ".env.prod"),
    },
    forks: Path.join(Path.dirname(""), "src","forks"),
};

export default paths;