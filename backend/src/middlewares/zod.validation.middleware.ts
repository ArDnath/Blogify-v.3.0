import type { Context , Next } from "hono";
import { ZodSchema,ZodError } from "zod";


export const validationRequest = (schema: ZodSchema) =>{
    return async (c: Context, next: Next)=>{
        try {
            schema.parse(await c.req.json());
            await next();
        } catch (error) {
            if (error instanceof ZodError){
                const issues = error.issues.map((issue)=>({
                    message: issue.message,
                }))

                return c.json({issues}, {status:400})
            }
            else if(error instanceof Error){
                return c.json(
                    {
                        message: error.message
                    },
                    { status :400}
                )


            }
            else{
                return c.json(
                    {message: "Invalid request data"},
                    {status: 400}
                )
            }
            
        }
    }
}