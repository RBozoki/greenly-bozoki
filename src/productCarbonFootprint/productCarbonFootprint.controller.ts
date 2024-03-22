import {Body, Controller, Get, Logger, Param, Post} from "@nestjs/common";
import { ProductCarbonFootprint } from "./productCarbonFootprint.entity";
import { ProductCarbonFootprintService } from "./productCarbonFootprint.service";
import { CreateProductCarbonFootprintDto } from "./dto/create-productCarbonFootprint.dto";

@Controller("product-carbon-footprint")
export class ProductCarbonFootprintController {
    constructor(
        private readonly productCarbonFootprintService: ProductCarbonFootprintService
    ) {}

    @Get()
    getProductCarbonFootprints(): Promise<ProductCarbonFootprint[]> {
        Logger.log(
            `[product-carbon-footprint] [GET] ProductCarbonFootprint: getting all ProductCarbonFootprint`
        );
        return this.productCarbonFootprintService.findAll();
    }

    @Get(':name')
    findByProductName(@Param('name') name: string): Promise<ProductCarbonFootprint | null> {
        return this.productCarbonFootprintService.findByName(name);
    }

    @Post()
    createCarbonEmissionFactors(
        @Body() ProductCarbonFootprint: CreateProductCarbonFootprintDto
    ): Promise<ProductCarbonFootprint | null> {
        ``;
        Logger.log(
            `[product-carbon-footprint] [POST] ProductCarbonFootprint: ${ProductCarbonFootprint} created`
        );
        return this.productCarbonFootprintService.createAndSaveProductCarbonFootprint(ProductCarbonFootprint);
    }
}
