import Oilandgas from './oilandgas.model';

export default {
  async findAll(req, res) {
    try {
      const news = await Oilandgas.find()
        .limit(15)
        .select({ heading: 1, intro: 1 });

      return res.json(news);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  },
  async findOne(req, res) {
    try {
      const { id } = req.params;
      const singleNews = await Oilandgas.findById(id).select({
        heading: 1,
        content: 1
      });
      return res.json(singleNews);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  }
};
