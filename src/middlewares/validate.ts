import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const validate =
    (schema: z.ZodSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json(result.error.errors);
            return;
        }
        req.validatedData = result.data;
        next();
    };

export default validate;
