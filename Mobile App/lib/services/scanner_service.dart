import 'dart:convert';
import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';
import 'package:http/http.dart';
import 'package:provider/provider.dart';

import '../global_variable.dart';
import '../models/book.dart';
import '../provider/user_provider.dart';
import '../utils.dart';

class ScannerService {
  String? result;
  String? response;
  Book? scannedBook;

// Opens Scanner
  void scanBarCode(BuildContext context, Function func) async {
    try {
      result = await FlutterBarcodeScanner.scanBarcode(
          '#ff6666', 'Cancel', true, ScanMode.BARCODE);
    } on PlatformException {
      result = 'Failed to get platform version.';
    }
    if (!context.mounted) {
      log("Auth-Screen not mounted");
      return;
    }
    if (result != "-1") {
      showLoader(context);
      var bookResponse = await get(
        Uri.parse(
            "${GlobalVariable.URL}${GlobalVariable.booksPORT}/books/api/v1/book/$result"),
      );
      response = bookResponse.body;
      print(response);
      if(jsonDecode(bookResponse.body)["book"] != null){
        scannedBook = Book.fromJson(jsonDecode(bookResponse.body)["book"]);
      scannedBook!.isDue = "false";
      scannedBook!.status = "issued";
      }else{
        result = "-1";
        showSnackbar(context, "Retry");
      }
      
      hideLoader(context);
    } else {
      response = "-1";
      showSnackbar(context, "Retry");
    }
    func();
  }

// To lend a book
  void lendBook(BuildContext context) async {
    showLoader(context);
    final user = Provider.of<userProvider>(context, listen: false).user;
    var lendResponse = await post(
      Uri.parse(
          "${GlobalVariable.URL}${GlobalVariable.lendingPORT}/lending/api/v2/"),
      body: jsonEncode(
          {"student": user.sId, "book": scannedBook!.sId!.toString()}),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      },
    );

    if (jsonDecode(lendResponse.body)['msg'] == "Book issued") {
      scannedBook!.dueDate = jsonDecode(lendResponse.body)['dueDate'];
      scannedBook!.issuedDate = jsonDecode(lendResponse.body)['issueDate'];
      user.history!.insert(0, scannedBook!);
    }
    if (!context.mounted) {
      log("Auth-Screen not mounted");
      return;
    }

    hideLoader(context);

    showSnackbar(context, jsonDecode(lendResponse.body)['msg']);
  }
}
