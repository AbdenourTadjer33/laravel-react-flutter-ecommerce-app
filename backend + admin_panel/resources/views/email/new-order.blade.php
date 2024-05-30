<x-mail::message>
# Merci d'avoir fait du shopping avec nous!

Bonjour {{ $client->name }},

Merci pour votre commande sur notre site ! Nous avons bien reçu votre commande n°{{ $order->ref }} passée le {{ $order->created_at->format('d-m-Y') }}.

<x-mail::table>
| Produit            | Quantité          | Taille        | Total         |
|:-------------------|:-----------------:|:-------------:|--------------:|
@foreach ($order->products as $product)
| {{ $product->name }} | {{ $product->pivot->qte }} pcs | {{ $product->pivot->size }} | {{ $product->pivot->total }} DZD |
@endforeach
|                    |                   | **Total**     | **{{ $order->total }} DZD** |
</x-mail::table>

<x-mail::panel>
Votre commande est en cours de traitement et nous vous tiendrons informé dès qu'elle sera expédiée. 
</x-mail::panel>

Pour toute question ou assistance, n'hésitez pas à contacter notre service client à {{ config('mail.from.address') }} ou par téléphone au 0000000000.

Nous vous remercions pour votre confiance et espérons que vous apprécierez votre achat.

Cordialement,<br>
{{ config('app.name') }}
</x-mail::message>
