import { Person } from "./Person";
import { Pet } from "./Pet";

export class Adoption{

    public adoptionId!: Number;
    public date!: Date;
    public vetReport!: String;
    public petId!: Pet;
    public personId!: Person;
    public status!: Number;
}