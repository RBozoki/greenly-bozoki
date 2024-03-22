export class CreateProductCarbonFootprintDto {
    name: string
    ingredients: {
        name: string;
        quantity: number;
        unit: string
    }[]
}
