class Product {
  final String slug;
  final String name;
  final String description;
  final double price;
  final List sizes;
  final List images;

  Product({
    required this.slug,
    required this.name,
    required this.description,
    required this.price,
    required this.sizes,
    required this.images,
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
      images: _transformImageUrls(
          List<String>.from(json['images'] as List<dynamic>)),
    );
  }

  static List<String> _transformImageUrls(List<String> urls) {
    return urls.map((url) => url.replaceAll('localhost', '10.0.2.2')).toList();
  }
}
