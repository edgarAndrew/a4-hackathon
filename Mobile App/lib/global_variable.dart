import 'package:flutter/material.dart';

class GlobalVariable {

  // ignore: non_constant_identifier_names
  // Enter your Wifi - ip  here
  static String ip = "";
  static String URL = "http://$ip:";
  static String booksPORT = "5000";
  static String lendingPORT = "5001";
  static String studentPORT = "5002";
  static Color dark = const Color.fromARGB(255, 7, 22, 27);
  static Color light = const Color.fromARGB(255, 61, 115, 127);
  static Color whiteRep = const Color.fromARGB(255, 206, 199, 191);
  static Color red = const Color.fromARGB(255, 231, 93, 88);
  static Color green = const Color.fromARGB(255, 39, 174, 95);
  static Color grey = const Color.fromARGB(255, 196, 196, 196);
}
