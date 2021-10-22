import SimpleSchema from 'simpl-schema';

export const defaultSchema = new SimpleSchema({
  _id: { type: String, optional: true },
  _groupId: { type: String, optional: true },
  createdAt: { type: Date, optional: true },
  updatedAt: { type: Date, optional: true },
});