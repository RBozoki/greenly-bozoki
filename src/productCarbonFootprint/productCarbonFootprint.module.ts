import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCarbonFootprint } from "./productCarbonFootprint.entity";
import { ProductCarbonFootprintService } from "./productCarbonFootprint.service";
import { ProductCarbonFootprintController } from "./productCarbonFootprint.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ProductCarbonFootprint])],
    providers: [ProductCarbonFootprintService],
    controllers: [ProductCarbonFootprintController]
})
export class ProductCarbonFootprintModule {}
