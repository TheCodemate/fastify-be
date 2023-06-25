export declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
  }

  interface FastifyRequest {
    user: {
      id: string | object | Buffer;
      email: string;
      name: string;
    };
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}
