import express, { Request, Response } from 'express';
import connection from './db';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export function app(): express.Express {
    const expressApp = express();
    expressApp.use(express.json());

    expressApp.get('/', (req, res, next) => {
        res.send({msg:'working'})
    });

    let validateUserloginReq = [
        body('user').exists().notEmpty().withMessage('User is required'),
        body('password').exists().notEmpty().withMessage('Password is required')
    ];

    expressApp.post('/login', validateUserloginReq, (req: Request, res: Response) => {
        try {
            console.log('req body: ', req.body);

            let userName = req.body.user;
            
            let validations = validationResult(req);
            if(!validations.isEmpty()) {
                res.status(400);
                res.send({ errors: validations.array() });
            } else {
                try {
                    connection.query("SELECT `users`.`ID`, `users`.`email_id`, `users`.`mobile`, `users`.`name`, `users`.`password`, `roles`.`name` as `role_name`, `roles`.`default_path` as `route_path` from `users` INNER JOIN `roles` on `roles`.`ID` = `users`.`role` where (`email_id` = ?)", [userName], (error, results, fields) => {
                        if (error) throw error;
                        let qResult: any = results;
                        if(qResult.length > 0) {
                            bcrypt.compare( req.body.password, qResult[0].password ).then( (isPasswordMatched) => {
                                if(isPasswordMatched) {
                                    let jwtToken = genrateJwtToken(qResult[0]);
                                    connection.query("update `users` set `access_token`=? where email_id=?", [jwtToken, qResult[0].email_id], (tokenErr, tokenResult, tokenFields) => {
                                        if(tokenErr) throw tokenErr;
                                        res.send({ data: jwtToken });
                                    });
                                } else {
                                    res.statusCode = 401;
                                    res.send({msg: 'Bad Credentials. please try again.'});
                                }
                            });
                        } else {
                            res.status(401);
                            res.send({msg: 'Bad Credentials. please try again.'});
                        }
                    });
                } catch ( exception: any ) {
                    res.status(500);
                    res.send({msg: exception.message});
                }
            }
        } catch( err: any ) {
            console.log('error: ', err);
            res.status(401);
            res.send({msg: err.message});
        }
    });

    let validateUserRegisterReq = [
        body('name').exists().notEmpty().withMessage('Name is required'),
        body('email').exists().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid Email ID'),
        body('mobile').exists().notEmpty().withMessage('Mobile is required').isLength({min: 10, max: 10}).withMessage('Invalide Mobile Number'),
        body('password').exists().notEmpty().withMessage('Password is required'),
    ];
    expressApp.post('/register_customer', validateUserRegisterReq, (req: Request, res: Response) => {
        try {
            let validationsErrors = validationResult(req);
            if(!validationsErrors.isEmpty()) {
                res.status(400).json({
                    success: false,
                    errors: validationsErrors.array(),
                  });
            }
            console.log('req body: ', req.body);
            try {
                connection.query(
                    "select * from `users` where `email_id` = ?",
                    [req.body.email],
                    (error, results, fields) => {
                    if (error) throw error;
                    let qResult: any = results;
                    if(qResult.length > 0)  {
                        res.status(400).send({msg: "User Already Registered With This Email ID."});
                    } else {
                        bcrypt.hash( req.body.password, 10).then( (encryptedPass) => {
                            connection.query(
                                "insert into `users` (`name`,`email_id`,`mobile`,`role`,`password`) values (?,?,?,?,?)",
                                [req.body.name, req.body.email, req.body.mobile, 2, encryptedPass],
                                (error2, results2, fields) => {
                                if (error2) throw error2;
                                res.send({ msg: 'User Registered Successfully' });
                            });
                        });
                    }
                });
            } catch ( exception: any ) {
                res.status(500).send({msg: exception.message});
            }
        } catch( err: any ) {
            res.status(500).send({msg: err.message});
        }
    });

    expressApp.get('/all_menu_items', (req: Request, res: Response) => {
        try {
            connection.query('select * from items', (queryErr, result, fields) => {
                let items: any = result;
                if(items) {
                    res.send({msg: 'Record Fetched Successfully', data: items});
                }
            });
        } catch (err: any) {
            res.status(500).send({msg: err.message});
        }
    });

    return expressApp;
}

function genrateJwtToken(user: any) {
    let userTokenPayload = {
        name: user.name,
        email_id: user.email_id,
        mobile: user.mobile,
        role: user.role_name,
        route: user.route_path,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    };
    return jwt.sign(userTokenPayload, 'bmt_sec');
}

function run(): void {
  const port = process.env['PORT'] || 5000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Book My table backend Node Express server listening on http://localhost:${port}`);
  });
}

run();
