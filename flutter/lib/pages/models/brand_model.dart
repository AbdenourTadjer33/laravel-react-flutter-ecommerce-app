class Brand {
  final String name;
  final String logo;
  final int id;

  Brand({
    required this.name,
    required this.logo,
    required this.id,
  });

  factory Brand.fromJson(Map<String, dynamic> json) {
    return Brand(
      name: json['name']?.toString() ?? '',
      logo: json['logo']?.toString() ?? '',
      id: json['id'] ?? '',
    );
  }
}
