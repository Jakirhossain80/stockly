// app/dashboard/add-product/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AddProduct from "../../../components/AddProduct";

export const metadata = { title: "Add Product — Stockly" };

export default async function AddProductPage() {
  // Protect this page: only authenticated users can access
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?callbackUrl=${encodeURIComponent("/dashboard/add-product")}`);
  }

  // Authenticated → render the existing component without any UI/logic changes
  return <AddProduct />;
}
