// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:shamo/pages/models/storage_products.dart';
import 'package:shamo/theme.dart';

class CartCard extends StatelessWidget {
  final StorageProducts product;

  const CartCard({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 10),
      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 10),
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
                        image: AssetImage('assets/image_shoes.png'))),
              ),
              SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      product.name,
                      style: primaryTextStyle.copyWith(fontWeight: semiBold),
                    ),
                    Text('${product.price} DA',
                        style: priceTextStyle.copyWith(fontWeight: bold))
                  ],
                ),
              ),
            ],
          ),
          // TextButton(
          //   onPressed: () async {
          //     await clearProductsFromStorage();
          //   },
          //   child: Row(
          //     children: [
          //       Image.asset('assets/icon_remove.png', width: 10),
          //       SizedBox(width: 4),
          //       Text(
          //         'Supprimer',
          //         style:
          //             alerTextStyle.copyWith(fontSize: 12, fontWeight: light),
          //       )
          //     ],
          //   ),
          // ),
        ],
      ),
    );
  }
}
