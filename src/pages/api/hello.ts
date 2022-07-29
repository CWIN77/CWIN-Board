import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import cheerio from "cheerio";

type Data = {
  data: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // await axios.get("https://news.daum.net/breakingnews?page=1").then((html: any) => {
  //   const $ = cheerio.load(html.data);
  //   const newsList = $('.list_allnews').children();
  //   const news: { [key: string]: string }[] = [];
  //   newsList.each((i, elem) => {
  //     const title = $(elem).find('strong.tit_thumb a').text();
  //     const subTitle = $(elem).find('span.link_txt').text().trim();
  //     news.push({
  //       title,
  //       subTitle
  //     });
  //   })
  //   console.log(news);
  // });

  await axios.get("https://www.yna.co.kr/news/1").then((html: any) => {
    const $ = cheerio.load(html.data);
    const newsList = $('.list_allnews').children();
    const news: { [key: string]: string }[] = [];
    newsList.each((i, elem) => {
      const title = $(elem).find('strong.tit_thumb a').text();
      const subTitle = $(elem).find('span.link_txt').text().trim();
      news.push({
        title,
        subTitle
      });
    });
  });

  res.status(200).json({ data: 'Hello Api' });
}

