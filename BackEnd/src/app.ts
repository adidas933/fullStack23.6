import express from 'express';
import { appConfig } from './2-utils/app-config';
import { employeeController } from './5-controllers/employeesControllers';
import { logsMiddleware } from './6-middleware/logs-Middleware';
import { securityMiddleware } from './6-middleware/security-middleware';
import { errorsMiddleware } from './6-middleware/errors-middleware';
import { productController } from './5-controllers/productController';
import { userController } from './5-controllers/user-controller';
import expressFileUpload from 'express-fileupload';
import { fileSaver } from 'uploaded-file-saver';
import path from 'path';
import cors from 'cors';

// Configure fileSaver once:
fileSaver.config(
  path.join(__dirname, '1-assets', 'images')
);

// Create main server object:
const server = express();

server.use(cors());

// Create the body from json
server.use(express.json());

// Read files into request.files
server.use(expressFileUpload());

// register log middleware
server.use(logsMiddleware.logRequest);
server.use(securityMiddleware.preventXssAttack);

server.use("/api/products/images", express.static(path.join(__dirname, "1-assets/images/productsImages")))
server.use("/api/employees/images", express.static(path.join(__dirname, "1-assets/images/employeesImages")))



server.use(
  '/api',
  productController.router,
  userController.router,
  employeeController.router
);
server.use('*', errorsMiddleware.routeNotFound);

// Register catch all:
server.use(errorsMiddleware.catchAll);

// Run server:
server.listen(appConfig.port, () =>
  console.log('Listening on http://localhost:' + appConfig.port)
);
