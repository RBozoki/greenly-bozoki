import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCarbonFootprint } from "./productCarbonFootprint.entity";
import { ProductCarbonFootprintService } from "./productCarbonFootprint.service";
import { ProductCarbonFootprintController } from "./productCarbonFootprint.controller";
import { CarbonEmissionFactor } from "../carbonEmissionFactor/carbonEmissionFactor.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CarbonEmissionFactor, ProductCarbonFootprint])],
    providers: [ProductCarbonFootprintService],
    controllers: [ProductCarbonFootprintController]
})
export class ProductCarbonFootprintModule {}
