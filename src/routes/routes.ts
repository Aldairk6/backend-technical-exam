import { Request, Response, Router } from "express";
import ProductController from "../controllers/product.controller";

const productController = new ProductController();
const routes = Router();

routes.post("/products",async (req:Request, res:Response) => {
    try {
        const product = req.body;
        const response = await productController.saveProduct(product)
        return res.status(response.code).json(response)
    } catch (error:any) {
        return res.status(error.code ? error.code : 500).json(error)
    }
})

routes.get("/products",async (req:Request, res:Response) => {
    try {
        const response = await productController.getAllProducts()
        return res.status(response.code).json(response)
    } catch (error:any) {
        return res.status(error.code ? error.code : 500).json(error)
    }
})

routes.get("/products/:id",async (req:Request, res:Response) => {
    try {
        const id = req.params.id;
        const response = await productController.getProductById(id)
        return res.status(response.code).json(response)
    } catch (error:any) {
        return res.status(error.code ? error.code : 500).json(error)
    }
})

routes.put("/products/:id",async (req:Request, res:Response) => {
    try {
        const id = req.params.id;
        const product = req.body;
        const response = await productController.updateProduct(id,product)
        return res.status(response.code).json(response)
    } catch (error:any) {
        return res.status(error.code ? error.code : 500).json(error)
    }
})

routes.delete("/products/:id",async (req:Request, res:Response) => {
    try {
        const id = req.params.id;
        const response = await productController.deleteProduct(id)
        return res.status(response.code).json(response)
    } catch (error:any) {
        return res.status(error.code ? error.code : 500).json(error)
    }
})


export default routes