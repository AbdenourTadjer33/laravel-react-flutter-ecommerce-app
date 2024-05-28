import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Input, InputError } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { useForm } from "laravel-precognition-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import states from "@/data/states.json";
import { getCart } from "@/services/product";
import { CartContext } from "@/contexts/cartContext";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { currencyFormat } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/order/create")({
  component: Create,
});

function Create() {
  const { items, addItems } = React.useContext(CartContext);
  const navigate = useNavigate({ from: "/" });
  const { data, setData, submit, errors } = useForm("post", route("api.order.store"), {
    name: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    address: "",
  });

  const { data: products, isLoading } = useQuery({ queryKey: ["cart", items], queryFn: async () => getCart(items) });

  React.useEffect(() => {
    if (isLoading) {
      return;
    } else if (!products || !products.length) {
      navigate({ to: "/" });
    }

    const newCartItems = products.map((product) => {
      return {
        slug: product.slug,
        qte: product.qte,
        size: product.size,
      };
    });

    addItems(newCartItems);
  }, [products]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <Container className="space-y-5 sm:space-y-10">
      <Heading className="font-medium" level={2}>
        Finaliser ma commande
      </Heading>

      <div className="flex flex-col-reverse md:flex-row-reverse items-start gap-4">
        <div className="md:sticky md:top-28 w-full md:max-w-xl border border-gray-200 shadow-lg rounded">
          <div className="divide-y">
            {isLoading ? (
              <div className="p-3 space-y-2">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-16 h-16 rounded-md" />
                  <Skeleton className="w-full h-12" />
                </div>
              </div>
            ) : (
              products && products.length && products.map((product, idx) => <SummaryItem key={idx} product={product} />)
            )}
          </div>
          {isLoading ? (
            <div className="px-4 py-6 sm:px-6 border-t">
              <div className="space-y-2">
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-8" />
              </div>
            </div>
          ) : (
            products && products.length && <Summary products={products} />
          )}
        </div>

        <div className="w-full">
          <form
            className="shadow-lg rounded-xl py-6 px-4 space-y-6 bg-white border border-gray-200"
            onSubmit={submitHandler}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Heading level={6} className="font-medium">
                  Coordonnées
                </Heading>
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label>Nom prénom</Label>
                <Input
                  value={data.name}
                  onChange={(e) => {
                    setData("name", e.target.value);
                  }}
                />
                <InputError message={errors.name} />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label>N° tél</Label>
                <Input
                  value={data.phone}
                  onChange={(e) => {
                    setData("phone", e.target.value);
                  }}
                />
                <InputError message={errors.phone} />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label>Adresse e-mail</Label>
                <Input
                  type="email"
                  value={data.email}
                  onChange={(e) => {
                    setData("email", e.target.value);
                  }}
                />
                <InputError message={errors.email} />
              </div>
              <hr className="sm:col-span-2" />
              <div className="sm:col-span-2">
                <Heading level={6} className="font-medium">
                  Informations sur la livraison
                </Heading>
              </div>
              <div className="space-y-2">
                <Label>Ville</Label>
                <Input
                  value={data.city}
                  onChange={(e) => {
                    setData("city", e.target.value);
                  }}
                />
                <InputError message={errors.city} />
              </div>
              <div className="space-y-2">
                <Label>Wilaya</Label>
                <Select value={data.state} onValueChange={(value) => setData("state", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Séléctionnez votre wilaya" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.code} value={state.name}>
                        {state.code}- {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <InputError message={errors.state} />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label>Adresse</Label>
                <Input
                  onChange={(e) => {
                    setData("address", e.target.value);
                  }}
                />
                <InputError message={errors.address} />
              </div>
            </div>
            <Button variant="secondary" className="w-full">
              Commander
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}

const SummaryItem = ({ product }) => {
  return (
    <div className="relative transition duration-200 hover:bg-gray-100 p-3 flex w-full">
      <div className="h-20 sm:h-24 object-contain overflow-hidden rounded ">
        <img src={product?.images?.[0]} className="w-20 object-cover" />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="space-y-3">
          <div className="flex justify-between items-center text-base font-medium text-gray-900">
            <Link>
              <h3 className="text-base font-medium pe-5">{product.name}</h3>
            </Link>
          </div>
          <hr />
          <div className="mt-1 relative flex items-center justify-between">
            <p className="text-sm text-gray-500 font-medium">
              x{product.qte} {currencyFormat(product.price)}
            </p>
            <div className="text-sm sm:text-lg">
              <span className="font-medium">{currencyFormat(Number(product.price) * product.qte)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Summary = ({ products }) => {
  const total = React.useMemo(() => {
    let helper = 0;
    products.forEach(({ total }) => {
      helper += total;
    });
    return helper;
  }, [products]);

  return (
    <div className="px-4 py-6 sm:px-6 border-t">
      <div className="space-y-2">
        <div className="flex justify-between text-base text-gray-900">
          <p className="text-gray-600 font-medium">Livraison</p>
          <p className="font-semibold">Gratuite</p>
        </div>
        <div className="flex justify-between text-base text-gray-900">
          <p className="text-gray-600 font-medium">Total</p>
          <p className="font-semibold">{currencyFormat(total)}</p>
        </div>
      </div>
    </div>
  );
};
