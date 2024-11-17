import { Types } from "mongoose";


export interface Reviews {
  id: string;
  title: string;
  content: string;
  image: string;
  rating: number | null;
  userId: string;
  _id?: Types.ObjectId;
}