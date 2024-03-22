import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("product_carbon_footprint")
export class ProductCarbonFootprint extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        type: "float",
        nullable: false,
    })
    emissionCO2eInKg: number;

    sanitize() {
        if (this.name === "") {
            throw new Error("Name cannot be empty");
        }
        if (this.emissionCO2eInKg < 0) {
            throw new Error("Emission cannot be negative")
        }
    }

    constructor(props: {
        name: string;
        emissionCO2eInKg: number;
    }) {
        super();

        this.name = props?.name;
        this.emissionCO2eInKg = props?.emissionCO2eInKg;
        this.sanitize();
    }
}
