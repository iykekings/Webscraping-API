module.exports = function timestamp(schema) {
  schema.add({
    createdAt: Date,
    updatedAt: Date
  });

  schema.pre('save', function() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  });
  schema.pre('update', async function() {
    await this.update({}, { $set: { updatedAt: new Date() } });
  });
};
