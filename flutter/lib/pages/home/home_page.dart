// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:shamo/pages/models/category_model.dart';
import 'package:shamo/pages/models/product_model.dart';
import 'package:shamo/pages/widgets/product_card.dart';
import 'package:shamo/pages/widgets/product_tile.dart';
import 'package:shamo/theme.dart';
import '../api/api_services.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<dynamic> _data = [];
  bool _isLoading = false;
  bool _isError = false;
  List<Category> categoriess = [
    Category(name: 'Tous', isSelected: true),
    Category(name: 'Addidas'),
    Category(name: 'Nike'),
    Category(name: 'Home'),
    Category(name: 'Famme'),
  ];

  void _onCategorySelected(int index) {
    setState(() {
      for (int i = 0; i < categoriess.length; i++) {
        categoriess[i].isSelected = i == index;
      }
    });
  }

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData() async {
    setState(() {
      _isLoading = true;
      _isError = false;
    });

    try {
      final data = await ApiService.getRequest('products');
      _data = data.map<Product>((item) => Product.fromJson(item)).toList();

      setState(() {
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
        _isError = true;
      });
      print('Error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    Widget header() {
      return Container(
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
                    'Amir ShoseStore',
                    style: primaryTextStyle.copyWith(
                      fontSize: 24,
                      fontWeight: semiBold,
                    ),
                  ),
                  Text(
                    'Sortie votre énergie',
                    style: subtitleTextStyle.copyWith(
                      fontSize: 16,
                    ),
                  )
                ],
              ),
            ),
            Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                // shape: BoxShape.circle,
                image: DecorationImage(
                  image: AssetImage(
                    'assets/icon_splash.png',
                  ),
                ),
              ),
            )
          ],
        ),
      );
    }

    Widget categories() {
      return Container(
        margin: EdgeInsets.only(top: defaultMargin),
        child: SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              SizedBox(width: defaultMargin),
              Row(
                children: categoriess.map((category) {
                  int index = categoriess.indexOf(category);
                  return GestureDetector(
                    onTap: () => _onCategorySelected(index),
                    child: Container(
                      padding:
                          EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                      margin: EdgeInsets.only(right: 16),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(12),
                        color: category.isSelected
                            ? primaryColor
                            : transparentColor,
                        border: category.isSelected
                            ? null
                            : Border.all(color: subtitleColor),
                      ),
                      child: Text(
                        category.name,
                        style: category.isSelected
                            ? primaryTextStyle.copyWith(
                                fontSize: 13, fontWeight: medium)
                            : subtitleTextStyle.copyWith(
                                fontSize: 13, fontWeight: medium),
                      ),
                    ),
                  );
                }).toList(),
              ),
            ],
          ),
        ),
      );
    }

    Widget popularProductsTitle() {
      return Container(
        margin: EdgeInsets.only(
          top: defaultMargin,
          left: defaultMargin,
          right: defaultMargin,
        ),
        child: Text(
          'Produits populaires',
          style: primaryTextStyle.copyWith(
            fontSize: 22,
            fontWeight: semiBold,
          ),
        ),
      );
    }

    Widget popularProducts() {
      return Container(
        margin: EdgeInsets.only(top: 14),
        child: SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              Row(
                children: _data
                    .map((product) => ProductCard(product: product))
                    .toList(),
              )
            ],
          ),
        ),
      );
    }

    Widget newArrivalsTitle() {
      return Container(
        margin: EdgeInsets.only(
          top: defaultMargin,
          left: defaultMargin,
          right: defaultMargin,
        ),
        child: Text(
          'Nouvelles Arrivées',
          style: primaryTextStyle.copyWith(
            fontSize: 22,
            fontWeight: semiBold,
          ),
        ),
      );
    }

    Widget newArrivals() {
      return Container(
        margin: EdgeInsets.only(top: 14),
        child: Column(children: [
          Column(
            children:
                _data.map((product) => ProductTile(product: product)).toList(),
          )
        ]),
      );
    }

    Widget loadingIndicator() {
      return Scaffold(
        backgroundColor: backgroundColor1,
        body: Center(
            child: Container(
          width: 130,
          height: 150,
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage(
                'assets/icon_splash.png',
              ),
            ),
          ),
        )),
      );
    }

    Widget errorIndicator() {
      return Center(
        child: Text('Failed to load data'),
      );
    }

    return Scaffold(
      backgroundColor: backgroundColor1,
      body: _isLoading
          ? loadingIndicator()
          : _isError
              ? errorIndicator()
              : ListView(
                  children: [
                    header(),
                    categories(),
                    popularProductsTitle(),
                    popularProducts(),
                    newArrivalsTitle(),
                    newArrivals(),
                  ],
                ),
    );
  }
}
