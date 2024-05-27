// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:shamo/pages/models/product_model.dart';
import 'package:shamo/pages/models/brand_model.dart';
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
  List<Product> _data = [];
  List<Product> _filteredData = [];
  List<Brand> _brands = [];
  bool _isLoading = false;
  bool _isError = false;
  int _selectedCategoryIndex = 0;
  TextEditingController _searchController = TextEditingController();
  bool _isSearching = false;

  @override
  void initState() {
    super.initState();
    _fetchData();
    _searchController.addListener(_filterProducts);
  }

  void _filterProducts() {
    String query = _searchController.text.toLowerCase();
    if (query.isEmpty) {
      setState(() {
        _isSearching = false;
      });
    } else {
      setState(() {
        _isSearching = true;
        _filteredData = _data
            .where((product) => product.name.toLowerCase().contains(query))
            .toList();
      });
    }
  }

  Future<void> _fetchData() async {
    setState(() {
      _isLoading = true;
      _isError = false;
    });

    try {
      final data = await ApiService.getRequest('products');
      final brands = await ApiService.getRequest('brands');
      _data = data.map<Product>((item) => Product.fromJson(item)).toList();
      _filteredData = _data;
      _brands = [Brand(id: 0, name: 'All categories', logo: '')] +
          brands.map<Brand>((item) => Brand.fromJson(item)).toList();

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

  void _onCategorySelected(int index, int id) async {
    if (id == 0) {
      try {
        final data = await ApiService.getRequest('products');
        List<Product> products =
            data.map<Product>((item) => Product.fromJson(item)).toList();
        setState(() {
          _selectedCategoryIndex = index;
          _data = products;
          _filteredData = products;
        });
      } catch (e) {
        print('Error: $e');
      }
    } else {
      try {
        final data = await ApiService.getRequest('brands/$id');
        if (data is Map<String, dynamic>) {
          List<Product> products = (data['products'] as List)
              .map((item) => Product.fromJson(item))
              .toList();
          setState(() {
            _selectedCategoryIndex = index;
            _data = products;
            _filteredData = products;
          });
        } else {
          throw Exception('Invalid data format');
        }
      } catch (e) {
        setState(() {
          _isLoading = false;
          _isError = true;
        });
      }
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

    Widget searchField() {
      return Container(
        margin: EdgeInsets.symmetric(horizontal: defaultMargin, vertical: 10),
        child: TextField(
          controller: _searchController,
          decoration: InputDecoration(
            hintText: 'Search products...',
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            prefixIcon: Icon(Icons.search),
          ),
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
                children: _brands.map((brand) {
                  int index = _brands.indexOf(brand);
                  bool isSelected = index == _selectedCategoryIndex;

                  return GestureDetector(
                    onTap: () => _onCategorySelected(index, brand.id),
                    child: Container(
                      padding:
                          EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                      margin: EdgeInsets.only(right: 16),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(12),
                        color: isSelected ? primaryColor : transparentColor,
                        border: isSelected
                            ? null
                            : Border.all(color: subtitleColor),
                      ),
                      child: Text(
                        brand.name,
                        style: isSelected
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
                children: _filteredData
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
        child: Column(
          children: _filteredData
              .map((product) => ProductTile(product: product))
              .toList(),
        ),
      );
    }

    Widget searchResults() {
      return Container(
        margin: EdgeInsets.only(top: 14),
        child: Column(
          children: _filteredData
              .map((product) => ProductTile(product: product))
              .toList(),
        ),
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
                    searchField(),
                    _isSearching
                        ? searchResults()
                        : Column(
                            children: [
                              categories(),
                              popularProductsTitle(),
                              popularProducts(),
                              newArrivalsTitle(),
                              newArrivals(),
                            ],
                          ),
                  ],
                ),
    );
  }
}
