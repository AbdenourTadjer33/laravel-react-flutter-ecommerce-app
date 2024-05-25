import 'package:flutter/material.dart';
import 'package:shamo/theme.dart';

class CheckoutSuccessPage extends StatelessWidget {
  const CheckoutSuccessPage({super.key});

  PreferredSizeWidget header() {
    return AppBar(
      backgroundColor: backgroundColor1,
      centerTitle: true,
      title: Text('Succès de la commande', style: primaryTextStyle),
      elevation: 0,
    );
  }

  Widget content(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.asset('assets/icon_empty_cart.png', width: 80),
          const SizedBox(height: 20),
          Text(
            'Vous avez passé la commande',
            style: primaryTextStyle.copyWith(fontSize: 16, fontWeight: medium),
          ),
          const SizedBox(height: 20),
          Text(
            'Restez à la maison pendant que nous préparons les chaussures de vos rêves',
            style: secondaryTextStyle,
            textAlign: TextAlign.center,
          ),
          Container(
            width: 296,
            height: 44,
            margin: EdgeInsets.only(top: defaultMargin),
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
                "Commander d'autres chaussures",
                style:
                    whiteTextStyle.copyWith(fontWeight: medium, fontSize: 16),
              ),
            ),
          ),
        ],
      ),
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
