import {Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductCarbonFootprintDto } from "./dto/create-productCarbonFootprint.dto";
import { ProductCarbonFootprint } from "./productCarbonFootprint.entity";
import { CarbonEmissionFactor } from "../carbonEmissionFactor/carbonEmissionFactor.entity";

@Injectable()
export class ProductCarbonFootprintService {
    constructor(
        @InjectRepository(ProductCarbonFootprint)
        private productCarbonFootprintRepository: Repository<ProductCarbonFootprint>,
        @InjectRepository(CarbonEmissionFactor)
        private carbonEmissionFactorRepository: Repository<CarbonEmissionFactor>
    ) {}


    findAll(): Promise<ProductCarbonFootprint[]> {
        return this.productCarbonFootprintRepository.find();
    }

    findByName(name: string): Promise<ProductCarbonFootprint | null> {
        return this.productCarbonFootprintRepository.findOne({ where: { name } });
    }

    async calculateCarbonFootprint(ingredients: {
        name: string;
        quantity: number;
        unit: string
    }[]): Promise<number | null> {
        let totalCarbonFootprint = 0;

        for (const ingredient of ingredients) {
            const carbonEmissionFactor = await this.carbonEmissionFactorRepository.findOne({
                where: { name: ingredient.name, unit: ingredient.unit }
            });

            if (!carbonEmissionFactor) {
                return null;
            }

            totalCarbonFootprint += ingredient.quantity * carbonEmissionFactor.emissionCO2eInKgPerUnit;
        }

        return totalCarbonFootprint;
    }

    async createAndSaveProductCarbonFootprint(productCarbonFootprintDto: CreateProductCarbonFootprintDto): Promise<ProductCarbonFootprint | null> {
        const productCarbonFootprint = await this.calculateCarbonFootprint(productCarbonFootprintDto.ingredients);

        if (productCarbonFootprint === null) {
            throw new NotFoundException('Carbon emission factor not found');
        }

        const newProductCarbonFootprint = this.productCarbonFootprintRepository.create({
            name: productCarbonFootprintDto.name,
            emissionCO2eInKg: productCarbonFootprint
        });

        return this.productCarbonFootprintRepository.save(newProductCarbonFootprint);
    }

}
