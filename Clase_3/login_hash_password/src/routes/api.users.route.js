import { Router } from "express";
import UserManager from "../managers/UserManager.js";

const router = Router();
const userManager = new UserManager();

router.get("/", async (req, res) => {
    try {
        const usersFound = await userManager.getAll();
        res.status(200).send({status: "success", payload: usersFound});
    } catch (error) {
        res.json(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const usersFound = await userManager.getOneById(id);
        res.status(200).send({status: "success", payload: usersFound});
    } catch (error) {
        res.json(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const userCreated = await userManager.insertOne(req.body);
        res.status(201).send({status: "success", payload: userCreated});
    } catch (error) {
        res.json(error.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const usersFound = await userManager.updateOneById(req.params.id, req.body);
        res.status(200).send({status: "success", payload: usersFound});
    } catch (error) {
        res.json(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const usersFound = await userManager.deleteOneById(req.params.id);
        res.status(200).send({status: "success", payload: usersFound});
    } catch (error) {
        res.json(error.message);
    }
});

export default router;