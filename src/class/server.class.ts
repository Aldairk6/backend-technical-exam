import http from "http"
import config from "config"
import express from "express";
import logger from "../../lib/logger";

export default class HttpServer{
    private port:number;
    private httpServer: http.Server;
    private static _intance: HttpServer;
    public app: express.Application;

    constructor(){
        this.port = config.get("api.port")
        this.app = express();
        this.httpServer = new http.Server(this.app)
    }
    public static get instance(){
        return this._intance || (this._intance = new this())
    }
    async start(){
        try {
            await this.httpServer.listen(this.port)
            logger.info(`Server Run on port ${this.port}`)
        } catch (error) {
            logger.error(`ERROR ${error}`)
        }
    }
}