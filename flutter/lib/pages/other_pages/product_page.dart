// ignore_for_file: prefer_const_constructors, sized_box_for_whitespace

import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:shamo/theme.dart';
import '../models/product_model.dart';
import '../models/storage_products.dart';

class ProductPage extends StatefulWidget {
  final Product product;

  const ProductPage({Key? key, required this.product}) : super(key: key);

// ! product images
  static const List images = [
    'assets/image_shoes.png',
    'assets/image_shoes.png',
    'assets/image_shoes.png',
  ];

  @override
  State<ProductPage> createState() => _ProductPageState();
}

class _ProductPageState extends State<ProductPage> {
  int currentIndex = 0;

  // Define selected size
  String selectedSize =  '';

  // Function to update selected size
  void selectSize(String size) {
    setState(() {
      selectedSize = size;
    });
  }

    @override
  void initState() {
    super.initState();
    selectedSize = widget.product.sizes[0];
  }


  Widget sizeOptions(List<dynamic> availableSizes) {
    return Wrap(
      spacing: 10,
      children: availableSizes
          .map((size) => GestureDetector(
                onTap: () => selectSize(size),
                child: Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: selectedSize == size ? primaryColor : Colors.grey,
                      width: 2,
                    ),
                  ),
                  child: Center(
                    child: Text(
                      size,
                      style: TextStyle(
                        color:
                            selectedSize == size ? primaryColor : Colors.grey,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              ))
          .toList(),
    );
  }

Future<void> showSuccessDialog(
      String selectedSize, String slug, String name, double price) async {
    // Check if the product with the same slug and size exists in storage
    List<StorageProducts> products = await getProductsFromStorage();
    bool productExists = false;
    for (var product in products) {
      if (product.slug == slug && product.selectedSize == selectedSize) {
        // If the product exists, update its quantity
        product.qts += 1;
        await updateProductQuantityInStorage(slug, selectedSize, product.qts);
        productExists = true;
        break;
      }
    }

    if (!productExists) {
      // If the product doesn't exist, add it to storage with quantity 1
      int qts = 1;
      await addProductToStorage(slug, selectedSize, name, price, qts);
    }
    return showDialog(
      context: context,
      builder: (BuildContext context) => Container(
        width: MediaQuery.of(context).size.width - (2 * defaultMargin),
        child: AlertDialog(
          backgroundColor: backgroundColor3,
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
          content: SingleChildScrollView(
            child: Column(
              children: [
                Align(
                    alignment: Alignment.centerLeft,
                    child: GestureDetector(
                        onTap: () {
                          Navigator.pop(context);
                        },
                        child: Icon(Icons.close, color: primaryTextColor))),
                Image.asset('assets/icon_success.png', width: 100),
                SizedBox(height: 12),
                Text(
                  'Bravoo!',
                  style: primaryTextStyle.copyWith(
                      fontSize: 18, fontWeight: semiBold),
                ),
                SizedBox(height: 12),
                Text(
                    '${name} avec pointure ${selectedSize} à ajouter au panier!',
                    style: secondaryTextStyle),
                SizedBox(height: 20),
                Container(
                  width: 154,
                  height: 44,
                  child: TextButton(
                    onPressed: () {
                      Navigator.pushNamed(context, '/cart');
                    },
                    style: TextButton.styleFrom(
                      backgroundColor: primaryColor,
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12)),
                    ),
                    child: Row(
                      children: [
                        Text(
                          'Voir mon panier',
                          style: whiteTextStyle.copyWith(
                              fontSize: 16, fontWeight: semiBold),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget indicator(int index) {
    return Container(
      width: currentIndex == index ? 16 : 4,
      height: 4,
      margin: EdgeInsets.symmetric(horizontal: 2),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        color: currentIndex == index ? primaryColor : Color(0xffC4C4C4),
      ),
    );
  }

  Widget header(BuildContext context) {
    int index = -1;

    return Column(
      children: [
        Container(
          margin: EdgeInsets.only(
            top: 20,
            left: defaultMargin,
            right: defaultMargin,
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              GestureDetector(
                onTap: () {
                  Navigator.pop(context);
                },
                child: Icon(Icons.chevron_left),
              ),
            ],
          ),
        ),
        CarouselSlider(
          items: ProductPage.images
              .map(
                (image) => Image.asset(
                  image,
                  width: MediaQuery.of(context).size.width,
                  height: 310,
                  fit: BoxFit.cover,
                ),
              )
              .toList(),
          options: CarouselOptions(
            initialPage: 0,
            onPageChanged: (index, reason) {
              setState(() {
                currentIndex = index;
              });
            },
          ),
        ),
        SizedBox(height: 20),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: ProductPage.images.map((e) {
            index++;
            return indicator(index);
          }).toList(),
        ),
      ],
    );
  }

  Widget content() {
    // int index = -1;

    return Container(
      margin: EdgeInsets.only(top: 17),
      width: double.infinity,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        color: backgroundColor1,
      ),
      child: Column(
        children: [
          // ! NOTE: HEADER
          Container(
            margin: EdgeInsets.only(
              top: defaultMargin,
              left: defaultMargin,
              right: defaultMargin,
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        // !! product name
                        widget.product.name,
                        style: primaryTextStyle.copyWith(
                            fontSize: 18, fontWeight: semiBold),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // !! NOTE: PRICE
          Container(
            width: double.infinity,
            margin: EdgeInsets.only(
              top: 20,
              left: defaultMargin,
              right: defaultMargin,
            ),
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: backgroundColor2,
              borderRadius: BorderRadius.circular(4),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Prix', style: primaryTextStyle),
                // !! product price
                Text(
                  '${widget.product.price} DA',
                  style: priceTextStyle.copyWith(
                    fontSize: 16,
                    fontWeight: semiBold,
                  ),
                ),
              ],
            ),
          ),

          // !! NOTE : DESCRIPTION
          Container(
            width: double.infinity,
            margin: EdgeInsets.only(
              top: defaultMargin,
              left: defaultMargin,
              right: defaultMargin,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // !! prodect descreption
                Text('à propos du produit :', style: blackTextStyle),
                SizedBox(height: 6),
                Text(
                  widget.product.description,
                  style: subtitleTextStyle.copyWith(fontWeight: light),
                  textAlign: TextAlign.justify,
                ),
              ],
            ),
          ),
          // !! NOTE : SIZES
          Container(
            width: double.infinity,
            margin: EdgeInsets.only(
              top: defaultMargin,
              left: defaultMargin,
              right: defaultMargin,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // !! prodect descreption
                Text('Selectioner votre pointure :', style: blackTextStyle),
                SizedBox(height: 6),
                Container(
                  padding: EdgeInsets.symmetric(vertical: 20),
                  color: backgroundColor1,
                  child: sizeOptions(widget.product.sizes),
                ),
              ],
            ),
          ),

          // NOTE: BUTTONS
          Container(
            width: double.infinity,
            margin: EdgeInsets.only(
                top: defaultMargin,
                left: defaultMargin,
                right: defaultMargin,
                bottom: defaultMargin),
            child: Row(
              children: [
                SizedBox(width: 16),
                Expanded(
                  child: Container(
                    height: 54,
                    child: TextButton(
                      onPressed: () {
                        showSuccessDialog(selectedSize, widget.product.slug,
                            widget.product.name, widget.product.price);
                      },
                      style: TextButton.styleFrom(
                        foregroundColor: primaryColor,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        backgroundColor: primaryColor,
                      ),
                      child: Text(
                        'Ajouter Au panier',
                        style: whiteTextStyle.copyWith(
                            fontSize: 16, fontWeight: semiBold),
                      ),
                    ),
                  ),
                )
              ],
            ),
          )
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: backgroundColor6,
        body: ListView(
          children: [
            header(context),
            content(),
          ],
        ));
  }
}
