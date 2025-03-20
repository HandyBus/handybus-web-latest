import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    table: ({ children }) => (
      <div className="my-8 overflow-x-auto">
        <table className="min-w-full border-collapse border-spacing-0">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-basic-grey-300 bg-basic-grey-100 whitespace-nowrap border px-4 py-[2px] text-left font-400">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="py-2 border-basic-grey-300 border px-4">{children}</td>
    ),
    p: ({ children }) => (
      <div className="text-basic-grey-700 text-16 font-400">{children}</div>
    ),
    ...components,
  };
}
