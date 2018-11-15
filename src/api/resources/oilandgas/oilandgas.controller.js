var Xray = require('x-ray');
var x = Xray({
  filters: {
    fix2: function(value) {
      if (typeof value === 'string') {
        let refine = value.split('p.p1');
        let refine2 = refine[0].split('\r\n\t\t');
        return refine2[1];
      }
    },
    fix: function(value) {
      if (typeof value === 'string') {
        let refine = value.split('\t\r\n\t\t\t\t');
        let refine2 = refine[1].split('\t');
        let refine3 = refine2[1].split('\r');
        return refine3[0];
      }
    }
  }
});

export default {
  async findAll(req, res) {
    try {
      const news = await x('https://www.oilandgaspeople.com/news/', {
        title: 'title',
        items: x('ul#newslistings li', [
          {
            heading: 'a h3 | fix',
            link: 'a@href',
            body: 'a p:not(.smallText)'
          }
        ])
      })
        .limit(15)
        .then(obj => Array.from(obj.items))
        .catch(err => console.log(err));

      return res.json(news);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  },
  async findOne(req, res) {
    try {
      const { url } = req.query;
      const singleNews = await x(url, {
        title: '#newspostcontainer h1',
        imgSrc: '#newspostcontainer img@src',
        body: '#newspostcontainer .item-content | fix2'
      })
        .then(data => data)
        .catch(err => console.log(err));

      return res.json(singleNews);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  }
};
