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
      <th className="whitespace-nowrap border border-grey-300 bg-grey-100 px-4 py-[2px] text-left font-400">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="py-2 border border-grey-300 px-4">{children}</td>
    ),
    p: ({ children }) => (
      <div className="text-16 font-400 text-grey-700">{children}</div>
    ),
    ...components,
  };
}
