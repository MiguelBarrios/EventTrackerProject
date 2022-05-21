export class Exerciseset {
  id: number;
  exerciseName: string;
  weight: number;
  reps: number;
  type: string;
  datetime: string
  constructor(id: number = 0, exerciseName: string = '', weight: number = 0, reps: number = 0, type: string='', datetime: string=""){
    this.id = id;
    this.exerciseName = exerciseName;
    this.weight = weight;
    this.reps = reps;
    this.type = type;
    this.datetime = datetime;
  }
}
