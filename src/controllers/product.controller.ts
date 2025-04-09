import logger from "../../lib/logger";
import MongoConn from "../../lib/mongodb";
import IProducto from "../interfaces/product.interface";
import IResponse from "../interfaces/response.interface";
import productModel from "../models/product.model";

export default class ProductController{
    private mongoConn: MongoConn;
    constructor(){
        this.mongoConn = new MongoConn();
    }
    async saveProduct(product:IProducto):Promise<IResponse>{
        try {
            if(!product){
                return ({ok:false,message:"Datos incorrecto", response: null, code: 400})
            }
            await this.mongoConn.connectDB();
            const productExist = await productModel.findOne({name:product.name});
            if(productExist){
                return ({ok:false,message:"Producto existente", response: null, code: 409})
            }else{
                const productSave = await productModel.create(product);
                return ({ok:true,message:"Producto Guardado", response: productSave, code: 200})
            }
        } catch (error) {
            logger.error("[ProductController/saveProduct] " + error);
            return ({ok:false,message:"Error on DataBase", response: null, code: 500})
        }finally{
            await this.mongoConn.disconnectDB();
        }
    }

    async getAllProducts():Promise<IResponse>{
        try {
            await this.mongoConn.connectDB();
            const products = await productModel.find({});
            return ({ok:true,message:"Productos encontrados", response: products, code: 200})
        } catch (error) {
            logger.error("[ProductController/getAllProducts] " + error);
            return ({ok:false,message:"Error on DataBase", response: null, code: 500})
        }finally{
            await this.mongoConn.disconnectDB();
        }
    }

    async getProductById(id:string):Promise<IResponse>{
        try {

            await this.mongoConn.connectDB();
            const product = await productModel.find({_id:id});
            if(product.length < 1){
                return ({ok:false,message:"No hay producto", response: null, code: 404})
            }
            return ({ok:true,message:"Producto encontrado", response: product, code: 200})
        } catch (error) {
            logger.error("[ProductController/getProductById] " + error);
            return ({ok:false,message:"Error on DataBase", response: null, code: 500})
        }finally{
            await this.mongoConn.disconnectDB();
        }
    }

    async updateProduct(id:string,product:IProducto):Promise<IResponse>{
        try {
            await this.mongoConn.connectDB();
            const productUpdate = await productModel.findOneAndUpdate({_id:id},product,{new:true});
            if(!productUpdate){
                return ({ok:false,message:"No hay producto", response: null, code: 404})
            }
            return ({ok:true,message:"Producto actualizado", response: productUpdate, code: 200})
        } catch (error) {
            logger.error("[ProductController/updateProduct] " + error);
            return ({ok:false,message:"Error on DataBase", response: null, code: 500})
        }finally{
            await this.mongoConn.disconnectDB();
        }
    }

    async deleteProduct(id:string):Promise<IResponse>{
        try {
            await this.mongoConn.connectDB();
            const productDelete = await productModel.findOneAndDelete({_id:id});
            if(!productDelete){
                return ({ok:false,message:"No hay producto", response: null, code: 404})
            }
            return ({ok:true,message:"Producto eliminado", response: productDelete, code: 200})
        } catch (error) {
            logger.error("[ProductController/deleteProduct] " + error);
            return ({ok:false,message:"Error on DataBase", response: null, code: 500})
        }finally{
            await this.mongoConn.disconnectDB();
        }
    }
}