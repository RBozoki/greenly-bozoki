import { GreenlyDataSource, dataSource } from "../../config/dataSource";
import { ProductCarbonFootprint } from "./productCarbonFootprint.entity";

beforeAll(async () => {
    await dataSource.initialize();
});

beforeEach(async () => {
    await dataSource.getRepository(ProductCarbonFootprint).delete({});
});
afterAll(async () => {
    await dataSource.destroy();
});

describe("ProductCarbonFootprintEntity", () => {
    describe("constructor", () => {
        it("should create a product carbon footprint instance", () => {
            const sampleProductCarbonFootprint = new ProductCarbonFootprint({
                name: "Burger",
                emissionCO2eInKg: 1.5,
            });
            expect(sampleProductCarbonFootprint.name).toBe("Burger");
            expect(sampleProductCarbonFootprint.emissionCO2eInKg).toBe(1.5);
        });

        it("should throw an error if the name is empty", () => {
            expect(() => {
                new ProductCarbonFootprint({
                    name: "",
                    emissionCO2eInKg: 1.5,
                });
            }).toThrow();
        });

        it("should throw an error if the emissionCO2eInKg is negative", () => {
            expect(() => {
                new ProductCarbonFootprint({
                    name: "Burger",
                    emissionCO2eInKg: -1.5,
                });
            }).toThrow();
        });
    });
});
