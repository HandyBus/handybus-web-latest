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
      <th className="border-gray-300 bg-gray-100 py-2 font-semibold border px-4 text-left">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-gray-300 py-2 border px-4">{children}</td>
    ),
    ...components,
  };
}
