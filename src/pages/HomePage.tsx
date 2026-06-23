import { useOutletContext } from "react-router-dom";
import ProductList from "@/components/product/ProductList";

export default function HomePage() {
  const { search } = useOutletContext<{ search: string }>();
  return <ProductList search={search} />;
}
