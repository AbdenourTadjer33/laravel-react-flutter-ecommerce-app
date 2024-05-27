// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:shamo/pages/models/storage_products.dart';
import 'package:shamo/theme.dart';

class CheckoutCard extends StatelessWidget {
  final StorageProducts product;

  const CheckoutCard({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 12),
      padding: EdgeInsets.symmetric(vertical: 20, horizontal: 12),
      decoration: BoxDecoration(
        color: backgroundColor4,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Row(
            children: [
              Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  image: DecorationImage(
                    image: AssetImage('assets/image_shoes.png'),
                  ),
                ),
              ),
              SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '${product.name}  ${product.selectedSize}',
                      style: primaryTextStyle.copyWith(fontWeight: semiBold),
                    ),
                    Text(
                      '${product.price} DA',
                      style: priceTextStyle.copyWith(fontWeight: bold),
                    ),
                  ],
                ),
              ),
              Text(
                '${product.qts}',
                style: primaryTextStyle.copyWith(fontWeight: semiBold),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
