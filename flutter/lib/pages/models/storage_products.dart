import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class StorageProducts {
  final String slug;
  final String selectedSize;
  final String name;
  final double price;
  int qts;

  StorageProducts({
    required this.slug,
    required this.selectedSize,
    required this.name,
    required this.price,
    required this.qts,
  });

  // Convert Product object to JSON
  Map<String, dynamic> toJson() {
    return {
      'slug': slug,
      'selectedSize': selectedSize,
      'name': name,
      'price': price,
      'qts': qts,
    };
  }

  // Create Product object from JSON
  factory StorageProducts.fromJson(Map<String, dynamic> json) {
    return StorageProducts(
      slug: json['slug'],
      selectedSize: json['selectedSize'],
      name: json['name'],
      price: json['price'],
      qts: json['qts'],
    );
  }
}

Future<void> addProductToStorage(
    String slug, String selectedSize, String name, price, int qts) async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();

  List<String>? productsJson = prefs.getStringList('products') ?? [];

  StorageProducts newProduct = StorageProducts(
      slug: slug, selectedSize: selectedSize, name: name, price: price, qts : qts);

  productsJson.add(json.encode(newProduct.toJson()));

  await prefs.setStringList('products', productsJson);
}


Future<void> deleteProductFromStorage(String slug, String selectedSize) async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();

  List<String>? productsJson = prefs.getStringList('products') ?? [];

  List<StorageProducts> products = productsJson.map((jsonString) {
    Map<String, dynamic> jsonMap = json.decode(jsonString);
    return StorageProducts.fromJson(jsonMap);
  }).toList();

  products.removeWhere((product) =>
      product.slug == slug && product.selectedSize == selectedSize);

  List<String> updatedProductsJson =
      products.map((product) => json.encode(product.toJson())).toList();

  await prefs.setStringList('products', updatedProductsJson);
}


Future<List<StorageProducts>> getProductsFromStorage() async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();

  List<String>? productsJson = prefs.getStringList('products') ?? [];

  List<StorageProducts> products = productsJson.map((jsonString) {
    Map<String, dynamic> jsonMap = json.decode(jsonString);
    return StorageProducts.fromJson(jsonMap);
  }).toList();

  return products;
}

Future<void> updateProductQuantityInStorage(
    String slug, String selectedSize, int newQts) async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();

  List<String>? productsJson = prefs.getStringList('products') ?? [];

  List<StorageProducts> products = productsJson.map((jsonString) {
    Map<String, dynamic> jsonMap = json.decode(jsonString);
    return StorageProducts.fromJson(jsonMap);
  }).toList();

  for (var product in products) {
    if (product.slug == slug && product.selectedSize == selectedSize) {
      product.qts = newQts;
      break;
    }
  }

  List<String> updatedProductsJson =
      products.map((product) => json.encode(product.toJson())).toList();

  await prefs.setStringList('products', updatedProductsJson);
}



Future<void> clearProductsFromStorage() async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();

  // Remove the entire list of products from SharedPreferences
  await prefs.remove('products');
}
