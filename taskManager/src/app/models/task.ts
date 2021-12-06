import { PersonShort } from "./person-short";

export class Task {
    id:number;
    description:string;
    deadline:Date;
    title:string;
    status:string;
    statusId:number
    users:Array<PersonShort>
}
