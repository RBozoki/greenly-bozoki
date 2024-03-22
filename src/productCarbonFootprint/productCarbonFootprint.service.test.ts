import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductCarbonFootprintService } from "./productCarbonFootprint.service";
import { ProductCarbonFootprint } from "./productCarbonFootprint.entity";
import { CarbonEmissionFactor } from "../carbonEmissionFactor/carbonEmissionFactor.entity";
import { dataSource } from "../../config/dataSource";

const HAM_CHEESE_PIZZA_EMISSION: number = 0.224;

const hamCheesePizza = {
    ingredients: [
        { name: "ham", quantity: 0.1, unit: "kg" },
        { name: "cheese", quantity: 0.15, unit: "kg" },
        { name: "tomato", quantity: 0.4, unit: "kg" },
        { name: "flour", quantity: 0.7, unit: "kg" },
        { name: "oliveOil", quantity: 0.3, unit: "kg" },
    ],
};

const hamCheesePizzaAlt = {
    ingredients: [
        { name: "ham", quantity: 0.1, unit: "kg" },
        { name: "cheese", quantity: 0.15, unit: "kg" },
        { name: "tomato", quantity: 0.4, unit: "kg" },
        { name: "flour", quantity: 0.7, unit: "kg" },
        { name: "oliveOil", quantity: 0.3, unit: "kg" },
        { name: "sand", quantity: 0.5, unit: "kg" }, // Missing ingredient in database
    ],
};

beforeAll(async () => {
    await dataSource.initialize();
});

beforeEach(async () => {
    await dataSource.getRepository(CarbonEmissionFactor).delete({});
    await dataSource.getRepository(CarbonEmissionFactor).save([
        new CarbonEmissionFactor({ name: "ham", unit: "kg", emissionCO2eInKgPerUnit: 3.5, source: "test" }),
        new CarbonEmissionFactor({ name: "cheese", unit: "kg", emissionCO2eInKgPerUnit: 2.1, source: "test" }),
        new CarbonEmissionFactor({ name: "tomato", unit: "kg", emissionCO2eInKgPerUnit: 0.4, source: "test" }),
        new CarbonEmissionFactor({ name: "flour", unit: "kg", emissionCO2eInKgPerUnit: 1.1, source: "test" }),
        new CarbonEmissionFactor({ name: "oliveOil", unit: "kg", emissionCO2eInKgPerUnit: 2.5, source: "test" }),
    ]);
});

afterAll(async () => {
    await dataSource.destroy();
});

describe("ProductCarbonFootprintService", () => {
    let service: ProductCarbonFootprintService;
    let carbonEmissionFactorRepository: Repository<CarbonEmissionFactor>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductCarbonFootprintService,
                {
                    provide: getRepositoryToken(ProductCarbonFootprint),
                    useValue: {}, // Replace with necessary mock logic if needed
                },
                {
                    provide: getRepositoryToken(CarbonEmissionFactor),
                    useValue: {
                        findOne: jest.fn().mockImplementation(({ name, unit }) => {
                            const factors = [
                                { name: "ham", unit: "kg", emissionCO2eInKgPerUnit: 3.5, source: "test" },
                                { name: "cheese", unit: "kg", emissionCO2eInKgPerUnit: 2.1, source: "test" },
                                { name: "tomato", unit: "kg", emissionCO2eInKgPerUnit: 0.4, source: "test" },
                                { name: "flour", unit: "kg", emissionCO2eInKgPerUnit: 1.1, source: "test" },
                                { name: "oliveOil", unit: "kg", emissionCO2eInKgPerUnit: 2.5, source: "test" }
                            ];
                            return Promise.resolve(factors.find(factor => factor.name === name && factor.unit === unit));
                        })
                    },
                },
            ],
        }).compile();

        service = module.get<ProductCarbonFootprintService>(ProductCarbonFootprintService);
        carbonEmissionFactorRepository = module.get<Repository<CarbonEmissionFactor>>(getRepositoryToken(CarbonEmissionFactor));
    });

    describe('calculateCarbonFootprint', () => {
        it('should calculate the total carbon footprint for given ingredients', async () => {
            const totalFootprint = await service.calculateCarbonFootprint(hamCheesePizza.ingredients);
            expect(totalFootprint).toEqual(HAM_CHEESE_PIZZA_EMISSION);
        });

        it('should return null if an emission factor is missing', async () => {
            const totalFootprint = await service.calculateCarbonFootprint(hamCheesePizzaAlt.ingredients);
            expect(totalFootprint).toBeNull();
        });
    });
});
