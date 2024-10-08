// import { Router } from "express";
// import UserManager from "../managers/UserManager.js";

// import {
//     ERROR_INVALID_ID,
//     ERROR_NOT_FOUND_ID,
// } from "../constants/messages.constant.js";

// const router = Router();
// const userManager = new UserManager();

// const errorHandler = (res, message) => {
//     if (message === ERROR_INVALID_ID) return res.status(400).json({ status: false, message: ERROR_INVALID_ID });
//     if (message === ERROR_NOT_FOUND_ID) return res.status(404).json({ status: false, message: ERROR_NOT_FOUND_ID });
//     return res.status(500).json({ status: false, message });
// };

// const getCookiesAndData = async (url, body) => {
//     const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//     });

//     if(!response.ok){
//         const data = await response.json();
//         throw new Error(data.message);
//     }

//     const cookies = response.headers.get("set.cookie");
//     return cookies;
// };

// const validateSession = (req, res, next) => {
//     if(!req.isAuthenticated()){
//         return res.status(403).send("Este es un recurso privado exclusivo para usuarios registrados.");
//     }

//     next();
// };

// router.get("/", async (req, res) => {
//     const session = {
//         loggedIn: req.isAuthenticated(),
//         loggedOut: !req.isAuthenticated(),
//         name: req.session?.passport?.user?.name,
//     }
//     res.status(200).render("home", session);
// });

// router.get("/register", (req, res) => {
//     res.status(200).render("register");
// });

// router.post("/register", async (req, res) => {
//     try {
//         const URL = "http://localhost:8080/api/sessions/register";
//         const cookies = await getCookiesAndData(URL, req.body);
//         res.setHeader("set-cookie", cookies);

//         res.status(200).redirect("/");
//     } catch (error) {
//         res.status(400).render("register", { errorMessage: error.message });
//     }
// });

// router.get("/login", (req, res) => {
//     res.status(200).render("login");
// });

// router.post("/login", async (req, res) => {
//     try {
//         const URL = "http://localhost:8080/api/sessions/login";
//         const cookies = await getCookiesAndData(URL, req.body);
//         res.setHeader("set-cookie", cookies);

//         res.status(200).redirect("/");
//     } catch (error) {
//         res.status(400).render("login", { errorMessage: error.message });
//     }
// });

// router.get("/reset-password", (req, res) => {
//     res.status(200).render("resetPassword");
// });

// router.post("/reset-password", async (req, res) => {
//     try {
//         const URL = "http://localhost:8080/api/sessions/reset-password";
//         const cookies = await getCookiesAndData(URL, req.body);
//         res.setHeader("set-cookie", cookies);

//         res.status(200).render("resetPassword", { successMessage: "Se ha restaurado tu contraseña" });
//     } catch (error) {
//         res.status(400).render("resetPassword", { errorMessage: error.message });
//     }
// });

// router.get("/profile", validateSession, async (req, res) => {
//     try {
//         const id = req.session?.passport?.user?.id;
//         const userFound = await userManager.getOneById(id);
//         res.status(200).render("profile", userFound);
//     } catch (error) {
//         errorHandler(res, error.message);
//     }
// });

// export default router;


import { Router } from "express";
import UserManager from "../managers/UserManager.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
} from "../constants/messages.constant.js";

const router = Router();
const userManager = new UserManager();

const errorHandler = (res, message) => {
    if (message === ERROR_INVALID_ID) return res.status(400).json({ status: false, message: ERROR_INVALID_ID });
    if (message === ERROR_NOT_FOUND_ID) return res.status(404).json({ status: false, message: ERROR_NOT_FOUND_ID });
    return res.status(500).json({ status: false, message });
};

const getCookiesAndData = async (url, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if(!response.ok){
        const data = await response.json();
        throw new Error(data.message);
    }

    const cookies = response.headers.get("set.cookie");
    return cookies;
};

const validateSession = (req, res, next) => {
    if(!req.isAuthenticated()){
        return res.status(403).send("Este es un recurso privado exclusivo para usuarios registrados.");
    }

    next();
};

router.get("/", async (req, res) => {
    const session = {
        loggedIn: req.isAuthenticated(),
        loggedOut: !req.isAuthenticated(),
        name: req.session?.passport?.user?.name,
    }
    res.status(200).render("home", session);
});

router.get("/register", (req, res) => {
    res.status(200).render("register");
});

router.post("/register", async (req, res) => {
    try {
        const URL = "http://localhost:8080/api/sessions/register";
        const cookies = await getCookiesAndData(URL, req.body);
        res.setHeader("set-cookie", cookies);

        res.status(200).redirect("/");
    } catch (error) {
        res.status(400).render("register", { errorMessage: error.message });
    }
});

router.get("/login", (req, res) => {
    res.status(200).render("login");
});

router.post("/login", async (req, res) => {
    try {
        const URL = "http://localhost:8080/api/sessions/login";
        const cookies = await getCookiesAndData(URL, req.body);
        res.setHeader("set-cookie", cookies);

        res.status(200).redirect("/");
    } catch (error) {
        res.status(400).render("login", { errorMessage: error.message });
    }
});

router.get("/reset-password", (req, res) => {
    res.status(200).render("resetPassword");
});

router.post("/reset-password", async (req, res) => {
    try {
        const URL = "http://localhost:8080/api/sessions/reset-password";
        const cookies = await getCookiesAndData(URL, req.body);
        res.setHeader("set-cookie", cookies);

        res.status(200).render("resetPassword", { successMessage: "Se ha restaurado tu contraseña" });
    } catch (error) {
        res.status(400).render("resetPassword", { errorMessage: error.message });
    }
});

router.get("/profile", validateSession, async (req, res) => {
    try {
        const id = req.session?.passport?.user?.id;
        const userFound = await userManager.getOneById(id);
        res.status(200).render("profile", {
            loggedIn: req.isAuthenticated(),
            user: userFound,
        });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

export default router;
