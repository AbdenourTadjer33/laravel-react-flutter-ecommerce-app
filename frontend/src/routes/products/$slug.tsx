import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { currencyFormat } from "@/lib/utils";
import { getProduct } from "@/services/product";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ params }) => await getProduct(params.slug),
  component: Product,
});

function Product() {
  const product = Route.useLoaderData();
  const { name, slug, description, images, price, brand } = product;

  console.log(product);

  function visualize(event: MouseEvent<HTMLImageElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Container>
        <div className="mx-auto max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={product.images[0]}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images[1]}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images[2]}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={product.images[3]}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </Container>
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </>
  );
}

{
  /* <section>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-row gap-4 justify-start">
              <div className="flex flex-col items-center justify-start gap-4 overflow-y-auto">
                {Array.isArray(images) &&
                  images.map((img, idx) => (
                    <img key={idx} src={img} className="h-16 cursor-pointer" onClick={visualize} />
                  ))}
              </div>

              <div className="relative h-[30vh] w-[30vh]">
                <img
                  //   ref={mainImgRef}
                  src={images?.[0] ?? "default.png"}
                  className="h-full w-full object-contain object-center"
                />
              </div>
            </div>
            <div className="space-y-3 md:mt-4 md:ms-2 flex justify-between ">
              <div>
                <h6 className="text-sm text-gray-500">{brand}</h6>
                <h2 className="text-xl font-medium text-info-950">{name}</h2>

                <div className="relative">
                  <h4 className="text-2xl font-medium">{currencyFormat(price)}</h4>
                </div>
              </div>

              <div className="flex gap-2 items-center justify-start">
                <Button className="flex items-center gap-3">Ajouté au panier</Button>
              </div>
            </div>
          </div>

          {description && (
            <div className="mt-10 text-start text-pretty prose prose-headings:my-2 prose-a:text-blue-700 prose-a:underline">
              {description}
            </div>
          )}
        </section> */
}
