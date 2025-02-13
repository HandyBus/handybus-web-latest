export default function WithFooterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex h-full flex-grow flex-col">{children}</div>;
}
