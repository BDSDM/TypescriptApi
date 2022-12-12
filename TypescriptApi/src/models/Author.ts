import mongoose, {Document, Schema} from 'mongoose';
export interface IAuthor{
   author: string;
}
export interface IAuthorModel extends IAuthor, Document{}

const AuthorSchema: Schema = new Schema(
    {
        author: {type: String, required:true}
    },
    {
        versionKey: false
    }
);
export default mongoose.model<IAuthorModel>('Author',AuthorSchema);