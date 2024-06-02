import React from "react";
import { getProducts } from "@/services/product";
import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/product/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { skipToken, useQuery } from "@tanstack/react-query";
import { getBrand, getBrands } from "@/services/brand";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/")({
  loader: getProducts,
  component: Products,
});

function Products() {
  const products = Route.useLoaderData();
  const [brand, setBrand] = React.useState<string>();

  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const [search, setSearch] = React.useState("");
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  React.useEffect(() => {
    if (!products) return;
    const filtered = products.filter((product) => {
      const { name, slug, brand, category } = product;
      const searchTerm = search.toLowerCase();

      return (
        name.toLowerCase().includes(searchTerm) ||
        slug.toLowerCase().includes(searchTerm) ||
        brand.toLowerCase().includes(searchTerm) ||
        category.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredProducts(filtered);
  }, [search, products]);
  const searchedProducts = !products ? [] : "";

  const { data, isFetching, isLoading, error } = useQuery({
    queryKey: ["brand", brand],
    queryFn: brand ? async () => getBrand(brand) : skipToken,
  });

  return (
    <>
      <Container className="space-y-5 sm:space-y-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant={!brand ? "outline" : "ghost"} onClick={() => setBrand("")} size="sm">
              Tous les produits
            </Button>

            {brands &&
              brands.map(({ id, name }) => (
                <Button key={id} variant={id === brand ? "outline" : "ghost"} size="sm" onClick={() => setBrand(id)}>
                  {name}
                </Button>
              ))}
          </div>
          <div>
            <div className="relative">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un produit"
                className="pl-10"
              />
              <Search className="w-4 h-4 text-gray-500 absolute top-1/2 -translate-y-1/2 left-4" />
            </div>
          </div>
        </div>

        {data && (
          <div className="flex items-center justify-start flex-wrap gap-4">
            {data.products.map((product) => (
              <Card key={product.slug} {...product} />
            ))}
          </div>
        )}

        {!brand && !search ? (
          <div className="flex items-center justify-start flex-wrap gap-4">
            {products.map((product) => (
              <Card key={product.slug} {...product} />
            ))}
          </div>
        ) : (
          search && (
            <div>
              {filteredProducts.map((product) => (
                <Card key={product.slug} {...product} />
              ))}
            </div>
          )
        )}
      </Container>
    </>
  );
}
