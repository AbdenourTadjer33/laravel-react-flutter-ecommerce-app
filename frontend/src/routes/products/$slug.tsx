import React from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/components/ui/use-toast";
import { CartContext } from "@/contexts/cartContext";
import { currencyFormat } from "@/lib/utils";
import { getProduct } from "@/services/product";
import { createFileRoute } from "@tanstack/react-router";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ params }) => await getProduct(params.slug),
  component: Product,
});

function Product() {
  const { add } = React.useContext(CartContext);
  const [size, setSize] = React.useState("");
  const { name, slug, description, images, price, brand, sizes } = Route.useLoaderData();
  const { toast } = useToast();

  const addToCart = () => {
    if (!size) {
      toast({ description: "Vous devez choisir une pointeur, puis ajouter le produit au panier" });
      return;
    }
    add({ slug, size, qte: 1 });
  };

  return (
    <Container>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
            playOnInit: true,
            stopOnFocusIn: true,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {images.map((image, idx) => (
            <CarouselItem key={idx} className="mx-auto md:basis-1/2 lg:basis-1/3 pl-2 md:pl-4">
              <img src={image} className="h-56 rounded-lg md:h-96 mx-auto" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 space-y-4">
          <h6 className="text-sm text-gray-500">{brand}</h6>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{name}</h1>
        </div>

        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl tracking-tight text-gray-900">{currencyFormat(price)}</p>

          <div className="mt-10">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Size guide
                </a>
              </div>

              <fieldset aria-label="Choose a size" className="mt-4">
                <ToggleGroup
                  variant="outline"
                  type="single"
                  value={size}
                  onValueChange={setSize}
                  className="justify-start flex-wrap"
                >
                  {sizes.map((size) => (
                    <ToggleGroupItem key={size} value={size}>
                      {size}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </fieldset>
            </div>

            <Button className="mt-10 w-full" size="lg" variant="secondary" onClick={addToCart}>
              Ajouter au panier
            </Button>
          </div>
        </div>

        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          <div>
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6">
              <p className="text-base text-gray-900">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
