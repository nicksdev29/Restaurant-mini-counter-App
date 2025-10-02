import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express, { NextFunction, Request, Response } from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import axios from 'axios';
import * as fs from 'fs';
import cors from 'cors';
import FormData from 'form-data';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();

  server.use(cors());
  server.use(express.json());
  server.use((req: Request, res: Response, next: NextFunction) => {
    // Set the header to allow any origin to access this server
    res.header('Access-Control-Allow-Origin', '*');
    // Proceed to the next middleware or route handler
    next();
  });

  const API_BASE_URL = "http://localhost:5000/";

  const axiosApp = new axios.Axios();

  server.post('/post/*', (req,res,next) => {
    let finalUrl = API_BASE_URL + req.query['endPoint'];
    let headers = {
      "Content-Type": "application/json"
    };
    console.log('url: ', finalUrl);
    // let reqBody = new FormData();
    // Object.keys( req.body ).forEach( (key) => {
    //   reqBody.append(key, req.body[key] );
    // });
    axiosApp.post(finalUrl, JSON.stringify( req.body), { headers: headers }).then( (apiResponse) => {
      res.status(apiResponse.status).send(apiResponse.data);
    }).catch( (err) => {
      console.log(err);
    })
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
