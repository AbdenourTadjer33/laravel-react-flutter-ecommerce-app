import 'package:flutter/material.dart';
import 'package:shamo/pages/models/storage_products.dart';
import 'package:shamo/theme.dart';

class CartCard extends StatefulWidget {
  final StorageProducts product;
  final Function(double totalPrice, String operator) onUpdatePrice;

  const CartCard(
      {super.key, required this.product, required this.onUpdatePrice});

  @override
  _CartCardState createState() => _CartCardState();
}

class _CartCardState extends State<CartCard> {
  int _quantity = 1;

  @override
  void initState() {
    super.initState();
    _quantity = widget.product.qts;
  }

  void _incrementQuantity() {
    setState(() {
      _quantity++;
      updateProductQuantityInStorage(
          widget.product.slug, widget.product.selectedSize, _quantity);
      widget.onUpdatePrice(widget.product.price, '+' );
    });
  }

  void _decrementQuantity() {
    if (_quantity > 1) {
      setState(() {
        _quantity--;
        updateProductQuantityInStorage(
            widget.product.slug, widget.product.selectedSize, _quantity);
        widget.onUpdatePrice(widget.product.price , '-');
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
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
                      '${widget.product.name}  ${widget.product.selectedSize}',
                      style: primaryTextStyle.copyWith(fontWeight: semiBold),
                    ),
                    Text(
                      '${widget.product.price} DA',
                      style: priceTextStyle.copyWith(fontWeight: bold),
                    ),
                  ],
                ),
              ),
              Column(
                children: [
                  IconButton(
                    icon: Icon(Icons.add, size: 16, color: primaryColor),
                    onPressed: _incrementQuantity,
                  ),
                  Text(
                    '$_quantity',
                    style: primaryTextStyle.copyWith(fontWeight: semiBold),
                  ),
                  IconButton(
                    icon: Icon(Icons.remove, size: 16, color: primaryColor),
                    onPressed: _decrementQuantity,
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}
