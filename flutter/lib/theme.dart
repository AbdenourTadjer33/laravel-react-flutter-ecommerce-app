import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

double defaultMargin = 30.0;

// const Color primaryColor = Color(0xff6C5ECF);
// const Color secondaryColor = Color(0xff38ABBE);
// const Color alertColor = Color(0xffED6363);
// const Color priceColor = Color(0xff2C96F1);
// const Color backgroundColor1 = Color(0xff1F1D2B);
// const Color backgroundColor2 = Color(0xff2B2937);
// const Color backgroundColor3 = Color(0xff242231);
// const Color backgroundColor4 = Color(0xff252836);
// const Color backgroundColor5 = Color(0xff2B2844);
// const Color backgroundColor6 = Color(0xffECEDEF);
// const Color primaryTextColor = Color(0xffF1F0F2);
// const Color secondaryTextColor = Color(0xff999999);
// const Color subtitleColor = Color(0xff504F5E);
// const Color baseButtonColor = Color(0xff808191);
// const Color transparentColor = Colors.transparent;
// const Color blackColor = Color(0xff2E2E2E);

const Color primaryColor = Color(0xff064371); // Dark Blue
const Color secondaryColor = Color(0xff930F16); // Red
const Color alertColor = Color(0xffD01F25); // Red
const Color priceColor = Color(0xffD01F25); // Keeping it
const Color backgroundColor1 = Color.fromARGB(255, 247, 244, 244); // White
const Color backgroundColor2 = Color(0xffF7F7F7); // Light Grey
const Color backgroundColor3 = Color(0xffEFEFEF); // Light Grey variant
const Color backgroundColor4 = Color(0xffE0E0E0); // Light Grey variant
const Color backgroundColor5 = Color(0xffCCCCCC); // Grey for contrast
const Color backgroundColor6 = Color(0xffECEDEF); // Keeping this as is for now

const Color primaryTextColor = Color.fromARGB(255, 17, 17, 17); // Black
const Color secondaryTextColor = Color(0xff333333); // Dark Grey
const Color subtitleColor = Color(0xff666666); // Mid Grey
const Color baseButtonColor = Color(0xff808080); // Grey
const Color transparentColor = Colors.transparent; // Transparent
const Color blackColor = Color(0xff000000); // Black
const Color whiteColor = Color(0xffECEDEF); // Black

TextStyle primaryTextStyle = GoogleFonts.poppins(color: primaryTextColor);
TextStyle secondaryTextStyle = GoogleFonts.poppins(color: secondaryTextColor);
TextStyle subtitleTextStyle = GoogleFonts.poppins(color: subtitleColor);
TextStyle priceTextStyle = GoogleFonts.poppins(color: priceColor);
TextStyle purpleTextStyle = GoogleFonts.poppins(color: primaryColor);
TextStyle blackTextStyle = GoogleFonts.poppins(color: blackColor);
TextStyle whiteTextStyle = GoogleFonts.poppins(color: whiteColor);
TextStyle alerTextStyle = GoogleFonts.poppins(color: alertColor);

FontWeight light = FontWeight.w300;
FontWeight reguler = FontWeight.w400;
FontWeight medium = FontWeight.w500;
FontWeight semiBold = FontWeight.w600;
FontWeight bold = FontWeight.w700;
