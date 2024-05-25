class Product {
  final String slug;
  final String name;
  final String description;
  final double price;
  final List sizes;

  Product({
    required this.slug,
    required this.name,
    required this.description,
    required this.price,
    required this.sizes,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      slug: json['slug']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      description: json['description']?.toString() ?? '',
      price: json['price'] is int
          ? (json['price'] as int).toDouble()
          : json['price'] is double
              ? json['price'] as double
              : double.tryParse(json['price']?.toString() ?? '0') ?? 0.0,
      sizes: json['sizes'] as List<dynamic>,
    );
  }
}
