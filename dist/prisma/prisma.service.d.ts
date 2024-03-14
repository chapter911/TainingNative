import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";
export declare class PrismaService extends PrismaClient {
    constructor(config: ConfigService);
    deleteDbData(): Promise<[import(".prisma/client").Prisma.BatchPayload]>;
}
