// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:shamo/pages/widgets/checkout_card.dart';
import 'package:shamo/theme.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/storage_products.dart';

class CheckoutPage extends StatefulWidget {
  const CheckoutPage({super.key});

  @override
  _CheckoutPageState createState() => _CheckoutPageState();
}

class _CheckoutPageState extends State<CheckoutPage> {
  late List<StorageProducts> _products = [];
  late String name;
  late String email;
  late String phone;
  late String address;
  double totalPrice = 0.0;

  @override
  void initState() {
    super.initState();
    _loadData();
    fetchProductData();
  }

  Future<void> _loadData() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();

    setState(() {
      name = prefs.getString('name') ?? '';
      email = prefs.getString('email') ?? '';
      phone = prefs.getString('phone') ?? '';
      address = prefs.getString('address') ?? '';
    });
  }

  Future<void> fetchProductData() async {
    List<StorageProducts> data = await getProductsFromStorage();
    setState(() {
      _products = data;
      totalPrice = calculateTotalPrice();
    });
  }

  double calculateTotalPrice() {
    double total = 0.0;
    for (var product in _products) {
      total += product.price;
    }
    return total;
  }

  PreferredSizeWidget header() {
    return AppBar(
      backgroundColor: backgroundColor1,
      elevation: 0,
      centerTitle: true,
      title: Text('Checkout Details', style: primaryTextStyle),
    );
  }

  Widget content(BuildContext context) {
    return ListView(
      padding: EdgeInsets.symmetric(horizontal: defaultMargin),
      children: [
        // NOTE: LIST ITEMS
        Container(
          margin: EdgeInsets.only(top: defaultMargin),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Éléments de la liste',
                style:
                    primaryTextStyle.copyWith(fontSize: 16, fontWeight: medium),
              ),
              ListView.builder(
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                itemCount: _products.length,
                itemBuilder: (context, index) {
                  return CheckoutCard(product: _products[index]);
                },
              ),
            ],
          ),
        ),
        // NOTE : CLIENT DETAILS
        Container(
          margin: EdgeInsets.only(top: defaultMargin),
          padding: EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: backgroundColor4,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Détails de client",
                style:
                    primaryTextStyle.copyWith(fontSize: 16, fontWeight: medium),
              ),
              SizedBox(height: 12),
              Row(
                children: [
                  Column(
                    children: [
                      Image.asset('assets/icon_name.png', width: 40),
                      SizedBox(height: defaultMargin / 2),
                      Image.asset('assets/icon_email.png', height: 30),
                      SizedBox(height: defaultMargin / 2),
                      Image.asset('assets/icon_phone.png', width: 30),
                    ],
                  ),
                  SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Nom : ',
                        style: primaryTextStyle.copyWith(fontWeight: medium),
                      ),
                      SizedBox(height: defaultMargin),
                      Text(
                        'Email : ',
                        style: primaryTextStyle.copyWith(fontWeight: medium),
                      ),
                      SizedBox(height: defaultMargin),
                      Text(
                        'N° téléphone : ',
                        style: primaryTextStyle.copyWith(fontWeight: medium),
                      ),
                    ],
                  ),
                  SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        name,
                        style: primaryTextStyle.copyWith(fontWeight: bold),
                      ),
                      SizedBox(height: defaultMargin),
                      Text(
                        email,
                        style: primaryTextStyle.copyWith(fontWeight: bold),
                      ),
                      SizedBox(height: defaultMargin),
                      Text(
                        phone,
                        style: primaryTextStyle.copyWith(fontWeight: bold),
                      ),
                    ],
                  ),
                ],
              )
            ],
          ),
        ),

        // NOTE : ADDRESS DETAILS
        Container(
          margin: EdgeInsets.only(top: defaultMargin),
          padding: EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: backgroundColor4,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Détails de l'adresse",
                style:
                    primaryTextStyle.copyWith(fontSize: 16, fontWeight: medium),
              ),
              SizedBox(height: 12),
              Row(
                children: [
                  Column(
                    children: [
                      Image.asset('assets/icon_store_location.png', width: 40),
                      Image.asset('assets/icon_line.png', height: 30),
                      Image.asset('assets/icon_your_address.png', width: 40),
                    ],
                  ),
                  SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Emplacement du magasin',
                        style: secondaryTextStyle.copyWith(
                          fontSize: 12,
                          fontWeight: light,
                        ),
                      ),
                      Text(
                        'Shose store',
                        style: primaryTextStyle.copyWith(fontWeight: medium),
                      ),
                      SizedBox(height: defaultMargin),
                      Text(
                        'Votre adresse',
                        style: secondaryTextStyle.copyWith(
                          fontSize: 12,
                          fontWeight: light,
                        ),
                      ),
                      // ! client adresse
                      Text(
                        address,
                        style: primaryTextStyle.copyWith(fontWeight: medium),
                      ),
                    ],
                  ),
                ],
              )
            ],
          ),
        ),

        // NOTE: PAYMENT SUMMARY
        Container(
          margin: EdgeInsets.only(top: defaultMargin),
          padding: EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: backgroundColor4,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Résumé de paiement',
                style:
                    primaryTextStyle.copyWith(fontSize: 16, fontWeight: medium),
              ),
              SizedBox(height: 12),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'La quantité de produit',
                    style: secondaryTextStyle.copyWith(fontSize: 12),
                  ),
                  // ! order quantty
                  Text(
                    '${_products.length} Articles',
                    style: primaryTextStyle.copyWith(fontWeight: medium),
                  ),
                ],
              ),
              SizedBox(height: 12),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'livraison',
                    style: secondaryTextStyle.copyWith(fontSize: 12),
                  ),
                  Text(
                    'Gratuit',
                    style: primaryTextStyle.copyWith(fontWeight: medium),
                  ),
                ],
              ),
              SizedBox(height: 12),
              Divider(
                thickness: 1,
                color: Color(0xff2E3141),
              ),
              SizedBox(height: 10),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Total',
                    style: priceTextStyle.copyWith(fontWeight: semiBold),
                  ),
                  Text(
                    '${totalPrice.toStringAsFixed(2)} DA',
                    style: priceTextStyle.copyWith(fontWeight: semiBold),
                  )
                ],
              )
            ],
          ),
        ),

        SizedBox(height: defaultMargin),
        Divider(
          thickness: 1,
          color: Color(0xff2E3141),
        ),
        // NOTE: CHECKOUT BUTTON
        Container(
          width: double.infinity,
          height: 50,
          margin: EdgeInsets.symmetric(vertical: defaultMargin),
          child: TextButton(
            onPressed: () {
              Navigator.pushNamedAndRemoveUntil(
                  context, '/checkout-success', (route) => false);
            },
            style: TextButton.styleFrom(
              backgroundColor: primaryColor,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            child: Text(
              'Passer à la caisse',
              style:
                  whiteTextStyle.copyWith(fontSize: 16, fontWeight: semiBold),
            ),
          ),
        )
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backgroundColor3,
      appBar: header(),
      body: content(context),
    );
  }
}
