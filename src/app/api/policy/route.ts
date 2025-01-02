import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import fs from 'fs/promises';
import remarkGfm from 'remark-gfm';
import { NextRequest, NextResponse } from 'next/server';

const PROCESS_ROOT = process.cwd();
const POLICIES_PATH = path.resolve(PROCESS_ROOT, './src/data/policy');

export type PolicyNameType =
  | '서비스이용약관'
  | '개인정보처리방침'
  | '마케팅활용동의';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const policyName = searchParams.get('policy') as PolicyNameType;

  if (!policyName) {
    return NextResponse.json({
      statusCode: 400,
      message: '정책 이름이 필요합니다.',
    });
  }

  try {
    const fullPath = path.resolve(POLICIES_PATH, `${policyName}.mdx`);
    const source = await fs.readFile(fullPath, 'utf-8');
    const mdxSource = await serialize(source, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
      },
    });

    return NextResponse.json(mdxSource);
  } catch {
    return NextResponse.json({
      statusCode: 400,
      message: '정책을 불러오는데 실패했습니다.',
    });
  }
}
