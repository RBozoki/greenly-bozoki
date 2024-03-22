import { GreenlyDataSource, dataSource } from "../../config/dataSource";
import { ProductCarbonFootprint } from "./productCarbonFootprint.entity";

let sampleProductCarbonFootprint: ProductCarbonFootprint;

beforeAll(async () => {
    await dataSource.initialize();
    sampleProductCarbonFootprint = new ProductCarbonFootprint({
        name: "Burger",
        emissionCO2eInKg: 1.5,
    });
});

beforeEach(async () => {
    await GreenlyDataSource.cleanDatabase();
});

describe("ProductCarbonFootprintEntity", () => {
    describe("constructor", () => {
        it("should create a product carbon footprint instance", () => {
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

afterAll(async () => {
    await dataSource.destroy();
});
