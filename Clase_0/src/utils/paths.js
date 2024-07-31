import Path from "path";

const __filename = new URL(import.meta.url).pathname;
const __dirname = Path.dirname(__filename);

const paths = {
    env: Path.join(Path.dirname(""), ".env"),
};

export default paths;