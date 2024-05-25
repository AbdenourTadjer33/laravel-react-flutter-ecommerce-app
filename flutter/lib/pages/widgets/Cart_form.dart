import 'package:flutter/material.dart';
import 'package:shamo/theme.dart';
import 'package:shared_preferences/shared_preferences.dart';

class InformationDialog extends StatefulWidget {
  final GlobalKey<FormState> formKey;
  final TextEditingController nameController;
  final TextEditingController emailController;
  final TextEditingController phoneController;
  final TextEditingController addressController;

  const InformationDialog({
    super.key,
    required this.formKey,
    required this.nameController,
    required this.emailController,
    required this.phoneController,
    required this.addressController,
  });

  @override
  _InformationDialogState createState() => _InformationDialogState();
}

class _InformationDialogState extends State<InformationDialog> {
  bool isChecked = false;

    @override
  void initState() {
    super.initState();
    _loadData();
  }

    Future<void> _loadData() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();

    setState(() {
      widget.nameController.text = prefs.getString('name') ?? '';
      widget.emailController.text = prefs.getString('email') ?? '';
      widget.phoneController.text = prefs.getString('phone') ?? '';
      widget.addressController.text = prefs.getString('address') ?? '';
    });
  }

  Future<void> storeData() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();

    await prefs.setString('name', widget.nameController.text);
    await prefs.setString('email', widget.emailController.text);
    await prefs.setString('phone', widget.phoneController.text);
    await prefs.setString('address', widget.addressController.text);
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      backgroundColor: backgroundColor3,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
      content: SizedBox(
        child: SingleChildScrollView(
          child: Form(
            key: widget.formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Align(
                    alignment: Alignment.centerLeft,
                    child: GestureDetector(
                        onTap: () {
                          Navigator.pop(context);
                        },
                        child:
                            const Icon(Icons.close, color: primaryTextColor))),
                const SizedBox(height: 12),
                Text(
                  'Entrer votre informations!',
                  style: primaryTextStyle.copyWith(
                      fontSize: 18, fontWeight: semiBold),
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: widget.nameController,
                  style: primaryTextStyle,
                  decoration: InputDecoration(
                    labelText: 'Nom',
                    labelStyle: secondaryTextStyle,
                    filled: true,
                    fillColor: backgroundColor1,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Veuillez entrer votre nom';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: widget.emailController,
                  style: primaryTextStyle,
                  decoration: InputDecoration(
                    labelText: 'Email',
                    labelStyle: secondaryTextStyle,
                    filled: true,
                    fillColor: backgroundColor1,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Veuillez entrer votre email';
                    } else if (!RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
                        .hasMatch(value)) {
                      return 'Veuillez entrer un email valide';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: widget.phoneController,
                  style: primaryTextStyle,
                  decoration: InputDecoration(
                    labelText: 'Téléphone',
                    labelStyle: secondaryTextStyle,
                    filled: true,
                    fillColor: backgroundColor1,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Veuillez entrer votre numéro de téléphone';
                    } else if (!RegExp(r'^\d{10}$').hasMatch(value)) {
                      return 'Veuillez entrer un numéro de téléphone valide';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: widget.addressController,
                  style: primaryTextStyle,
                  decoration: InputDecoration(
                    labelText: 'Adresse',
                    labelStyle: secondaryTextStyle,
                    filled: true,
                    fillColor: backgroundColor1,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Veuillez entrer votre adresse';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Checkbox(
                      value: isChecked,
                      onChanged: (value) {
                        setState(() {
                          isChecked = value!;
                        });
                      },
                    ),
                    Text(
                      'Enregistrer mes informations',
                      style: secondaryTextStyle,
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  height: 44,
                  child: TextButton(
                    onPressed: () {
                      if (widget.formKey.currentState!.validate()) {
                        if (isChecked) {
                          storeData();
                        }
                        Navigator.pushNamed(context, '/checkout');
                      }
                    },
                    style: TextButton.styleFrom(
                      backgroundColor: primaryColor,
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12)),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'Passer à la livraison',
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
}
