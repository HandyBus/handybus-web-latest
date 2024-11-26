import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { all } = req.query;
  console.log('API Route caught:', all);

  // 여기서 요청을 처리하거나 외부로 전달 가능
  res.status(200).json({ message: `Caught request for: ${all}` });
};

export default handler;
