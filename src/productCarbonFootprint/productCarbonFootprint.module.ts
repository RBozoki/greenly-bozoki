import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCarbonFootprint } from "./productCarbonFootprint.entity";
import { ProductCarbonFootprintService } from "./productCarbonFootprint.service";

@Module({
    imports: [TypeOrmModule.forFeature([ProductCarbonFootprint])],
    providers: [ProductCarbonFootprintService],
})
export class ProductCarbonFootprintModule {}
