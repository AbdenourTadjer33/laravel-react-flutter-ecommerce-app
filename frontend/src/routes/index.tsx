import React from "react";
import { getProducts } from "@/services/product";
import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/product/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { skipToken, useQuery } from "@tanstack/react-query";
import { getBrand, getBrands } from "@/services/brand";

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

  const { data, isFetching, isLoading, error } = useQuery({
    queryKey: ["brand", brand],
    queryFn: brand ? async () => getBrand(brand) : skipToken,
  });

  return (
    <>
      <Container className="space-y-5 sm:space-y-10">
        <Heading level={3} className="font-medium">
          Nos produits
        </Heading>

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

        {data && (
          <div className="flex items-center justify-start flex-wrap gap-4">
            {data.products.map((product) => (
              <Card key={product.slug} {...product} />
            ))}
          </div>
        )}

        {!brand && (
          <div className="flex items-center justify-start flex-wrap gap-4">
            {products.map((product) => (
              <Card key={product.slug} {...product} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
