const axios = require('axios'),
  log4js = require("log4js"),
  cron = require('node-cron');

CronController = {
  LechatauHit: (req, res) => {
    log4js.configure({
      appenders: { hit_log: { type: "file", filename: "hit_log.log" } },
      categories: { default: { appenders: ["hit_log"], level: "error" } }
    });
    const logger = log4js.getLogger("hit_log");

    const task = cron.schedule('*/59 * * * *', function () {
      console.log('starting hit')
      HitSite()
    });


    async function HitSite() {
      try {
        let hit_home = await axios.get('http://www.lechateauliving.com');
        let hit_brands = await axios.get('http://www.lechateauliving.com/brands/');
        let hit_project = await axios.get('http://www.lechateauliving.com/project/');
        let hit_blog = await axios.get('http://www.lechateauliving.com/blog/news/');
        let hit_download = await axios.get('http://www.lechateauliving.com/project/');
        let hit_sale = await axios.get('http://www.lechateauliving.com/sale/');

        if (hit_home) {
          logger.info("Hit home success");

          console.log('hit home successed');
        }
        if (hit_sale) {
          logger.info("Hit sale success");

          console.log('hit sale successed');
        }
        if (hit_download) {
          logger.info("Hit download success");

          console.log('hit download successed');
        }
        if (hit_blog) {
          logger.info("Hit blog success");

          console.log('hit blog successed');
        }
        if (hit_brands) {
          logger.info("Hit brands success");

          console.log('hit brand successed');
        }
        if (hit_project) {
          logger.info("Hit projects success");

          console.log('hit project successed');
        }
      } catch (error) {
        console.log(error)
        console.error(`error when hit ${error.config.url} | error : ${error}`);
        logger.error(`error when hit ${error.config.url} | error : ${error}`);

        // task.stop()
      }
    }
    task.start()
  }
}


module.exports = CronController