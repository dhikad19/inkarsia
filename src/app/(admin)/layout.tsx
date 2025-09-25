import Wrapper from "@/components/Admin/Wrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Wrapper>{children}</Wrapper>;
}
