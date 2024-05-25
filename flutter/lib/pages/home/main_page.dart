// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:shamo/pages/home/cart_page.dart';
import 'package:shamo/pages/home/home_page.dart';
import 'package:shamo/theme.dart';

// import '../api_call.dart';

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    Widget customButtonNav() {
      return ClipRRect(
        // borderRadius: BorderRadius.vertical(top: Radius.circular(30)),
        child: Container(
          decoration: BoxDecoration(
            // borderRadius: BorderRadius.vertical(top: Radius.circular(30)),
            border: Border(
              top: BorderSide(
                color: backgroundColor5, // Color of the top border
                width: 1.0, // Width of the top border
              ),
            ),
          ),
          child: BottomNavigationBar(
            backgroundColor: backgroundColor1,
            currentIndex: currentIndex,
            onTap: (value) {
              setState(() {
                currentIndex = value;
              });
            },
            type: BottomNavigationBarType.fixed,
            items: [
              BottomNavigationBarItem(
                icon: Padding(
                  padding: const EdgeInsets.only(top: 20),
                  child: Image.asset(
                    'assets/icon_home.png',
                    width: 21,
                    color: currentIndex == 0 ? primaryColor : baseButtonColor,
                  ),
                ),
                label: '',
              ),
              BottomNavigationBarItem(
                icon: Padding(
                  padding: const EdgeInsets.only(top: 20),
                  child: Image.asset(
                    'assets/icon_cart.png',
                    width: 18,
                    color: currentIndex == 1 ? primaryColor : baseButtonColor,
                  ),
                ),
                label: '',
              ),
            ],
          ),
        ),
      );
    }

    Widget body() {
      switch (currentIndex) {
        case 0:
          return HomePage();

        case 1:
          return CartPage();

        default:
          return HomePage();
      }
    }

    return Scaffold(
        backgroundColor:
            currentIndex == 0 ? backgroundColor1 : backgroundColor3,
        bottomNavigationBar: customButtonNav(),
        body: body());
  }
}
