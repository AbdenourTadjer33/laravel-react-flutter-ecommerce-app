import 'package:flutter/material.dart';
import 'package:shamo/pages/home/cart_page.dart';
import 'package:shamo/pages/other_pages/checkout_page.dart';
import 'package:shamo/pages/other_pages/checkout_success_page.dart';
import 'package:shamo/pages/home/main_page.dart';
import 'package:shamo/pages/other_pages/product_page.dart';
// import 'package:shamo/pages/other_pages/splash_page.dart';
import 'package:shamo/pages/models/product_model.dart'; // Ensure this import matches your project structure

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      onGenerateRoute: (settings) {
        if (settings.name == '/product') {
          final product = settings.arguments as Product;
          return MaterialPageRoute(
            builder: (context) => ProductPage(product: product),
          );
        }

        switch (settings.name) {
          case '/':
            return MaterialPageRoute(builder: (context) => const MainPage());
          case '/home':
            return MaterialPageRoute(builder: (context) => const MainPage());
          case '/cart':
            return MaterialPageRoute(builder: (context) => const CartPage());
          case '/checkout':
            return MaterialPageRoute(
                builder: (context) => const CheckoutPage());
          case '/checkout-success':
            return MaterialPageRoute(
                builder: (context) => const CheckoutSuccessPage());
          default:
            return null;
        }
      },
    );
  }
}
