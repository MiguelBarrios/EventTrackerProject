export class Exerciseset {
  id: number;
  exerciseName: string;
  weight: number | null;
  reps: number | null
  type: string;
  datetime: string | null;
  constructor(id: number = 0, exerciseName: string = '', weight: number | null = null, reps: number  | null = null, type: string='', datetime: string | null=""){
    this.id = id;
    this.exerciseName = exerciseName;
    this.weight = weight;
    this.reps = reps;
    this.type = type;
    this.datetime = datetime;
  }
}
