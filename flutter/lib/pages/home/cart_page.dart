// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:shamo/pages/widgets/Cart_form.dart';
import 'package:shamo/pages/widgets/cart_card.dart';
import 'package:shamo/theme.dart';
import '../models/storage_products.dart';

class CartPage extends StatefulWidget {
  // final List<StorageProducts> _products;

  const CartPage({super.key});

  @override
  _CartPageState createState() => _CartPageState();
}

class _CartPageState extends State<CartPage> {
  late List<StorageProducts> _products = [];
  double totalPrice = 0.0;
  @override
  void initState() {
    super.initState();
    fetchProductData();
  }

  Future<void> fetchProductData() async {
    List<StorageProducts> data = await getProductsFromStorage();
    setState(() {
      _products = data;
      totalPrice = calculateTotalPrice();
    });
  }

  double calculateTotalPrice() {
    double totalPrice = 0.0;
    for (var product in _products) {
      totalPrice += product.price * product.qts;
    }
    return totalPrice;
  }

  void onUpdatePrice(double updatedPrice, String operator) {
    setState(() {
      if (operator == '-') {
        totalPrice -= updatedPrice;
      } else {
        totalPrice += updatedPrice;
      }
    });
  }

  Future<void> handleDeleteProduct(String slug, String selectedSize) async {
    await deleteProductFromStorage(slug, selectedSize);
    setState(() {
      _products.removeWhere((product) =>
          product.slug == slug && product.selectedSize == selectedSize);
    });
    await fetchProductData();
  }

  Future<void> showSuccessDialog(BuildContext context) async {
    final formKey = GlobalKey<FormState>();
    final TextEditingController nameController = TextEditingController();
    final TextEditingController emailController = TextEditingController();
    final TextEditingController phoneController = TextEditingController();
    final TextEditingController addressController = TextEditingController();

    return showDialog(
      context: context,
      builder: (BuildContext context) {
        return InformationDialog(
          formKey: formKey,
          nameController: nameController,
          emailController: emailController,
          phoneController: phoneController,
          addressController: addressController,
        );
      },
    );
  }

  PreferredSizeWidget header() {
    return AppBar(
      backgroundColor: backgroundColor1,
      centerTitle: true,
      title: Text('Votre panier', style: primaryTextStyle),
      elevation: 0,
    );
  }

  Widget emptyCart(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.asset('assets/icon_empty_cart.png', width: 80),
          SizedBox(height: 20),
          Text(
            'Oops! Votre panier est vide',
            style: primaryTextStyle.copyWith(fontSize: 16, fontWeight: medium),
          ),
          SizedBox(height: 12),
          Text('Trouvons vos chaussures préférées', style: secondaryTextStyle),
          Container(
            width: 200,
            height: 44,
            margin: EdgeInsets.only(top: 20),
            child: TextButton(
              onPressed: () {
                Navigator.pushNamedAndRemoveUntil(
                    context, '/home', (route) => false);
              },
              style: TextButton.styleFrom(
                backgroundColor: primaryColor,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: Text(
                'Explorer la boutique',
                style:
                    whiteTextStyle.copyWith(fontSize: 16, fontWeight: medium),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget content() {
    return ListView.builder(
      itemCount: _products.length,
      itemBuilder: (context, index) {
        return Column(
          children: [
            SizedBox(height: 18), // Add your desired height here
            Dismissible(
              key: Key(_products[index].slug + _products[index].selectedSize),
              onDismissed: (direction) {
                handleDeleteProduct(
                    _products[index].slug, _products[index].selectedSize);
              },
              background: Container(color: Colors.red),
              child: CartCard(
                product: _products[index],
                onUpdatePrice: onUpdatePrice, // Pass onUpdatePrice function
              ),
            ),
          ],
        );
      },
    );
  }

  Widget customButtonNav(BuildContext context) {
    return SizedBox(
      height: 190,
      child: Column(
        children: [
          SizedBox(height: 30),
          Container(
            margin: EdgeInsets.symmetric(horizontal: defaultMargin),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Total', style: primaryTextStyle),
                Text(
                  '${totalPrice.toStringAsFixed(2)} DA',
                  style: priceTextStyle.copyWith(
                    fontSize: 16,
                    fontWeight: bold,
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 30),
          Divider(thickness: 0.3, color: subtitleColor),
          SizedBox(height: 30),
          Container(
            margin: EdgeInsets.symmetric(horizontal: defaultMargin),
            height: 50,
            child: TextButton(
              onPressed: () {
                showSuccessDialog(context);
              },
              style: TextButton.styleFrom(
                backgroundColor: primaryColor,
                padding: EdgeInsets.symmetric(horizontal: 20),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Confirmer votre comande',
                    style: whiteTextStyle.copyWith(
                        fontSize: 16, fontWeight: semiBold),
                  ),
                  Icon(Icons.arrow_forward, color: backgroundColor1)
                ],
              ),
            ),
          )
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backgroundColor3,
      appBar: header(),
      body: _products.isEmpty ? emptyCart(context) : content(),
      bottomNavigationBar:
          _products.isEmpty ? SizedBox() : customButtonNav(context),
    );
  }
}
