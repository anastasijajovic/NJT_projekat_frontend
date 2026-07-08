import { Type } from "./Type";
import { PetImage } from "./PetImage";

export class Pet{

  public id!: number;
  public name!: string;
  public age!: number;
  public type!: Type;
  public description!: string;
  public gender!: string;
  public status!: number;
  public image!: string;

  public images!: PetImage[];

}
