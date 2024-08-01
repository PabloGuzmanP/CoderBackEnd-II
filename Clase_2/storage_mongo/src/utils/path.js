import session from "express-session";
import Path from "path";

const __filename = new URL(import.meta.url).pathname;
const __dirname = Path.dirname(__filename);

const paths = {
    root: Path.dirname(""),
    env: Path.join(Path.dirname(""), ".env"),
    src: Path.join(Path.dirname(""), "src"),
    sessions: Path.join(Path.dirname(""), "src", "sessions"),
};

export default paths;