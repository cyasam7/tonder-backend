import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User, UserDocument } from 'src/auth/schema/user.schema';

export type MatchDocument = Match & Document;

@Schema({ versionKey: false, timestamps: true })
export class Match {
  @Prop({ type: [Types.ObjectId], ref: User.name })
  users: [UserDocument, UserDocument];
}

export const MatchSchema = SchemaFactory.createForClass(Match);
